import { atom } from 'recoil'

export const loadingState = atom({
  key: 'loading',
  default: false
})

export const clipsState = atom({
  key: 'clipsState',
  default: []
})

export const imagesState = atom({
  key: 'imagesState',
  default: []
})

export const clipBoardState = atom({
  key: 'clipBoardState',
  default: []
})