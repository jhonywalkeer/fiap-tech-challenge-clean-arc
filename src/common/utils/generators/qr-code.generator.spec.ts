import { QrCodeGenerator } from './qr-code.generator'

const QRCode = require('qrcode')

jest.mock('qrcode', () => ({
  toDataURL: jest.fn(() => Promise.resolve('A simple text'))
}))

describe('[Utils] QR Code Generator', () => {
  it('should return a QR code string', async () => {
    const result = await QrCodeGenerator('A simple text')

    expect(QRCode.toString).toHaveBeenCalledWith('A simple text')
    expect(result).toBe('A simple text')
  })
})
