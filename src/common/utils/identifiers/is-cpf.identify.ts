export const IsCpfIdentify = (value: string | number): boolean => {
  if (String(value).length !== 11) {
    return false
  }

  return true
}
