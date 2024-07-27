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

export const epochToDateLocale = (epoch, type) => {
  let date
  if (type == 'ms') {
    date = new Date(epoch)
  } else if (type == 's') {
    date = new Date(epoch * 1000)
  } else if (!type) {
    throw new Error('Type expected')
  } else {
    throw new Error('Invalid type')
  }
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }
  const formattedDate = date.toLocaleDateString('en-IN', options)
  return formattedDate
}
