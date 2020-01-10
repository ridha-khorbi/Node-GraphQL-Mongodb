import { AuthenticationError } from 'apollo-server';
import mongodb from "mongodb";
import {processUpload} from "../../storage/storageFile";


const mongoose = require('mongoose');


const pubsub = require('./PubSub').pubsub;
const PROPERTY_CREATED = 'PROPERTY_CREATED';


export default {
    Query: {

        getStateList: async (parent, args, { models: { stateModel }, me }, info) => {

            const states = await stateModel.find().exec();
            return states;
        },
    },
    Mutation: {
        addFile: async (_parent, {file},{ models: { fileModel }, me }, info)  => {

            console.log("file",file)
            const f = await processUpload(file);
            console.log("ggggggg",f)
            pubsub.publish(PROPERTY_CREATED, { propertyCreated: f });
            return f;
        },
    },
    

};