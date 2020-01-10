import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
var path = require('path');

import mongoose from 'mongoose';
import { createServer } from 'http';

import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';


import schemas from './schemas';
import resolvers from './resolvers';

import userModel from './models/userModel';
import postModel from './models/postModel';
import stateModel from './models/stateModel';
import cityModel from './models/cityModel';
import propertyTypeModel from './models/propertyTypeModel';

const pubsub = require('../src/resolvers/PubSub').pubsub;
const PROPERTY_CREATED = 'PROPERTY_CREATED';

const app = express();
app.use(cors());

app.set('root-path', __dirname);
app.use(express.static(path.join(__dirname, '../')));
var upload = require('./upload')
app.use("/uploads/*", upload)

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
                    cityModel,
                    propertyTypeModel,
                },
            };
        }
    },
});



server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

mongoose.set('useCreateIndex', true);
httpServer.listen(5000, () => {
    mongoose.connect('mongodb://admin:azertysoft1@ds259348.mlab.com:59348/immo', {  useUnifiedTopology: true ,useNewUrlParser: true});

})