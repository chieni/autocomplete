/**
Create a Trie object.
A Trie object represents a Trie data structure, which is composed of TrieNodes.

@constructor
**/

var Trie = function(){
	var that = Object.create(Trie.prototype);
	var node = TrieNode(null);

	/**
	Inserts a TrieNode into an existing Trie data structure (consisting of TrieNodes)
	@param {String} word - the word being inserted
	**/
	that.insert = function(word){
		node.insert(word);
	}

	/**
	Returns an array of strings, at most a certain length, that represent the
	list of autocomplete words available. If there are no matches, returns null.
	@param {String} word - the word being autocompleted upon
	@param {int} maxLength - the maximum number of words to be shown in autocomplete. 
	Represents the maximum length of the array that is returned.
	**/
	that.getMatchList = function(word, maxLength){
		var matchNode = node.find(word);
		if (matchNode){
			var matchChildren = matchNode.preOrderTraversal();
			if (matchChildren.length > maxLength){
				return matchChildren.slice(0, maxLength);
			}
			return matchChildren;
		} else {
			return null;
		}
	}

	Object.freeze(that);
	return that;
}
