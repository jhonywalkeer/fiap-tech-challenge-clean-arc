import { CapitalizeFirstLetterFormat } from '@common/utils/formaters'

export const DeleteOrNotExistsError = (field: string): string => {
  return `${CapitalizeFirstLetterFormat(field)} já deletada(o) ou inexistente!`
}
