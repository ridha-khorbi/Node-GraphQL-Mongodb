import { AuthenticationError } from 'apollo-server';

export default {
    Query: {

        getAllCities: async (parent, args, { models: { cityModel }, me }, info) => {

            const cities = await cityModel.find().exec();
            return cities;
        },
        getCityList: async (parent, { id }, { models: { cityModel }, me }, info) => {
           /* if (!me) {
                throw new AuthenticationError('You are not authenticated');
            }*/
            const cities = await cityModel.find({ state_id: id }).exec();
            return cities;
        },
    },
    Mutation: {
        addCity: async (parent, { name }, { models: { cityModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated');
            }
            const city = await cityModel.create({ name });
            return city;
        },
    },
    City: {

        state_id: async ({ state_id }, args, { models: { stateModel } }, info) => {
            const state = await stateModel.findById({ _id: state_id }).exec();
            return state;
        },
    },

};