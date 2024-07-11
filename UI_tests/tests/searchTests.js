module.exports = {
  '@tags': ['search'],

  'Search for "dress" and verify results': function(browser) {
    const homePage = browser.page.homePage();

    homePage
      .navigate()
      .waitForElementVisible('@body', 1000)
      .assert.titleContains('My Store')
      .setValue('@searchBox', 'dress')
      .click('@searchButton')
      .waitForElementVisible('@productList', 1000)
      .assert.containsText('@productList', 'dress');

    browser
      .elements('css selector', homePage.elements.productContainer.selector, function(result) {
        browser.assert.ok(result.value.length > 0, 'Verify that at least one product is displayed');
      })
      .end();
  }
};
