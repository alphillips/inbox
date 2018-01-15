const URL_BASE2 = '/message-rest-ui/api/'

import {get, post, put, del, formPost} from '@react-ag-components/core/lib/api'

export function getMail(id){
  return get(URL_BASE2 + 'v1/mail/thread/' + id)
}
export function getArchived(){
  return get(URL_BASE2 + 'v1/mail/archive')
}
export function getMails(){
  return get(URL_BASE2 + 'v1/mail')
}
export function getUnreadCount(){
  return get(URL_BASE2 + 'v1/mail/count')
}
export function setArchive(statusBody){
  return put(URL_BASE2 + 'v1/mail/archive/status', statusBody)
}
export function setRead(statusBody){
  return put(URL_BASE2 + 'v1/mail/read/status', statusBody)
}
export function sendMail(mail){
  let formData = new FormData();
  formData.append('file', mail);

  return formPost(URL_BASE2 + 'v1/mail/reply', formData)
}
//send it one by one and create the array output at the end
export function sendFiles(files){
  let formData = new FormData();
  formData.append('file', files);
  return formPost(URL_BASE2 + 'v1/mail/new/attachments', files)
}
export function getFile(id){
  return get(URL_BASE2 + 'v1/file/' + id)
}
export function updateMailFile(statusBody){
  return put(URL_BASE2 + '/v1/mail/link/attachments')
}
