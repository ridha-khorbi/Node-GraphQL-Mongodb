import userSchema from './userSchema';
import postSchema from './postSchema';
import stateSchema from './stateSchema';
import citySchema from './citySchema';

import propertyTypeSchema from './propertyTypeSchema';

import fileSchema from './fileSchema';
import { gql } from 'apollo-server-express';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, postSchema,stateSchema,citySchema,propertyTypeSchema,fileSchema];