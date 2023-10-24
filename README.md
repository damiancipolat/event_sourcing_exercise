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

Estos son algunos comandos utiles:

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

El proyecto consiste en un servicio que utiliza una BD MYSQL y expone
una interfaz rest usando NODEJS.

A nivel diseño se opto por un modelo modular en donde las caracteristicas
principales del funcionamiento se encuentran dentro de modulos. Tambien
se opto por usar como practica tomar elementos de DD para elaborar un dominio
con objetos y eventos.

A nivel arquitectura, usamos el patron arquitectonico 'Event sourcing',
en el cual todas las operaciones del sistema son consideradas como una secuencia de eventos. A nivel persistencia estos eventos son guardados en una bd sql, aqui es donde la consideramos nuestro event store, que sera importante
para mantener toda el trackeo de los cambios de estado en cada evento.

En este patron a diferencia de otros no hay tablas con entidades,
sino una unica tabla de eventos y de ahi se puede reconstruir el estado
de la aplicacion con la secuencia de eventos de cada objeto.

**Decisiones:**
BD: usamos una bd sql debido a la practicidad en implementacion, en otros contextos una bs nosql tambien hubiera sido candidata.

Monolitico: decidi hacer un unico servicio ya que al ser un challenge
no tenia relevancia implementar colas de entos para comunicacion asincronica,
sino implementar el event sourcing.

Patrones de diseño:
Strategy: podemos observar un patron strategy en la clase,
src/modules/balances/balance.service.ts y el modulo
src/modules/balances/calcBalance.ts, ICalcBalance.ts
el strategy esta en implementar el algoritmo implementando una interfaz de ts
para que pueda ser intercambiable de ser necesario.

Polimorfismo:
Aplicamos polimorfismo en
src/modules/eventStore/event.repository.ts y IEvenRepository.ts
aqui es para encapsular la capa de manejo de los eventos y en el caso
de cambiar la implementacion de la bd mantener la interface.

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
