import toast from 'react-hot-toast'

export const showToast = (message, type, id) => {
  switch (type) {
    case 'success':
      return toast.success(message, { id })
    case 'error':
      return toast.error(message, { id })
    case 'loading':
      return toast.loading(message, { id })
    default:
      return toast(message, { id })
  }
}

export const dismissToast = (id) => {
  toast.dismiss(id)
}

export const toastPromise = (promise, options) => {
  return toast.promise(promise, options)
}

export const wait = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
