# Progetto Node.js per Start2Impact

## Descrizione

Il progetto prevede la creazione di REST API utilizzando Node, nel caso specifico si è ipotizzato di avere un'app dove è possibile registrare utenti, postare contenuti e interagire con i post attraverso like o commenti.

Ho utilizzato Express per gestire i routing, le chiamate e ho sfruttato i middleware per controllare il contenuto delle chiamate.

In ultimo, nonostante abbia scelto MySQL come database, ho preferito utilizzare un ORM come Sequelize o Prisma. Ho scelto quest'ultimo, che si è occupato di creare modelli, tipi e migrazioni per il database.

Ho eseguito degli unit test capillari facendo un mock del database, inizialmente attraverso Mocha/Chai/Sinon, preferendo poi la combinazione Jest/Supertest per via della migliore integrazione con Prisma.

### Cosa ho usato in sintesi

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/it/)
- [MySQL](https://www.mysql.com/it/)
- [Prisma](https://www.prisma.io/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Jest](https://jestjs.io/)
- [Supertest](https://www.npmjs.com/package/supertest?ref=hackernoon.com)

## Configurazione

1. Clona il progetto in locale, poi esegui `npm install` per installare tutte le dipendenze necessarie.
2. Crea un file `.env` o modifica e rinomina `.env.example` inserendo la porta sulla quale vuoi avviare il server (se omessa di default è 3000)
3. Crea un nuovo db mysql e completa la stringa precedente con l'url del database inserendo nome utente, password, host, porta e nome del db (per maggiori info sulle db string di Prisma visitare [la documentazione](https://pris.ly/d/connection-strings))
4. Esegui `npm run migrate` o, in alternativa, importa direttamente il file di migrazione che si trova in ./prisma/migrations. Per i dettagli sulle migrazioni consultare la [guida ufficiale](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-node-mysql)
5. Eseguire `npm run dev` per avviare l'ambiente di sviluppo o `npm start` per compilare il progetto e testare l'ambiente di produzione

## Script NPM

Puoi eseguire questi script con `npm run`:

- `test`: esegue gli unit test con Jest
- `build`: compila il codice da TypeScript a JavaScript
- `dev`: avvia il server di sviluppo
- `start`: compila il codice e avvia il server di produzione
- `migrate`: effettua una migrazione sul database

## Come utilizzare le REST API

Attraverso gli endpoint abbiamo la possibilità di leggere, inserire, cancellare e filtrare record come utenti, post e interazioni.

### `GET`

- `/users`: ritorna tutti gli utenti
- `/users/{userId}`: ritorna l'utente corrispondente all'id specificato
- `/posts?date={YYYY-MM-DD}`: ritorna tutti i post (se specificato, solo quelli inseriti dopo la data specificata)
- `/posts/{postId}?date={YYYY-MM-DD}&city={city}`: ritorna il post associato all'id, se specificato aggrega le interazioni filtrate per data e luogo

### `POST`

- `/users`: registra un utente
  - Body:
    ```json
    {
      "nickname": "String",
      "age": "Int",
      "city": "string"
    }
    ```
- `/posts`: permette di creare un nuovo post inserendo il titolo
  - Body:
    ```json
    {
      "title": "Titolo"
    }
    ```
- `/interactions/{postId}`: permette di inserire un'interazione specificando l'id del post e il tipo di interazione (like o commento)
  - Body:
    ```json
    {
      "type": "like",
      "userId": 1
    }
    ```

### `PUT`

- `/users/{userId}`: aggiorna le informazioni dell'utente con l'id specificato, non è necessario aggiornare tutti i parametri

  - Body:
    ```json
    {
      "nickname": "start2impact",
      "age": 25,
      "city": "Roma"
    ```

- `/posts/{postId}`: modifica il titolo del post con l'id specificato

  - Body:
    ```json
    {
      "title": "Nuovo titolo"
    }
    ```

- `/interactions/{interactionId}`: modifica il tipo dell'interazione specificata con l'id
  - Body:
    ```json
    {
      "type": "like"
    }
    ```

### `DELETE`

- `/users/{userId}`: cancella l'utente con l'id specificato
- `/posts/{postId}`: cancella il post corrispondente all'id specificato
- `/interactions/{interactionId}`: cancella l'interazione associata all'id specificato
