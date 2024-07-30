## Diretórios

Os diretórios são uma parte importante de qualquer projeto, pois é neles que você organiza seus arquivos e uma boa organização de diretórios pode facilitar a manutenção e evolução do projeto. Dessa forma é importante definir uma estrutura de diretórios que seja clara e que facilite a localização dos arquivos, com isso nessa secao sera apresentado a estrutura de diretórios que será utilizada no projeto. Como mencionado anteriomente a estrutura e um projeto de software orientado a domínio (Domain-Driven Design - DDD) com a arquitetura Hexagonal aplicada.

### Estrutura de Diretórios

A estrutura de diretórios do projeto será organizada da seguinte forma:

```

fiap-tech-challenge/
│
├── src/
│ ├── adapters
│ │ ├── driven (também poderia ser chamar outbound)
│ │ | ├── framework
│ │ | ├── infrastructure
│ │ | | ├── gateway
│ │ | | ├── persistence
│ │ | | | ├── migrations
│ │ | | | ├── schema (também poderia ser chamar model)
│ │ | ├── mappers
│ │ ├── driver (também poderia ser chamar inbound)
│ │ | ├── controllers
│ │ | ├── dtos
│ │ | ├── factories
│ │ | ├── http
│ │ | ├── presenters
│ │ | ├── routes
│ │ | ├── validators
│ ├── boostrap
│ ├── coommon
│ │ ├── constants
│ │ ├── enums
│ │ ├── types
│ │ ├── utils
│ │ | ├── exceptions
│ │ | ├── filters
│ │ | ├── formaters
│ │ | ├── generators
│ │ | ├── identifiers
│ ├── core
│ │ ├── application
│ │ | ├── ports
│ │ | | ├── in
│ │ | | ├── out
│ │ | ├── repositories
│ │ | ├── usecases
│ │ ├── domain
│ │ | ├── entities

```

### Descrição dos Diretórios

- **Adapters**: Este diretório contém os adaptadores que conectam a lógica de negócios com os detalhes técnicos do sistema. Nesse caso o mesmo foi dividido em duas partes: `driven` e `driver` (poderia ser chamado de outbound e inbound respectivamente).

- **Driven (ou outbound)**: Este diretório contém os adaptadores para serviços externos ou infraestrutura, como banco de dados, API externas, etc. Nesse caso o mesmo foi dividido em duas partes: `framework`, `infrastructure` e `mappers`.

- **Framework**: Este diretório contém os adaptadores para frameworks externos como Express (que estamos utilizando no projeto) ou Nest.js. Aqui estamos lidando com algumas definições particulares do framework como, por exemplo: o roteamento seguindo as diretrizes de definição com base no contexto do Express, rate limit (lidando com uma lib que é específica para o Express), setup de execução do projeto, etc.

- **Infrastructure**: Este diretório contém os adaptadores para infraestrutura, como banco de dados, API externas, etc. Nesse caso o mesmo foi dividido em duas partes: `gateway` e `persistence`.

- **Gateway**: Este diretório contém os adaptadores para comunicação com serviços externos que no contexto do projeto atual seria o servico responsavel por fazer a geracao de QR Code

- **Persistence**: Este diretório contém os adaptadores para comunicação e geranciamento do banco de dados (gerenciando a estrutura do banco atraves da migrations por exemplo). Nesse caso o mesmo foi dividido em duas partes: `migrations` e `schema`.

- **Migrations**: Este diretório contém os arquivos de migração do banco de dados, que são responsáveis por criar, alterar ou excluir tabelas, índices, etc.

- **Schema (ou model)**: Este diretório contém os arquivos de definição do modelo de dados do banco de dados, que são responsáveis por definir a estrutura das tabelas.

- **Mappers**: Este diretório contém os adaptadores para mapear os dados entre a lógica de negócios e os detalhes técnicos do sistema.

- **Driver (ou inbound)**: Este diretório contém os adaptadores para a camada de entrada da aplicação, como `controllers`, `dtos`, `factories`, `http`, `presenters`, `routes` e `validators`.

- **Controllers**: Este diretório contém os controladores da aplicação, que são responsáveis por receber as requisições HTTP, chamar os casos de uso correspondentes e retornar as respostas HTTP.

- **DTOs**: Este diretório contém os objetos de transferência de dados (DTOs) da aplicação, que são responsáveis por transferir os dados entre a camada de entrada e a camada de aplicação validando os dados.

- **Factories**: Este diretório contém as fábricas da aplicação, que são responsáveis por criar instâncias dos objetos de domínio da aplicação.

- **HTTP**: Este diretório contém os adaptadores para comunicação com a camada de entrada da aplicação, como middlewares, interceptors, etc.

- **Presenters**: Este diretório contém os apresentadores da aplicação, que são responsáveis por formatar as respostas HTTP.

- **Routes**: Este diretório contém as rotas da aplicação, que são responsáveis por definir as rotas HTTP da aplicação.

- **Validators**: Este diretório contém os validadores da aplicação, que são responsáveis por validar os dados tipos de dados que são recebidos pela aplicação. Uma poderoso aliado dos DTO`s para garantir a integridade dos dados.

- **Bootstrap**: Este diretório contém os arquivos de inicialização da aplicação, que são responsáveis por configurar e iniciar a aplicação.

- **Common**: Este diretório contém os arquivos comuns da aplicação, como `constants`, `enums`, `types` e `utils`.

- **Constants**: Este diretório contém as constantes da aplicação, que são valores que não mudam durante a execução da aplicação.

- **Enums**: Este diretório contém os enums da aplicação, que são valores que representam um conjunto de constantes.

- **Types**: Este diretório contém os tipos da aplicação, que são responsáveis por definir os tipos de dados que são utilizados na aplicação.

- **Utils**: Este diretório contém os utilitários da aplicação, que são responsáveis por fornecer funcionalidades auxiliares para a aplicação, como `exceptions`, `filters`, `formatters`, `generators` e `identifiers`.

- **Exceptions**: Este diretório contém as exceções da aplicação, que são responsáveis por representar os erros que podem ocorrer durante a execução da aplicação.

- **Filters**: Este diretório contém os filtros da aplicação, que são responsáveis por filtrar os dados que são recebidos pela aplicação.

- **Formatters**: Este diretório contém os formatadores da aplicação, que são responsáveis por formatar os dados que são enviados pela aplicação.

- **Generators**: Este diretório contém os geradores da aplicação, que são responsáveis por gerar valores únicos, como IDs.

- **Identifiers**: Este diretório contém os identificadores da aplicação, que são responsáveis por identificar os objetos da aplicação.

- **Core**: Este diretório contém os arquivos principais da aplicação, como `application` e `domain`.

- **Application**: Este diretório contém os arquivos da camada de aplicação da aplicação, como `ports`, `repositories` e `usecases`.

- **Ports**: Este diretório contém as portas da aplicação, que são responsáveis por definir as interfaces que são utilizadas pela aplicação onde temos as portas de entrada (`in`) e saida (`out`).

- **Repositories**: Este diretório contém os repositórios da aplicação, que são responsáveis por acessar os dados da aplicação.

- **Usecases**: Este diretório contém os casos de uso da aplicação, que são responsáveis por implementar as regras de negócio da aplicação.

- **Domain**: Este diretório contém os arquivos da camada de domínio da aplicação, como `entities`.

- **Entities**: Este diretório contém as entidades da aplicação, que são responsáveis por representar os objetos de domínio da aplicação.
