/**
 * PRISMA:
 * 
 * Il client Prisma permette di operare sul Db senza scrivere query
 * Con un pattern singleton lo istanziamo una sola volta e lo esportiamo
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;