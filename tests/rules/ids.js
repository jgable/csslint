(function(){

    /*global YUITest, CSSLint*/
    var Assert = YUITest.Assert;

    YUITest.TestRunner.add(new YUITest.TestCase({

        name: "IDs Rule Errors",

        "Using an ID should result in one warning": function(){
            var result = CSSLint.verify("#foo { float: left;}", { ids: 1 });
            Assert.areEqual(1, result.messages.length);
            Assert.areEqual("warning", result.messages[0].type);
            Assert.areEqual("Don't use IDs in selectors.", result.messages[0].message);
            Assert.areEqual(1, result.messages[0].col);
        },

        "Using multiple IDs should result in one warning": function(){
            var result = CSSLint.verify("#foo #bar { float: left;}", { ids: 1 });
            Assert.areEqual(1, result.messages.length);
            Assert.areEqual("warning", result.messages[0].type);
            Assert.areEqual("2 IDs in the selector, really?", result.messages[0].message);
            Assert.areEqual(1, result.messages[0].col);
        },

        "Using an ID in a selector should report column at first ID when only one ID": function(){
            var result = CSSLint.verify("body #foo { float: left;}", { ids: 1 });
            Assert.areEqual(1, result.messages.length);
            Assert.areEqual("warning", result.messages[0].type);
            Assert.areEqual("Don't use IDs in selectors.", result.messages[0].message);
            Assert.areEqual(6, result.messages[0].col);
        },

        "Using an ID in a selector should report column at first ID when multiple IDs": function(){
            var result = CSSLint.verify("body .other #foo #bar #baz { float: left;}", { ids: 1 });
            Assert.areEqual(1, result.messages.length);
            Assert.areEqual("warning", result.messages[0].type);
            Assert.areEqual("3 IDs in the selector, really?", result.messages[0].message);
            Assert.areEqual(13, result.messages[0].col);
        }
    }));

})();
