'use strict';

exports.__esModule = true;
exports.getMail = getMail;
exports.getArchived = getArchived;
exports.getMails = getMails;
exports.getUnreadCount = getUnreadCount;
exports.getMailFromAll = getMailFromAll;
exports.setArchive = setArchive;
exports.sendMail = sendMail;
exports.sendFile = sendFile;
exports.getMailAttachment = getMailAttachment;

var _api = require('@react-ag-components/core/lib/api');

var URL_BASE2 = '/message-rest-ui/api/';
var URL_BASE3 = '/inbox-rest-ui/api/';

function getMail(id) {
  return (0, _api.get)(URL_BASE2 + 'v1/mail/thread/' + id);
}
function getArchived() {
  return (0, _api.get)(URL_BASE2 + 'v1/mail/archive');
}
function getMails() {
  return (0, _api.get)(URL_BASE3 + 'v1/all');
}
function getUnreadCount() {
  return (0, _api.get)(URL_BASE3 + 'v1/all/count');
}
function getMailFromAll(id) {
  return (0, _api.get)(URL_BASE3 + 'v1/notification/' + id);
}
function setArchive(statusBody) {
  return (0, _api.put)(URL_BASE2 + 'v1/mail/archive/status', statusBody);
}
function sendMail(mail) {
  return (0, _api.post)(URL_BASE2 + 'v1/mail/reply', mail);
}
//send it one by one and create the array output at the end
function sendFile(file) {
  return (0, _api.post)(URL_BASE2 + 'v1/mail/new/attachments', file);
}
function getMailAttachment(id) {
  return (0, _api.get)(URL_BASE2 + 'v1/mail/attachment/download/' + id);
}