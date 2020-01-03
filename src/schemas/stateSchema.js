import { gql } from 'apollo-server';

export default gql`
  type State {
    id: ID!
    name: String
    is_active: Boolean
    createdOn: String
  
  }


  extend type Query {
    getStateList: [State!]!
    
  }

  extend type Mutation {
    addState(name: String!): State!
  }
`;