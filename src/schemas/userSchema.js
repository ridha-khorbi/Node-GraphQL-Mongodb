import { gql } from 'apollo-server';

export default gql`
  type User {
    id: ID!
    fname: String
    lname: String
    email: String!
    phoneNo: String
    state: State!
    city: City!
    pincode: String
    userType: String
    isAdmin: Boolean
    updatedOn: String
    createdOn: String
    posts: [Post!]!
  }

  type Token {
    token: String!
    user: User!
  }

  extend type Query {
    user(id: ID!): User!
    login(email: String!, password: String!): Token!
    checkEmailAvailability(email: String!): User
  }

  extend type Mutation {
    createUser(fname: String!, lname: String!,email: String!, password: String!,phoneNo: String!,state: ID!,city: ID!, pincode: String!): User!
  }
`;