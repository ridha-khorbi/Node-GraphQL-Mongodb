


import { gql } from "apollo-server-koa";

//import { gql } from "apollo-server-express";
export default gql`
  type File {
    id: ID!
    path: String!
    filename: String!
    mimetype: String!
    encoding: String!
  }
 
  extend type Mutation {
    addFile(file: Upload!): File
  }
  
`