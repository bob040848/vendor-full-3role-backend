// backend/graphql/schemas/user.schema.ts
import { gql } from 'graphql-tag';

export const userTypeDefs = gql`
  enum UserRole {
    ADMIN
    VENDOR
    USER
  }

  type User {
    id: String!
    clerk_id: String!
    email: String!
    firstName: String
    lastName: String
    imageUrl: String
    role: UserRole!
    isActive: Boolean!
    created_at: DateTime!
    updated_at: DateTime!
    shop_orders: [ShopOrder!]!
    vendor_profile: Vendor
  }

  input CreateUserInput {
    clerk_id: String!
    email: String!
    firstName: String
    lastName: String
    imageUrl: String
    role: UserRole!
  }

  input UpdateUserInput {
    email: String
    firstName: String
    lastName: String
    imageUrl: String
    role: UserRole
    isActive: Boolean
  }

  extend type Query {
    me: User
    user(id: String!): User
    myShopOrders: [ShopOrder!]!
  }

  extend type Mutation {
    createShopOrder(input: CreateShopOrderInput!): ShopOrder!
    cancelShopOrder(id: String!): Boolean!
  }
`;