const QRCode = require('qrcode')

export const QrCodeGenerator = async (plainText: string) => {
  return QRCode.toString(plainText)
}
