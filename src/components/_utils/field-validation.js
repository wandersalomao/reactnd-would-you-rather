
// This file contains helper functions used to validate input fields. 

export const requiredValidation = value => (value ? undefined : 'This field is required')

export const emailValidation = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined