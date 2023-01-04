import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import { json } from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv-safe';
import schema from '@src/graphql/schema/schema';
import performAstCodegen from '@src/codegen';
import prisma from '@src/prisma/client';
import { IPrismaContext } from '@src/interface/IPrismaContext';

dotenv.config();

const startServer = async () => {
  performAstCodegen();

  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer<IPrismaContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    // playground: process.env.NODE_ENV !== 'production',
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: ['https://www.your-app.example', 'https://studio.apollographql.com'],
    }),
    json(),
    expressMiddleware(server, {
      context: async () => ({ prisma }),
    })
  );

  await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
};

startServer();
