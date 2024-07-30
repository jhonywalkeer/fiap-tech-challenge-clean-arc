const QRCode = require('qrcode')

export const PaymentCommunication = async () => {
  return QRCode.toDataURL(
    `https://postech.fiap.com.br/curso/software-architecture/`
  )
}
