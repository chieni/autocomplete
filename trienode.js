/**
Create a TrieNode object.
A TrieNode object represents a node in a Trie data structure. Each node contains a key
and a value.

@constructor
@param {String} key - the key of the TrieNode, i.e. the word or word part that it represents
@param {int} value - the value of the TrieNode, 1 if it is a word 
in the dictionary and 0 if it is merely a word part

**/
var TrieNode = function(key, value) {
	var that = Object.create(TrieNode.prototype);
	var children = [];

	/**
	Inserts a TrieNode into an existing Trie data structure (consisting of TrieNodes)
	@param {String} word - the word being inserted
	@param {int} depth - the depth of the insertion. This value is used in recursion, but is an 
	optional parameter
	**/
	that.insert = function(word, depth){
		if (depth == null){depth = 0;}

		if (word.length == depth){
			if (key == word){value = 1;}
		}

		if (word.length > depth) {
			// Search through the children nodes
			var childrenValues = children.map(function(child){
				return child.key();
			});

			var targetWord = word.substring(0, depth + 1);
			var index = childrenValues.indexOf(targetWord);
			//console.log(targetWord);

			if (index > -1){
				// Insert the next character into this node

				var nextNode = children[index];
				return nextNode.insert(word, depth + 1);
			} else {
				var val = null;
				if (depth === word.length - 1) { val = 1;}
				var nextNode = TrieNode(targetWord, val);
				children.push(nextNode);
				return nextNode.insert(word, depth + 1);
			}
		}
	}

	/**
	Finds and returns the node that matches the word parameter. If none matches,
	returns null.
	@param {String} word - the word being searched for
	@depth {int} depth - the depth of the recursion. This is an optional parameter
	that is not used in the public space.
	**/
	that.find = function(word, depth){
		if (depth == null){depth = 0;}
		// Search through the children nodes
		var childrenValues = children.map(function(child){
			return child.key();
		});
		var targetWord = word.substring(0, depth + 1);
		var index = childrenValues.indexOf(targetWord);

		if (index < 0){
			return null;
		} else {
			if (word === childrenValues[index]){
				return children[index];
			} else {
				var nextNode = children[index];
				return nextNode.find(word, depth + 1);
			}
		}
	}

	/**
	Returns a list of nodes that were discovered in preorder traversal. 
	**/
	that.preOrderTraversal = function(){
		var visited = [];
		if (value) {
			visited.push(key);
		}

		children.sort(function(a, b){
			return a.key().localeCompare(b.key());
		});

		/* EXAMPLE USE OF FUNCTIONALS
			This is my most notable use of functionals. I use the forEach functional to loop
			over the children of the TrieNode and call preOrderTraversal recursively on them
			in order to do a preorder traversal of the Trie. All this functionality is 
			condensed to what is essentially a single line of code, which makes it clean and 
			easy to understand. 
		*/
		children.forEach(function(child){
			visited.push.apply(visited, child.preOrderTraversal());
		});
		return visited;
	}

	/**
	Returns the key of the TrieNode. 
	**/
	that.key = function(){
		return key;
	}

	Object.freeze(that);
	return that;
}