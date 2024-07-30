## Executando o projeto

### Requisitos

- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/getting-started/install) (opcional)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [PostgreSQL](https://www.postgresql.org/download/) (opcional, podendo ser utilizado um SGBD de sua preferência)
- [Insomnia](https://insomnia.rest/download) ou [Postman](https://www.postman.com/downloads/) (opcional)

### Clonando o repositório

Clone o repositorio para sua máquina local utilizando o comando abaixo:

```bash
git clone https://github.com/jhonywalkeer/fiap-tech-challenge.git
```

Dessa forma, você terá o projeto em sua máquina local, podendo executá-lo e/ou editá-lo. Tendo como opcao execucao do projeto em sua máquina local ou em um container Docker.

### Instalando as dependências

```bash
npm install
# ou
yarn install
```

### Configurando o banco de dados

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/fiap-tech-challenge
```

### Executando as migrações

Basta executar o script definido como `prisma:apply-migrations`:

```bash
npm run prisma:apply-migrations
# ou
yarn prisma:apply-migrations
```

### Docker

#### Executando o Docker

```bash
docker-compose up
```
