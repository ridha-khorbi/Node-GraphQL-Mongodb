import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';

import schemas from './schemas';
import resolvers from './resolvers';

import userModel from './models/userModel';
import postModel from './models/postModel';
import stateModel from './models/stateModel';
import cityModel from './models/cityModel';

const app = express();
app.use(cors());

const getUser = async (req) => {
    const token = req.headers['authorization'];
console.log("get user token ",req.headers)
    if (token) {
        try {
            return await jwt.verify(token, 'riddlemethis');
        } catch (e) {
            throw new AuthenticationError('Your session expired. Sign in again.');
        }
    }
};

const server = new ApolloServer({
    typeDefs: schemas,
    resolvers,
    context: async ({ req }) => {
        if (req) {
            const me = await getUser(req);

            return {
                me,
                models: {
                    userModel,
                    postModel,
                    stateModel,
                    cityModel
                },
            };
        }
    },
});

server.applyMiddleware({ app, path: '/graphql' });

mongoose.set('useCreateIndex', true);
app.listen(5000, () => {
    mongoose.connect('mongodb://admin:azertysoft1@ds259348.mlab.com:59348/immo', {  useUnifiedTopology: true ,useNewUrlParser: true});
})