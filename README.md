# Progetto Node.js per Start2Impact

## Descrizione

Il progetto prevede la creazione di REST API utilizzando Node, nel caso specifico si è ipotizzato di avere un'app dove è possibile registrare utenti, postare contenuti e interagire con i post attraverso like o commenti.

Ho utilizzato Express per gestire i routing, le chiamate e ho sfruttato i middleware per controllare il contenuto delle chiamate.

In ultimo, nonostante abbia scelto MySQL come database, ho preferito l'utilizzo di un ORM come Prisma per interagire con lo stesso.

### Cosa ho usato

- Node.js
- Express
- MySQL (Prisma ORM)
- ESLint (controllo del codice)

## Configurazione

1. Clona il progetto in locale, poi crea un database su mysql o importa il file di migrazione.
2. Esegui `npm install` per installare tutte le dipendenze necessarie.
   - Se invece di importare il file di migrazione hai creato un nuovo db è necessario effettuare una migrazione con Prisma, eseguendo `npx prisma migrate dev --name init`, per i dettagli consultare [la guida](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-node-mysql)
3. Crea un file `.env` o modifica e rinomina `.env.example` inserendo la porta sulla quale vuoi avviare il server (se omessa di default è 3000)
4. Completa la stringa con l'url del database inserendo nome utente, password, host, porta e nome del db (per maggiori info sulle db string di Prisma visitare [la documentazione](https://pris.ly/d/connection-strings)).

## Come utilizzare le REST API
