var URL_BASE2 = '/message-rest-ui/api/';
var URL_BASE3 = '/inbox-rest-ui/api/';

import { get, post, put, del, formPost } from '@react-ag-components/core/lib/api';

export function getMail(id) {
  return get(URL_BASE2 + 'v1/mail/thread/' + id);
}
export function getArchived() {
  return get(URL_BASE2 + 'v1/mail/archive');
}
export function getMails() {
  return get(URL_BASE3 + 'v1/all');
}
export function getUnreadCount() {
  return get(URL_BASE3 + 'v1/all/count');
}
export function getMailFromAll(id) {
  return get(URL_BASE3 + 'v1/notification/' + id);
}
export function setArchive(statusBody) {
  return put(URL_BASE2 + 'v1/mail/archive/status', statusBody);
}
export function sendMail(mail) {
  return post(URL_BASE2 + 'v1/mail/reply', mail);
}
//send it one by one and create the array output at the end
export function sendFile(file) {
  return post(URL_BASE2 + 'v1/mail/new/attachments', file);
}
export function getMailAttachment(id) {
  return get(URL_BASE2 + 'v1/mail/attachment/download/' + id);
}