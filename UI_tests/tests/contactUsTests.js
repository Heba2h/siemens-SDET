module.exports = {
  '@tags': ['contactus'],

  'Contact Us Form - Valid Submission': function(browser) {
    const contactUsPage = browser.page.contactUsPage();

    contactUsPage
      .navigate()
      .waitForElementVisible('@body', 2000)
      .assert.titleContains('Contact us')
      .setValue('@subjectHeading', 'Customer service')
      .setValue('@email', 'test@example.com')
      .setValue('@orderReference', '12345')
      .setValue('@message', 'This is a test message.')
      .click('@submitButton')
      .waitForElementVisible('@successAlert', 1000)
      .assert.containsText('@successAlert', 'Your message has been successfully sent to our team.');

    browser.end();
  },

  'Contact Us Form - Missing Subject Heading': function(browser) {
    const contactUsPage = browser.page.contactUsPage();

    contactUsPage
      .navigate()
      .waitForElementVisible('@body', 1000)
      .assert.titleContains('Contact us')
      .setValue('@email', 'test@example.com')
      .setValue('@message', 'This is a test message.')
      .click('@submitButton')
      .waitForElementVisible('@errorAlert', 1000)
      .assert.containsText('@errorAlert', 'Please select a subject from the list provided.');

    browser.end();
  },

  'Contact Us Form - Missing Email Address': function(browser) {
    const contactUsPage = browser.page.contactUsPage();

    contactUsPage
      .navigate()
      .waitForElementVisible('@body', 1000)
      .assert.titleContains('Contact us')
      .setValue('@subjectHeading', 'Customer service')
      .setValue('@message', 'This is a test message.')
      .click('@submitButton')
      .waitForElementVisible('@errorAlert', 1000)
      .assert.containsText('@errorAlert', 'Invalid email address.');

    browser.end();
  },

  'Contact Us Form - Missing Message': function(browser) {
    const contactUsPage = browser.page.contactUsPage();

    contactUsPage
      .navigate()
      .waitForElementVisible('@body', 1000)
      .assert.titleContains('Contact us')
      .setValue('@subjectHeading', 'Customer service')
      .setValue('@email', 'test@example.com')
      .click('@submitButton')
      .waitForElementVisible('@errorAlert', 1000)
      .assert.containsText('@errorAlert', 'The message cannot be blank.');

    browser.end();
  },

  'Contact Us Form - File Upload': function(browser) {
    const contactUsPage = browser.page.contactUsPage();

    contactUsPage
      .navigate()
      .waitForElementVisible('@body', 1000)
      .assert.titleContains('Contact us')
      .setValue('@subjectHeading', 'Customer service')
      .setValue('@email', 'test@example.com')
      .setValue('@message', 'This is a test message.')
      .setValue('@fileUpload', require('path').resolve(__dirname + '/testfile.txt'))
      .click('@submitButton')
      .waitForElementVisible('@successAlert', 1000)
      .assert.containsText('@successAlert', 'Your message has been successfully sent to our team.');

    browser.end();
  }
};
