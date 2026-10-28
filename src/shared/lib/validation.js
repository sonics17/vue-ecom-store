export const validateRequired = value => {
  if (value && value.trim().length > 0) return null
  return 'This fiels is required'
}

export const validateEmail = email => {
  if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
    return null
  return 'Incorrect Email'
}

export const validatePasswordComplexity = password => {
  if (password.trim().length >= 8 && /\d/.test(password)) return null
  return 'Must be 8+ characters and has at least 1 number'
}
