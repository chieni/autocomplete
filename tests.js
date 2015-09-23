/*-----------------------------------------------
Trie Tests
/*----------------------------------------------*/

// insert tests
QUnit.test( "Insert", function( assert ) {
	var a = ["a", "to", "tea", "ted", "teds", "ten", "tennis", "i", "in", "inn"];
	var t = Trie();
	a.forEach(function(w){t.insert(w);});
	var matchList = t.getMatchList("t", 10);

  	assert.ok( matchList[0] == "tea", "Passed!" );
});

// getMatchList tests
QUnit.test( "Finding no matches", function( assert ) {
	var a = ["a", "to", "tea", "ted", "teds", "ten", "tennis", "i", "in", "inn"];
	var t = Trie();
	a.forEach(function(w){t.insert(w);});

	var matchList = t.getMatchList("nope");
  	assert.ok( matchList == null, "Passed!" );
});

QUnit.test( "Finding a under 10 matches", function( assert ) {
	var a = ["a", "to", "tea", "ted", "teds", "ten", "tennis", "i", "in", "inn"];
	var t = Trie();
	a.forEach(function(w){t.insert(w);});

	var matchList = t.getMatchList("t");
	var expected = ["tea", "ted", "teds","ten","tennis", "to"];

  	matchList.forEach(function(word, i){
		assert.ok(word == expected[i], "Passed!");
	})
});

QUnit.test( "Finding over 10 matches", function( assert ) {
	var a = ["a", "apple", "ant","after","aunt","always","able", "ample","awful", "ark", "army", "ape", "amp"];
	var t = Trie();
	a.forEach(function(w){t.insert(w);});

	var matchList = t.getMatchList("a", 10);
	var expected = ["a", "able", "after", "always", "amp", "ample", "ant", "ape", "apple", "ark"];

  	matchList.forEach(function(word, i){
		assert.ok(word == expected[i], "Passed!");
	})
});

QUnit.test( "Finding matches that contain word parts within words", function( assert ) {
	var a = ["ample", "amp","a"];
	var t = Trie();
	a.forEach(function(w){t.insert(w);});

	var matchList = t.getMatchList("a", 10);
	var expected = ["a", "amp", "ample"];

  	matchList.forEach(function(word, i){
		assert.ok(word == expected[i], "Passed!");
	})
});
/*-----------------------------------------------
TrieNode Tests
/*----------------------------------------------*/

// find tests
QUnit.test( "Finding a TrieNode that does not exist", function( assert ) {
	var a = ["a", "to", "tea", "ted", "teds", "ten", "tennis", "i", "in", "inn"];
	var t = TrieNode(null);
	a.forEach(function(w){t.insert(w);});

  	assert.ok( t.find("nope") == null, "Passed!" );
});

QUnit.test( "Finding a TrieNode that does exist", function( assert ) {
	var a = ["a", "to", "tea", "ted", "teds", "ten", "tennis", "i", "in", "inn"];
	var t = TrieNode(null);
	a.forEach(function(w){t.insert(w);});

	var foundNode = t.find("tea");
  	assert.ok( foundNode != null, "Passed!" );
  	assert.ok(foundNode.key() == "tea", "Passed!");
});



// preOrderTraversal tests
QUnit.test( "Preorder traversal for empty Trie", function( assert ) {
	var t = TrieNode(null);
  	assert.ok( t.preOrderTraversal().length == 0, "Passed!" );
});

QUnit.test( "Preorder traversal for one level Trie", function( assert ) {
	var a = ["a" , "c", "b"];
	var t = TrieNode(null);
	a.forEach(function(w){t.insert(w);});
	var traversed = t.preOrderTraversal();
	var expected = ["a","b","c"]

	traversed.forEach(function(word, i){
		assert.ok(word == expected[i], "Passed!");
	})
});

QUnit.test( "Preorder traversal for multi-level Trie", function( assert ) {
	var a = ["a", "to", "tea", "ted", "teds", "ten", "tennis", "i", "in", "inn"];
	var t = TrieNode(null);
	a.forEach(function(w){t.insert(w);});
	var traversed = t.preOrderTraversal();
	var expected = ["a", "i", "in","inn", "tea", "ted", "teds", "ten", "tennis", "to"];

	assert.ok(traversed.length == 10, "Passed!");
	traversed.forEach(function(word, i){
		assert.ok(word == expected[i], "Passed!");
	})
});

// key tests
QUnit.test( "Key for word", function( assert ) {
	var t = TrieNode("hello");
  	assert.ok( t.key() == "hello", "Passed!" );
});


