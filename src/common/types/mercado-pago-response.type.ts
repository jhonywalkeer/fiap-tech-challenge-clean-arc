export type MercadoPagoResponse = {
  accounts_info: any | null
  acquirer_reconciliation: any[]
  additional_info: {
    authentication_code: string | null
    available_balance: number | null
    nsu_processadora: string | null
  }
  authorization_code: string | null
  binary_mode: boolean
  brand_id: string | null
  build_version: string
  call_for_authorize_id: string | null
  callback_url: string | null
  captured: boolean
  card: any
  charges_details: Array<{
    accounts: any
    amounts: any
    client_id: number
    date_created: string
    id: string
    last_updated: string
    metadata: any
    name: string
    refund_charges: any[]
    reserve_id: string | null
    type: string
  }>
  collector_id: number
  corporation_id: string | null
  counter_currency: string | null
  coupon_amount: number
  currency_id: string
  date_approved: string | null
  date_created: string
  date_last_updated: string
  date_of_expiration: string
  deduction_schema: string
  description: string
  differential_pricing_id: string | null
  external_reference: string | null
  fee_details: any[]
  financing_group: string | null
  id: number
  installments: number
  integrator_id: string | null
  issuer_id: string
  live_mode: boolean
  marketplace_owner: string | null
  merchant_account_id: string | null
  merchant_number: string | null
  metadata: any
  money_release_date: string | null
  money_release_schema: string | null
  money_release_status: string
  notification_url: string | null
  operation_type: string
  order: any // Pode ser detalhado
  payer: {
    email: string | null
    entity_type: string | null
    first_name: string | null
    id: string
    identification: {
      number: string | null
      type: string | null
    }
    last_name: string | null
    phone: {
      area_code: string | null
      extension: string | null
      number: string | null
    }
    type: string | null
  }
  payment_method: {
    id: string
    issuer_id: string
    type: string
  }
  payment_method_id: string
  payment_type_id: string
  platform_id: string | null
  point_of_interaction: {
    application_data: {
      name: string | null
      version: string | null
    }
    business_info: {
      branch: string | null
      sub_unit: string
      unit: string
    }
    location: {
      source: string | null
      state_id: string | null
    }
    transaction_data: {
      bank_info: any
      bank_transfer_id: string | null
      e2e_id: string | null
      financial_institution: string | null
      qr_code: string
      qr_code_base64: string
      ticket_url: string
      transaction_id: string | null
    }
    type: string
  }
  pos_id: string | null
  processing_mode: string
  refunds: any[]
  release_info: string | null
  shipping_amount: number
  sponsor_id: string | null
  statement_descriptor: string | null
  status: string
  status_detail: string
  store_id: string | null
  tags: string | null
  taxes_amount: number
  transaction_amount: number
  transaction_amount_refunded: number
  transaction_details: {
    acquirer_reference: string | null
    bank_transfer_id: string | null
    external_resource_url: string | null
    financial_institution: string | null
    installment_amount: number
    net_received_amount: number
    overpaid_amount: number
    payable_deferral_period: string | null
    payment_method_reference_id: string | null
    total_paid_amount: number
    transaction_id: string | null
  }
}
