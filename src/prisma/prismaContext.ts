import { IPrismaContext } from '@src/interface/IPrismaContext';
import prisma from '@src/prisma/client';

const prismaContext: IPrismaContext = {
  prisma,
};

export default prismaContext;
