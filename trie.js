var TrieNode = function(key, value) {
	var that = Object.create(TrieNode.prototype);
	var children = [];

	/*
	Walk through the trie according to the string to be inserted, then append
	new nodes for the string that is not contained in the trie.
	*/
	that.insert = function(word, depth){
		if (depth == null){depth = 0;}

		if (word.length > depth) {
			// Search through the children nodes
			var childrenValues = children.map(function(child){
				return child.key();
			});

			var targetWord = word.substring(0, depth + 1);
			var index = childrenValues.indexOf(targetWord);
			if (index > -1){
				// Insert the next character into this node
				var nextNode = children[index];
				nextNode.insert(word, depth + 1);
			} else {
				var val = null;
				if (depth === word.length - 1) { val = 1;}
				var nextNode = TrieNode(targetWord, val);
				children.push(nextNode);
				nextNode.insert(word, depth + 1);
			}
		}
	}

	/*
	Returns the node where a word terminates
	*/
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

	/*
	Find the correct node in the Trie structure, then use preorder traversal on it.
	*/
	that.getMatchList = function(word){
		var matchNode = this.find(word);
		if (matchNode){
			var matchChildren = matchNode.preOrderTraversal();
			if (matchChildren.length > 10){
				return matchChildren.slice(0, 10);
			}
			return matchChildren;
		} else {
			return null;
		}
	}

	/*
	If node has a value, add to list. Sort children by alphabetical order. 
	Call preOrderTraversal on the children
	*/
	that.preOrderTraversal = function(){
		var visited = [];
		if (value) {
			visited.push(key);
		}

		children.sort(function(a, b){
			return a.key().localeCompare(b.key());
		});

		children.forEach(function(child){
			visited.push.apply(visited, child.preOrderTraversal());
		});

		return visited;
	}

	that.key = function(){
		return key;
	}

	that.value = function(){
		return value;
	}

	Object.freeze(that);
	return that;
}


var a = ["a", "to", "tea", "ted", "teds", "ten", "tennis", "i", "in", "inn"];
var t = TrieNode(null);
a.forEach(function(w){t.insert(w);});
console.log(t.getMatchList("t"));