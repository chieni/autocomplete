QUnit.test( "hello test", function( assert ) {
	var a = ["a", "to", "tea", "ted", "teds", "ten", "tennis", "i", "in", "inn"];
	var t = TrieNode(null);
	a.forEach(function(w){t.insert(w);});
	var matchList = t.getMatchList("t", 10);

  	assert.ok( matchList[0] == "tea", "Passed!" );
});