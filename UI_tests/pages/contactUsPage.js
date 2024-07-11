module.exports = {
  url: 'http://automationpractice.multiformis.com/index.php?controller=contact',
  elements: {
    body: 'body',
    pageTitle: 'title',
    subjectHeading: '#id_contact',
    email: '#email',
    orderReference: '#id_order',
    message: '#message',
    fileUpload: '#fileUpload',
    submitButton: '#submitMessage',
    successAlert: '.alert-success',
    errorAlert: '.alert-danger'
  }
};
