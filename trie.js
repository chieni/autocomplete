var TrieNode = function(text) {
	var that = Object.create(TrieNode.prototype);
	var children = [];

	/*
	Walk through the trie according to the string to be inserted, then append
	new nodes for the string that is not contained in the trie.
	*/
	that.insert = function(word, depth){
		var i = 0, length = word.length
		if (word.length > depth) {
			// Search through the children nodes
			var childrenValues = children.map(function(child){
				return child.value();
			});

			var targetWord = word.substring(0, depth + 1);
	
			if (childrenValues.indexOf(targetWord) > -1){
				// Insert the next character into this node
				var index = childrenValues.indexOf(targetWord);
				var nextNode = children[index];
				nextNode.insert(word, depth + 1);
				
			}
			else {
				var nextNode = TrieNode(targetWord);
				console.log(targetWord);
				children.push(nextNode);
				nextNode.insert(word, depth + 1);
			}
			
		}
	}

	/*
	Returns the node where a word terminates
	*/
	that.find = function(word){
		if (word) {
			// Search through the children nodes
			childrenValues = children.map(function(child){
				return child.value();
			});

		}
	}

	that.getMatchList = function(word){

	}

	that.value = function(){
		return text;
	}

	Object.freeze(that);
	return that;
}

/*
Create root TrieNode, insert each element in the dictionary sequentially.
*/

var a = ["hello", "world"];
var t = TrieNode(null);
t.insert("hello", 0);
t.insert("world", 0);