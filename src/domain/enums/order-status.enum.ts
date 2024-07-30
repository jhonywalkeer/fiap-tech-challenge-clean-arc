export enum OrderStatus {
  Draft = 'Rascunho',
  AwaitingPayment = 'Aguardando pagamento',
  Failure = 'Falha em gerar pedido',
  WaitingPreparation = 'Aguardando preparo',
  InPreparation = 'Em preparo',
  Ready = 'Pronto',
  Delivered = 'Entregue'
}
