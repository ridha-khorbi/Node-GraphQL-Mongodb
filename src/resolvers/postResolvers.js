import { AuthenticationError } from 'apollo-server';
const pubsub = require('./PubSub').pubsub;
const PROPERTY_CREATED = 'PROPERTY_CREATED';
export default {
    Query: {
        post: async (parent, { id }, { models: { postModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated');
            }
            const post = await postModel.findById({ _id: id }).exec();
            return post;
        },
        posts: async (parent, args, { models: { postModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated');
            }
            const posts = await postModel.find({ author: me.id }).exec();
            return posts; 
        }, 
    },
    Mutation: {
        createPost: async (parent, { title, content }, { models: { postModel }, me }, info) => {
            /* if (!me) {
                throw new AuthenticationError('You are not authenticated');
            } */
            const post = await postModel.create({ title, content });
            pubsub.publish(PROPERTY_CREATED, { propertyCreated: post });
            return post;
        }, 
    },
    Post: {
        author: async ({ author }, args, { models: { userModel } }, info) => {
            const user = await userModel.findById({ _id: author }).exec();
            return user;
        },
    },
    Subscription: {
        propertyCreated: {
            subscribe: () => pubsub.asyncIterator([PROPERTY_CREATED]),
        },
    },
};