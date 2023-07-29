export const LOCAL_STORAGE_NAME = 'DedoExpressUser'
export const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//export const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()-_+=~`[{]};:'",<.>/?\\|]{8,}$/
export const REGEX_PASSWORD = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/