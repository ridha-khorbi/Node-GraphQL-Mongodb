import { AuthenticationError } from 'apollo-server';

export default {
    Query: {

        getStateList: async (parent, args, { models: { stateModel }, me }, info) => {

            const states = await stateModel.find().exec();
            return states;
        },
    },
    Mutation: {
        addState: async (parent, { name }, { models: { stateModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated');
            }
            const state = await stateModel.create({ name });
            return state;
        },
    },


};