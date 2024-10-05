import { CapitalizeFirstLetterFormat } from '@common/utils/formaters'

export const NotFoundSpecificError = (
  field: string,
  identifier: string
): string => {
  return `${CapitalizeFirstLetterFormat(field)} com identificador ${identifier} não foi encontrado!`
}
