import express  from 'express';
import { ApolloServer } from '@apollo/server';
import {  expressMiddleware } from '@apollo/server/express4';
// import cors from 'cors';
import typeDefs from './schema/typeDefs.js';
import resolvers from './schema/resolvers.js';
import path from 'path';
import mongoose from './config/connection.js';
import authMiddleware  from './middleware/auth.js';

const app = express();
const PORT = 3000;
const db = mongoose;

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const startApolloServer = async () => {
    await server.start();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // re-add cors
    app.use('/graphql', expressMiddleware(server, {
        context: authMiddleware
    }));


    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));
    
        app.get('*', (req,res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
    }
    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API Server running on ${PORT}`);
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
          })
    })
};

startApolloServer();


