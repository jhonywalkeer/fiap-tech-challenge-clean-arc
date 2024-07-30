import { letters, numbers } from '@common/constants'

export const OrderIdentifierGenerator = (): string => {
  let result = ''

  for (let i = 0; i < 2; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length))
  }

  result += '-'

  for (let i = 0; i < 3; i++) {
    result += numbers.charAt(Math.floor(Math.random() * numbers.length))
  }

  return result
}
