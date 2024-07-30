import express, { Express } from 'express'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { RouterFramework } from '@main/framework'

export const SetupFramework = async (): Promise<void> => {
  const port: number = 3000
  const host: string = '0.0.0.0'
  const framework: Express = express()
  const db = new DatabaseConnection()
  const isDbConnected = await db.isConnected()

  if (!isDbConnected) {
    console.error(
      'Não foi possível conectar com o banco de dados! Aplicação esta sendo finalizada'
    )
    process.exit(1)
  }

  framework.use(express.json())

  RouterFramework(framework)

  framework.listen(port, host, () => {
    console.info('Banco de dados conectado com sucesso!')
    console.info(`Servidor rodando em http://127.0.0.1:${port}`)
  })
}
