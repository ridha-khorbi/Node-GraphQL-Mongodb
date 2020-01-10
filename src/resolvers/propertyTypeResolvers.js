import { AuthenticationError } from 'apollo-server';

export default {
    Query: {

        propertyTypeList: async (parent, args, { models: { propertyTypeModel }, me }, info) => {

            const prpts = await propertyTypeModel.find().exec();
            return prpts;
        },

    },
    Mutation: {
        addPropertyType: async (parent, { title, type }, { models: { propertyTypeModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated');
            }
            const prt = await propertyTypeModel.create({ title, type });
            return prt;
        },
    },


};