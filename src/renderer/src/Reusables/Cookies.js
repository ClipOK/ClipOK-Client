import { secrets } from '../Secrets.js'
const { backendUrl } = secrets

export const getCookie = (name) => {
  return new Promise((resolve, reject) => {
    session.defaultSession.cookies
      .get({ name: name })
      .then((cookies) => {
        console.log(cookies)
        resolve(cookies)
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
  })
}

export const setCookie = ({ url = backendUrl, name, value, domain }) => {
  return new Promise((resolve, reject) => {
    session.defaultSession.cookies
      .set({
        url: url,
        name: name,
        value: value,
        domain: domain
      })
      .then(() => {
        console.log('Cookie set')
        resolve()
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
  })
}

export const deleteCookie = (name) => {
  return new Promise((resolve, reject) => {
    session.defaultSession.cookies
      .remove(backendUrl, name)
      .then(() => {
        console.log('Cookie removed')
        resolve()
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
  })
}

export const clearAllCookies = () => {
  return new Promise((resolve, reject) => {
    session.defaultSession
      .clearStorageData({
        storages: ['cookies']
      })
      .then(() => {
        console.log('Cookies cleared')
        resolve()
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
  })
}
