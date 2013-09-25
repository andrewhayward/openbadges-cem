const KEY = process.env['MANDRILL_KEY'];

const mandrill = require('node-mandrill')(KEY);

function defaultCallback(err, res) {
  if (err) {
    console.log(JSON.stringify(err));
  }

  console.log(res);
}

module.exports = {

  // Send email to notify user that their badge application was rejected
  sendApplyFailure: function sendApplyFailure(badge, email, callback) {
    callback = callback || defaultCallback;
    mandrill('messages/send-template', {
      template_name: 'cem-apply-rejected',
      template_content: [],
      message: {
        to: [ { email: email } ],
        global_merge_vars: [
          { name: 'badgename', content: badge.name } ]
      }
    }, callback);
  },

  // Send email to notify user that their badge application was successful and that they were awarded a badge
  sendApplySuccess: function sendApplySuccess(badge, email, callback) {
    callback = callback || defaultCallback;
    mandrill('messages/send-template', {
      template_name: 'cem-badge-earned',
      template_content: [],
      message: {
        to: [ { email: email } ],
        global_merge_vars: [
          { name: 'badgename', content: badge.name },
          { name: 'badgeimage', content: badge.image },
          { name: 'badgedesc', content: badge.description } ]
      }
    }, callback);
  },

  // Send email to notify giverEmail that their Peer to Peer badge award to recipientEmail was rejected
  sendGiveFailure: function sendGiveFailure(badge, giverEmail, recipientEmail, callback) {
    callback = callback || defaultCallback;
    mandrill('messages/send-template', {
      template_name: 'cem-give-failure',
      template_content: [],
      message: {
        to: [ { email: giverEmail } ],
        global_merge_vars: [
          { name: 'badgename', content: badge.name },
          { name: 'friendemail', content: recipientEmail } ]
      }
    }, callback);
  },

  // Send email to notify giverEmail that their Peer to Peer badge award to recipientEmail was successful
  sendGiveSuccess: function sendGiveSuccess(badge, giverEmail, recipientEmail, callback) {
    callback = callback || defaultCallback;
    mandrill('messages/send-template', {
      template_name: 'cem-give-success',
      template_content: [],
      message: {
        to: [ { email: giverEmail } ],
        global_merge_vars: [
          { name: 'badgename', content: badge.name },
          { name: 'friendemail', content: recipientEmail } ]
      }
    }, callback);
  },

  // Send email to notify recipientEmail that they were awarded a Peer to Peer badge by giverEmail
  sendGiveAward: function sendGiveSuccess(badge, giverEmail, recipientEmail, callback) {
    callback = callback || defaultCallback;
    mandrill('messages/send-template', {
      template_name: 'cem-badge-earned',
      template_content: [],
      message: {
        to: [ { email: recipientEmail } ],
        global_merge_vars: [
          { name: 'badgename', content: badge.name },
          { name: 'badgeimage', content: badge.image },
          { name: 'badgedesc', content: badge.description } ]
      }
    }, callback);
  }
};