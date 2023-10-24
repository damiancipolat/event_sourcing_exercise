<img src="https://github.com/damiancipolat/node-bff/blob/master/doc/node.png?raw=true" width="150px" align="right" />

# Xepeling challenge

En este repositorio presento la solucióm al challenge de xepelin de backend.

**Readme sections**

- [Stack](#stack)
- [Configuration](#configuration)
- [Commands](#commands)
- [Architecture](#architecture)
- [Endpoints](#endpoints)

## **Stack**:

- **Node.js v18**
- Docker/docker-compose
- Test: jest
- config: dotenv
- express.js
- pino: For logging.

## **Configuration**:

En este proyecto se usa el formato .env para la configuracion.

```console
PORT=8000
DB_HOST= 127.0.0.1
DB_PORT= 3306
DB_USER= xepelin
DB_PWD= 1234
DB_NAME= xepelin
```

## **Commands**:

These are several useful commands to run the project.

- Run unit test:

```console
damian@challenge:~$ npm test
```

- Run coverage report.

```console
damian@challenge:~$ npm run coverage
```

- Run app in development mode:

```console
damian@challenge:~$ npm run dev
```

- Run app:

```console
damian@challenge:~$ npm start
```

- Create and run docker container:

```console
damian@challenge:~$ docker compose up
```

## **Architecture**:

The project is divided into several layers, each with different responsibilities. Three stand out **consumer** / **memory** / **api server**.

- **Comsumer**: Get data from the socket and keep the book updated in memory, separated by buy and sell.
- **Api**: HTTP interface to obtain the different features proposed.
- **Memory (Store)**: In this layer we store the data obtained from the bitfinex provider through the websocket.
- **Configuration**: Here I centralize the configuration from which the api or the consumer obtained information
- **Utilis:** Cross functionality, only the logger is found.

#### **Layer diagrams**:

Here we see the main layers of the project.

<img src="https://github.com/damiancipolat/RatherLabsChallege/blob/main/doc/layers.png?raw=true" width="250px" />

#### **Component diagrams**:

Here we see the component of every layers of the project.

<img src="https://github.com/damiancipolat/RatherLabsChallege/blob/main/doc/complete.png?raw=true" width="550px" />

## **Endpoints**:

Esta es la documentación de la API que te permitirá interactuar con el sistema de cuentas y transacciones.

##### Obtener el saldo de una cuenta

Descripción:
Este endpoint te permite obtener el saldo de una cuenta específica utilizando su identificador único.

CURL

```console
curl --location 'http://127.0.0.1:8000/accounts/52fd94e9-baca-46d7-a83a-5698ab84434b/balance'
```

##### Crear una nueva cuenta

Descripción:
Crea una nueva cuenta proporcionando los datos necesarios, como nombre, apellido, correo electrónico y número de cuenta.

CURL

```console
curl --location 'http://127.0.0.1:8000/accounts' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"damian",
    "surname":"Cipolat",
    "email":"test@gmail.com",
    "accountNumber":"100011"
}'
```

##### Realizar una retirada (withdraw)

Descripción:
Esta solicitud permite realizar una retirada de fondos de una cuenta específica.

CURL

```console
curl --location 'http://127.0.0.1:8000/transactions' \
--header 'Content-Type: application/json' \
--data '{
    "type":"withdraw",
    "ammount":10,
    "accountId":"52fd94e9-baca-46d7-a83a-5698ab84434b"
}'
```

##### Realizar un depósito (deposit)

Descripción
Esta solicitud permite realizar un depósito de fondos en una cuenta específica.

CURL

```console
curl --location 'http://127.0.0.1:8000/transactions' \
--header 'Content-Type: application/json' \
--data '{
    "type":"deposit",
    "ammount":10,
    "accountId":"52fd94e9-baca-46d7-a83a-5698ab84434b"
}'
```
