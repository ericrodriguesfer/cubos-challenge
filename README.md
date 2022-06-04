<p align="center">
  <a href="https://cubos.io/" target="blank"><img src="https://i.imgur.com/V83Uw0Q.png" width="320" alt="Nest Logo" /></a>
</p>

## Descrição

Este projeto é a minha proposta de solução a um desafio da [Cubos](https://cubos.io/), desafio esse proposto por eles em uma vaga de Desenvolvedor(a) Back-end Node, onde o desafio em sua descrição consiste basicamente em criar/implementar uma api com NodeJs, para horários de atendimento em clínicas. Onde a api deve permitir criar regras de atendimento (que podem ser diárias, dia específico ou semanal), listar todas as regras de atendimento, deletar uma dada regra de atendimento, e também, deve permitir fazer um filtro passando duas datas, e dentro desse intervalo das datas passsadas é retornado cada dia do intervalo bem como os intervalos de horários para atendimento daquele dia, tudo isso baseado nas regras. A forma de armazenar os dados da api, é escrevendo em arquivos *JSON*. Caso queria saber mais do desafio, acesse a [descrição do mesmo aqui](https://gitlab.com/ericrodriguesfer/cubos-vacancy-challenge/-/tree/master/descricao).

## Tecnologias utilizadas no projeto
* NodeJs
* ExpressJs
* Moment
* Json
* Celebrate
* UUID
* Express Async Errors
* Typescript

## Arquitetura

Para a implementação do projeto utilizei NodeJs em conjunto com o framewok ExpressJs, todo o projeto foi implementado utilizando Typescript.

A arquitetura do projeto está basicamente focada dentro da pasta *src*, a baixo segue a estrutura de pastas do projeto bem como a organização dos arquivos do mesmo:

```
src
 -- app         // Pasta que contem toda a configuração geral da aplicação, como configuração de tratamento de exceções globais, aplicação das rotas, definição do Express, aplicação dos erros via Celebrate, liberação de acesso via cors e etc.
 -- constants   // Pasta que contem todas as contants utilizadas pela aplicação, seja de configuração, localização e um arquivo dentro da arquitetura e etc.
 -- controllers // Pasta que contem todos os controladores da aplicação responsáveis por interceptar/receber as requisições vida do mundo externo, as barras, coletar os dados, e despachar os mesmos para a camada que executa as regras de negócios, e aguardar o retorno da camada de negócio e realizar o retorno dessa reposta para o solicitante da requisição.
 -- database    // Pasta que contem os arquivos de configuração do banco de dados, nesse caso, pasta que contem o arquivo database.json, que nesse cenário é o nosso banco de dados.
 -- enums       // Pasta que contem todas as enumerações que são utilizadas pela aplicação.
 -- errors      // Pasta que contem todas as implementações referentes aos erros da aplicação, como por exemplo, as classes que modelam os erros dentro do domínio.
 -- models      // Pasta que contem todos os modelos ou entidades da aplicação.
 -- providers   // Pasta que contem implementações que provem serviços para aplicação como um todo, implementações que geralmente se repetem em mais de um lugar, e são desacopladas para serem utilizadas por mais de um local ou camada que solicite tal execução destas implementações, sem que hava e redundância e códigos.
 -- repositorys // Pasta que contem todos os repositórios da aplicação, camada que se encontra mais próxima da camada de dados, dado que os repositórios trabalham diretamente sobre as entidades que modelam as tabelas ou esquemas no banco de dados.
 -- routes      // Pasta que contem todas as configurações de controle e gerenciamentos de rotas/enpoints dentro da aplicação, bem como aplicação de validação sobre as rotas.
 -- services    // Pasta que contem as implementações dos serviços da aplicação, que é a camada da aplicação responsável pelo controle e aplicação das regras de negócios, bem como utilização da camada de repositórios para persistência dos dados.
 -- validations // Pasta que contem todas as configurações de validação da aplicação, validações essas que são aplicadas em forma de middlewares nas rotas.
 server.ts      // Arquivo de ponta pé inicial do projeto, é por ele que é iniciado a execução do servidor/api/projeto.
```

Analisando a pasta *src/providers* em específico, irá ser explicado um dos providers do projeto, mas a explicação é genérica para todos:
```
providers
 -- hours                                    // Nesse caso, esse provedor, foi implementado para desaclopar códigos redundantes relacionados a implementações que envolverm horas, como calculos que envolvem horas por exemplo.
   -- intersection                           // Essa é um implementação específica do provider de horas, onde essa implementação trabalha unicamente com a questão da interseção entre das horas.
     -- contract                             // Pasta que define o contrato desta implementação, que basicamente é uma interface que define a escrita dos métodos.
       - IntersectionHoursContract.ts        // Arquivo que define a interface/contrato.
     -- implementations                      // Pasta que contem a implementação do contrato anterior, com base no contrato/assinatura a mesma realiza a implementação de sua funcionalidade guiada a uma definição de escrita, tando de entrada quando de retorno.
       - IntersectionHoursImplementations.ts // Arquivo que contem a implementação do contrato citado a cima.
```
Analisando a pasta *src/routes* em específico:
```
routes
 - index.ts            // Arquivo de contem/configura todas as entradas de rotas da aplicação.
 - SchedulingRoutes.ts // Arquivo que contem/configura todas as entradas de rotas de uma parte da aplicação, neste caso tudo de scheduling.
```
Exemplificando o padrão de acesso aos dados da aplicação:

```
Requisição HTTP -> Controller -> Service -> Repository -> Entity
```

## Requisitos para executar o projeto
* Ter o Node instalado em sua máquina.
* Ter o gerenciador de pacotes Yarn ou NPM instalado em sua máquina.
* Ter o Git instalado em sua máquina.

## Como executar o projeto

Primeiro faça um clone do projeto para sua máquina, assim escolha um local em seu computador que acha adequado para tal, e siga os passos/comandos a baixo em um terminal de sua preferência, executando um por vez, uma após o final da execução do outro:
```bash
git clone https://gitlab.com/ericrodriguesfer/cubos-vacancy-challenge.git

cd cubos-vacancy-challenge

# Use um desses três comandos a baixo, ambos fazem a mesma coisa
yarn         # Opção 01
npm i        # Opção 02
npm install  # Opção 03
```

Com isso terá clonado o projeto em sua máquina e instalado todas as dependências necessárias para ele funcionar.
Com isso, o projeto já está pronto para ser executado e testado/utilizado.

Caso queira modificar alguma configuração, como por exemplo, a porta em que vai ser executada a api em seu SO, basta acessar o arquivo *.env*, que está na raiz do projeto e modificar o valor da variável PORT, como mostra o exemplo abaixo:

```enviroment
PORT=3333
```
Com isso, para executar a aplicação, execute um dos comandos abaixo em seu terminal:

```bash
# Existes algumas formas de rodar o comando, irei listas algumas, use a que preferir
yarn dev         # Opção 01
npm run dev      # Opção 02
```

Após isso você já pode realizar a utilização e exploração do projeto, caso tenha seguido todo o passo a passo como segueri, a aplicação estará rodando na seguinte url em sua máquina: http://localhost:3333.

Caso queira testar/realizar as requisições/explorar o projeto por alguma ferramenta dedicada para depurar e executar apis/back-end, dentro da pasta *postman*, disponibilizo o arquivo de exportação do Postman, [[arquivo Postman clique aqui]](https://gitlab.com/ericrodriguesfer/cubos-vacancy-challenge/-/blob/master/postman/Cubos%20Challenge.postman_collection.json), basta fazer o download deste arquivo e ir em seu Postman e importar esse arquivo que será criado uma coleção sem sua workspace e dentro dela terá todas as requisições que podem ser feitas ao projeto, bem como suas urls, headers, params e bodys definidos e previamente preenchidos.

## Documentação de Requisições

### Cadastro de regra de atendimento

Para a criação de uma regra de atendimento, são possíveis três formas de criação de uma regra, que são:

1. Dia específico (DAY, 0)
2. Diário (DAILY, 1)
3. Semanalmente (WEEKLY, 2)

Onde cada uma dessas formas de criar, exige um *payload* específico/apropriado.


Esse *endpoint* é responsável por receber uma regra de atendimento e a salvá-la no banco de dados.

#### Criação de regra de dia específico:
* Endpoint: `http://localhost:3333/scheduling`
* HTTP Method: POST
* HTTP Success Response Code: CREATED (200)
* HTTP Error Response Code: BAD REQUEST (400)
* HTTP Error Response Code: CONFLICT (409)
* **Observações**: Sendo do *type* 0, esse *payload* exige que haja o atribudo *day* específico contendo uma data em do tipo *string* no formato DD-MM-YYYY e os *intervals*.
* Contract:
  * Request payload

```json
{
  "type": 0,
  "day": "06-06-2022",
  "intervals": [
    {
      "start": "18:00",
      "end": "17:00"
    }
  ]
}​
```
  * Response payload
```json
{
  "message": "Scheduling create with success!",
  "scheduling": {
    "id": "49f5fa68-ff45-4ce0-9404-568a5cfbad19",
    "type": 0,
    "day": "06-06-2022",
    "intervals": [
      {
        "start": "16:00",
        "end": "17:00"
      }
    ]
  }
}​
```

#### Criação de regra diária:
* Endpoint: `http://localhost:3333/scheduling`
* HTTP Method: POST
* HTTP Success Response Code: CREATED (200)
* HTTP Error Response Code: BAD REQUEST (400)
* HTTP Error Response Code: CONFLICT (409)
* **Observações**: Sendo do *type* 1, esse *payload* não exige nenhum atributo específico, sendo necessário somente os *intervals*.
* Contract:
  * Request payload

```json
{
  "type": 1,
  "intervals": [
    {
      "start": "16:00",
      "end": "17:00"
    }
  ]
}
​
```
  * Response payload
```json
{
  "message": "Scheduling create with success!",
  "scheduling": {
    "id": "9f5b1349-dbb6-49a3-8cc3-d42cf6d6cea5",
    "type": 1,
    "intervals": [
      {
        "start": "16:00",
        "end": "17:00"
      }
    ]
  }
}​
```

#### Criação de regra semanal:
* Endpoint: `http://localhost:3333/scheduling`
* HTTP Method: POST
* HTTP Success Response Code: CREATED (200)
* HTTP Error Response Code: BAD REQUEST (400)
* HTTP Error Response Code: CONFLICT (409)
* **Observações**: Sendo do *type* 2, esse *payload* exige que haja um atributo específico *daysOnWeek* sendo repassado, atributo esse que é um vetor de inteiros, de segue o formato: 0 - domingo - SUNDAY, 1 - segunda-feira - MONDAY, 2 - terça-feira - TUESDAY, 3 - quarta-feira - WEDNESDAY, 4 - quinta-feira - THURSDAY, 5 - sexta-feira - FRIDAY, 6 - sábado - SATURDAY, e os *intervals*.
* Contract:
  * Request payload

```json
{
  "type": 2,
  "daysOnWeek": [1, 2],
  "intervals": [
    {
      "start": "16:00",
      "end": "17:00"
    }
  ]
}
​
```
  * Response payload
```json
{
  "message": "Scheduling create with success!",
  "scheduling": {
    "id": "697b2c51-9af6-4ac5-8cbf-a92f898d4f99",
    "type": 2,
    "daysOnWeek": [
      1,
      2
    ],
    "intervals": [
      {
        "start": "16:00",
        "end": "17:00"
      }
    ]
  }
}​
```

### Apagar regra
Esse *endpoint* deverá receber um id da uma regra via *params*, id esse que é o UUID associado a cade regra quando a mesma é cadastrada, e realizar a deleção da mesma do banco de dados, caso a mesma se encontre registrada lá.
* Endpoint: `http://localhost:3333/scheduling/<ruleId>`
* Exemplo da requisição: `http://localhost:8080/graph/a58b61ca-2318-477b-86b8-6ee907f6b06f`
* HTTP Method: DELETE
* HTTP Success Response Code: OK (200)
* HTTP Error Response Code: NOT FOUND (404)
* Contract:
  * Request payload: none
* Response payload

```json
{
  "message": "Scheduling deleted with success!",
  "scheduling": {
    "id": "a58b61ca-2318-477b-86b8-6ee907f6b06f",
    "type": 0,
    "day": "06-06-2022",
    "intervals": [
      {
        "start": "16:00",
        "end": "17:00"
      }
    ]
  }
}​
```

### Listar regras
Esse *endpoint* é responsável por listas todas as regras de atendimentos que estão cadastradas no banco de dados.
* Endpoint: `http://localhost:3333/scheduling`
* HTTP Method: GET
* HTTP Success Response Code: OK (200)
* Contract:
  * Request payload: none
* Response payload
```json
{
  "schedulings": [
    {
      "id": "49f5fa68-ff45-4ce0-9404-568a5cfbad19",
      "type": 0,
      "day": "06-06-2022",
      "intervals": [
        {
          "start": "16:00",
          "end": "17:00"
        }
      ]
    },
    {
      "id": "9f5b1349-dbb6-49a3-8cc3-d42cf6d6cea5",
      "type": 1,
      "intervals": [
        {
          "start": "16:00",
          "end": "17:00"
        }
      ]
    },
    {
      "id": "697b2c51-9af6-4ac5-8cbf-a92f898d4f99",
      "type": 2,
      "daysOnWeek": [
        1,
        2
      ],
      "intervals": [
        {
          "start": "16:00",
          "end": "17:00"
        }
      ]
    }
  ]
}​
```

### Horários disponíveis
Esse *endpoint* deverá retornar todos os hoários de atendimentos disponíveis dentro do intervalo de duas datas, baseando-se nas regras de atendimento cadastradas.
* Endpoint: `http://localhost:3333/scheduling/<start>/<end>`
* Exemplo da requisição: `http://localhost:3333/scheduling/05-06-2022/06-06-2022`
* HTTP Method: GET
* HTTP Success Response Code: OK (200)
* HTTP Error Response Code: CONFLICT (409)
* Contract:
  * Request payload: none
* Response payload
```json
[
  {
    "day": "05-06-2022",
    "intervals": [
      {
        "start": "07:00",
        "end": "08:00"
      },
      {
        "start": "08:00",
        "end": "09:00"
      }
    ]
  },
  {
    "day": "06-06-2022",
    "intervals": [
      {
        "start": "07:00",
        "end": "08:00"
      },
      {
        "start": "08:00",
        "end": "09:00"
      },
      {
        "start": "16:00",
        "end": "17:00"
      },
      {
        "start": "14:00",
        "end": "15:00"
      },
      {
        "start": "18:00",
        "end": "19:00"
      }
    ]
  }
]
```

Mesma requisição, só que contendo um intervalo maior entre as dastas, exemplo da requisição, `http://localhost:3333/scheduling/05-06-2022/10-06-2022`:
* Response payload
```json
[
  {
    "day": "05-06-2022",
    "intervals": [
      {
        "start": "07:00",
        "end": "08:00"
      },
      {
        "start": "08:00",
        "end": "09:00"
      }
    ]
  },
  {
    "day": "06-06-2022",
    "intervals": [
      {
        "start": "07:00",
        "end": "08:00"
      },
      {
        "start": "08:00",
        "end": "09:00"
      },
      {
        "start": "16:00",
        "end": "17:00"
      },
      {
        "start": "14:00",
        "end": "15:00"
      },
      {
        "start": "18:00",
        "end": "19:00"
      }
    ]
  },
  {
    "day": "07-06-2022",
    "intervals": [
      {
        "start": "07:00",
        "end": "08:00"
      },
      {
        "start": "08:00",
        "end": "09:00"
      },
      {
        "start": "14:00",
        "end": "15:00"
      },
      {
        "start": "18:00",
        "end": "19:00"
      }
    ]
  },
  {
    "day": "08-06-2022",
    "intervals": [
      {
        "start": "07:00",
        "end": "08:00"
      },
      {
        "start": "08:00",
        "end": "09:00"
      }
    ]
  },
  {
    "day": "09-06-2022",
    "intervals": [
      {
        "start": "07:00",
        "end": "08:00"
      },
      {
        "start": "08:00",
        "end": "09:00"
      }
    ]
  },
  {
    "day": "10-06-2022",
    "intervals": [
      {
        "start": "07:00",
        "end": "08:00"
      },
      {
        "start": "08:00",
        "end": "09:00"
      }
    ]
  }
]
```

## CASO QUEIRA SABER MAIS SOBRE O PROJETO

Pode entrar em contato comigo pelo seguinte email: ericdesenvolvedor7@gmail.com
