import { gql } from 'apollo-server';

export default gql`
  type City {
    id: ID!
    name: String
    state_id: State!
    is_active: Boolean
    createdOn: String
  
  }


  extend type Query {
    getAllCities: [City!]!
    getCityList(id:ID!):[City!]!
    
  }

  extend type Mutation {
    addCity(name: String!): City!
  }
`;