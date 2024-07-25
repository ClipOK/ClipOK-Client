export const getCookie = (name) => {
  return window.sessionStorage.getItem(name)
}

export const setCookie = (name, value) => {
  window.sessionStorage.setItem(name, value)
}

export const deleteCookie = (name) => {
  window.sessionStorage.removeItem(name)
}

export const clearAllCookies = () => {
  window.sessionStorage.clear()
}
