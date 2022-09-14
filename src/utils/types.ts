/**
 * TYPES:
 * 
 * In questo file è possibile creare ed esportare i tipi custom da utilizzare nell'app
 * Non è necessario creare tipi per i modelli del Db, Prisma se ne occupa in automatico
 */

export type DbError = {
    code: string,
    message: string,
}