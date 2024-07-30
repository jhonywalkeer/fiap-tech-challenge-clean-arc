export const IsCpfIdentify = (value: string): boolean => {
  if (value.length !== 11) {
    return false
  }

  if (isNaN(Number(value.trim()))) {
    return false
  }

  return true
}
