import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import typeDefs from "./schema/typeDefs.js";
import resolvers from "./schema/resolvers.js";
import mongoose from "./config/connection.js";

const PORT = process.env.PORT;
const db = mongoose;
const app = express();

db.once("open", async () => {

  app.use(express.json());
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/graphql",
    // cors(),
    express.json(),
    expressMiddleware(server)
  );

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  console.log("TRYING TO TURN ON");

  console.log("open");
  app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
});

// import path from 'path';
// import express  from 'express';
// import http from 'http';
// import { ApolloServer } from '@apollo/server';
// import {  expressMiddleware } from '@apollo/server/express4';
// import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
// // import cors from 'cors';
// import typeDefs from './schema/typeDefs.js';
// import resolvers from './schema/resolvers.js';
// import mongoose from './config/connection.js';
// import authMiddleware  from './middleware/auth.js';

// const app = express();
// const httpServer = http.createServer(app);
// const PORT = process.env.PORT || 3000;

// const db = mongoose;

// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
// });

// const startApolloServer = async () => {
//    await server.start();

//     app.use(express.urlencoded({ extended: true }));
//     app.use(
//         '/graphql',
//         express.json(),
//             // re-add cors
//         expressMiddleware(server, {
//             context: authMiddleware
//         }),
//     );

//     if (process.env.NODE_ENV === 'production') {
//         app.use(express.static(path.join(__dirname, '../client/dist')));

//         app.get('*', (req,res) => {
//             res.sendFile(path.join(__dirname, '../client/dist/index.html'));
//         });
//     }

//     db.once('open', () => {
//         console.log('db open');
//         // await new Promise((resolve) => httpServer.listen({ port: 3000 }, resolve));
//         // console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
//            app.listen(PORT, () => {
//             console.log('port listening', PORT);
//             console.log(`API Server running on ${PORT}`);
//             console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
//           })
//     })
// };

// startApolloServer();
