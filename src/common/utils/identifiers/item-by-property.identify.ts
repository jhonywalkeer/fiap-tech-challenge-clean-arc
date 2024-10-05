export const ItemByPropertyIdentify = (array: any, key: string, value: any) => {
  return array?.find((item: any) => item[key] === value)
}
