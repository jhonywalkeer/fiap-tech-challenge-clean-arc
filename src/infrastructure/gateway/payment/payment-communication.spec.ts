import { PaymentCommunication } from './payment-communication'
const QRCode = require('qrcode')

jest.mock('qrcode', () => ({
  toDataURL: jest.fn(() =>
    Promise.resolve('data:image/png;base64,iVBORw0KG...')
  )
}))

describe('[Gateways] Payment Communication', () => {
  it('should return a QR code data URL', async () => {
    const result = await PaymentCommunication()

    expect(QRCode.toDataURL).toHaveBeenCalledWith(
      'https://postech.fiap.com.br/curso/software-architecture/'
    )
    expect(result).toBe('data:image/png;base64,iVBORw0KG...')
  })
})
