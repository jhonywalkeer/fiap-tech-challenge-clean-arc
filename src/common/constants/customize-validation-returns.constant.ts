export const NumberValidationMessage = (identifier: string) => {
  return `O campo ${identifier} deve ser um número`
}

export const StringValidationMessage = (identifier: string) => {
  return `O campo ${identifier} deve ser uma string`
}

export const EnumValidationMessage = (identifier: string) => {
  return `Valor da propriedade "${identifier}" informado não é válido`
}
