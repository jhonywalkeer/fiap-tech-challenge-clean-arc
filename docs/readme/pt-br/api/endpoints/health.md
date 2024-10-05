## Health

Requisições de verificação de saúde (health check) dos serviços atrelados e dos endpoints da API. O objetivo destas requisições é monitorar a disponibilidade e o estado geral da aplicação e do banco de dados. As requisições de health check utilizam o método HTTP GET e retornam informações sobre o status de operação, confirmando se os serviços estão funcionando corretamente

---

### GET /health

Parametros:

```curl

curl --location 'http://127.0.0.1:3000/health'

```

```terminal

$response = Invoke-RestMethod 'http://127.0.0.1:3000/health' -Method 'GET' -Headers $headers
$response | ConvertTo-Json

```

| Chave | Valor | Descricao |
| ----- | ----- | --------- |
| N/A   | N/A   | N/A       |
