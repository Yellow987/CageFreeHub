const adminUid = '7ZQ36Lt4N2QeLB2f0e9eMtDdmrx1'
export default adminUid
export function isAdmin(uid) {
  return adminUid === uid
}