// backend/graphql/context.ts
import { PrismaClient } from '@prisma/client';

export type User ={
  id: string;
  email?: string;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string;
  role?: 'ADMIN' | 'VENDOR' | 'USER'; 
}

export type GraphQLContext ={
  prisma: PrismaClient;
  user?: User;
}
