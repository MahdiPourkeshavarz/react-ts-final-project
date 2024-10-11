import { useState } from 'react'

export function useFieldValidation(
  initialValue = '',
  validationType = 'string',
) {
  const [value, setValue] = useState(initialValue)
  const [isValid, setIsValid] = useState(false)

  const validate = input => {
    let regex

    switch (validationType) {
      case 'persian':
        regex = /^[\u0600-\u06FF\s]+$/
        break
      case 'persianAndEnglish':
        regex = /^[\u0600-\u06FFa-zA-Z\s]+$/
        break
      case 'number':
        regex = /^\d+(\.\d+)?$/
        break
      case 'english':
        regex = /^[a-zA-Z\s]+$/
        break
      default:
        regex = /.*/
    }

    setIsValid(regex.test(input))
    setValue(input)
  }

  return {
    value,
    isValid,
    setValue: validate,
  }
}
