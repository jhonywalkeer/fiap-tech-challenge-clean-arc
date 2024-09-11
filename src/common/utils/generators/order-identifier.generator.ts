import {
  EmptyFiller,
  SeparatorKebabCaseFiller,
  Letters,
  Numbers
} from '@common/constants'

export const OrderIdentifierGenerator = (): string => {
  let result = EmptyFiller

  for (let i = 0; i < 2; i++) {
    result += Letters.charAt(Math.floor(Math.random() * Letters.length))
  }

  result += SeparatorKebabCaseFiller

  for (let i = 0; i < 3; i++) {
    result += Numbers.charAt(Math.floor(Math.random() * Numbers.length))
  }

  return result
}
