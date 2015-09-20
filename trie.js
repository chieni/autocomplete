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

	that.getMatchList = function(word){
		var matchNode = find(word);
		if (matchNode){
			var matchChildren = matchNode.

		} else {
			return null;
		}
	}

	that.key = function(){
		return key;
	}

	that.value = function(){
		return value;
	}

	that.children = function(){
		return children;
	}

	Object.freeze(that);
	return that;
}



/*
Create root TrieNode, insert each element in the dictionary sequentially.
*/

var a = ["hello", "world"];
var t = TrieNode(null);
a.forEach(function(w){t.insert(w);});
console.log(t.find("world").value());