import { gql } from 'apollo-server';

export default gql`
enum Type{
    residential
    commercial
    agricultural
   
}

  type PropertyType {
    id: ID!
    title: String
    type: Type
    is_active: Boolean
    createdOn: String
    updatedOn: String
  
  }


  extend type Query {
    propertyTypeList: [PropertyType!]!
    
  }

  extend type Mutation {
    addPropertyType(title: String!,type: Type!): PropertyType!
  }
`;