import { IPrismaContext } from '@src/interface/IPrismaContext.ts';

export interface IApolloServerContext {
  prismaContext: IPrismaContext;
}
