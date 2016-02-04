describe('Protractor Demo App', function() {
    it('should have a title', function() {
        browser.get('http://juliemr.github.io/protractor-demo/');

        expect(browser.getTitle()).toEqual('Super Calculator');
    });
});



//describe('Sign in page state', function() {
//    browser.get('http://localhost:3000/');
//
//    function bycss(selector) {
//        return element(by.css(selector))
//    }
//
//    var el = {
//        login : bycss('input[name=login]'),
//        password : bycss('input[name=password]'),
//        russian : bycss('.lang-ru'),
//        submit : bycss('button[type=submit]'),
//        title : bycss('h2'),
//        message : bycss('.message')
//    };
//
//    it('wrong password must show message', function (done) {
//        el.login.sendKeys('wrong user');
//        el.password.sendKeys('wrong pwd');
//        el.submit.click();
//
//        expect(el.message.getText()).toContain('Invalid');
//        done();
//    });
//
//    it('changing language must change title', function (done) {
//        var before = el.title.getText();
//        el.russian.click();
//
//        expect(el.title.getText()).not.toBe(before);
//        done();
//    });
//});