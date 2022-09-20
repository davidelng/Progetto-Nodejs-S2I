# Progetto Node.js per Start2Impact

## Descrizione

Il progetto prevede la creazione di REST API utilizzando Node, nel caso specifico si è ipotizzato di avere un'app dove è possibile registrare utenti, postare contenuti e interagire con i post attraverso like o commenti.

Ho utilizzato Express per gestire i routing, le chiamate e ho sfruttato i middleware per controllare il contenuto delle chiamate.

In ultimo, nonostante abbia scelto MySQL come database, ho preferito l'utilizzo di un ORM come Prisma per interagire con lo stesso.

### Cosa ho usato

- Node.js
- Express
- MySQL (Prisma ORM)
- TypeScript
- ESLint (controllo del codice)
- Mocha, Supertest, Sinon (testing)

## Configurazione

1. Clona il progetto in locale, poi esegui `npm install` per installare tutte le dipendenze necessarie.
2. Crea un database su mysql o importa il file di migrazione.
   - Se invece di importare il file di migrazione hai creato un nuovo db è necessario effettuare una migrazione con Prisma, eseguendo `npx prisma migrate dev --name init`, per i dettagli consultare la[guida ufficiale](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-node-mysql)
3. Crea un file `.env` o modifica e rinomina `.env.example` inserendo la porta sulla quale vuoi avviare il server (se omessa di default è 3000)
4. Completa la stringa con l'url del database inserendo nome utente, password, host, porta e nome del db (per maggiori info sulle db string di Prisma visitare [la documentazione](https://pris.ly/d/connection-strings)).
5. Eseguire `npm run dev` per avviare l'ambiente di sviluppo o `npm start` per compilare il progetto e testare l'ambiente di produzione

## Script NPM

Puoi eseguire questi script con `npm run`:

- `test` = esegue i test con mocha,
- `build` = compila il codice da typescript a javascript,
- `dev` = avvia il server di sviluppo,
- `start` = compila il codice e avvia il server di produzione,
- `migrate` = effettua una migrazione sul database

## Come utilizzare le REST API

Attraverso gli endpoint abbiamo la possibilità di leggere, inserire, cancellare e filtrare record come utenti, post e interazioni.

### Utenti = `/users`

- `GET /` = ritorna tutti gli utenti
- `GET /{id}` = ritorna l'utente corrispondente all'id specificato
- `POST /` = registra un utente inserendo nel body

```json
{
  "nickname": "start2impact",
  "age": 25,
  "city": "Roma"
}
```

- `PUT /{id}` = aggiorna le informazioni dell'utente con l'id specificato, non è necessario specificare tutti i parametri

```json
{
  "nickname": "start2impact", // non obbligatorio
  "age": 25, // non obbligatorio
  "city": "Roma" // non obbligatorio
}
```

- `DELETE /{id}` = cancella l'utente con l'id specificato

### Post e filtri = `/posts`

- `GET /?date=YYYY-MM-DD` = ritorna tutti i post (se specificato, solo quelli inseriti prima della data specificata)
- `GET /{id}?date=YYYY-MM-DD&city=Roma` = ritorna il post associato all'id, se specificato aggrega le interazioni filtrate per data e luogo
- `POST /` = permette di creare un nuovo post, specificando nel body

```json
{
  "title": "Titolo"
}
```

- `PUT /{id}` = modifica il post con l'id specificato, inserendo nel body

```json
{
  "title": "Nuovo titolo"
}
```

- `DELETE /{id}` = cancella il post corrispondente all'id specificato

### Interazioni = `/interactions`

- `GET /` = disabilitata, ritorna tutte le interazioni
- `POST /{postId}` = permette di inserire un'interazione sul post associato all'id inserito nei parametri, nel body va inserito

```json
{
  "type": "like", // o "commento"
  "userId": 1
}
```

- `PUT /{interactionId}` = modifica il tipo dell'interazione specificata con l'id, inserendo nel body

```json
{
  "type": "like" // o "commento"
}
```

- `DELETE /{interactionId}` = cancella l'interazione associata all'id specificato
