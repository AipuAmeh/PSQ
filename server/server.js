import express  from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
// import  {typeDefs, resolvers}  from './schema/index.js';
import typeDefs from './schema/typeDefs.js';
import resolvers from './schema/resolvers.js';
import path from 'path';
import mongoose from './config/connection.js';

const app = express();
const PORT = 3001;
const db = mongoose;

// const server = new ApolloServer({
//     typeDefs,
//     resolvers
// });

const startApolloServer = async () => {
    // await server.start();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use('/graphql', 
    cors(), )
    // add auth middleware once created
    // expressMiddleware(server));
    
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


