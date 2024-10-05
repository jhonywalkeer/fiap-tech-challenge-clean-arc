export const NumberValidationMessage = (identifier: string): string => {
  return `O campo ${identifier} deve ser um number`
}

export const StringValidationMessage = (identifier: string): string => {
  return `O campo ${identifier} deve ser uma string`
}

export const EnumValidationMessage = (identifier: string): string => {
  return `Valor da propriedade ${identifier} informado não é válido`
}
