// backend/graphql/schemas/admin.schema.ts
import { gql } from 'graphql-tag';

export const adminTypeDefs = gql`
  type Shop {
    id: String!
    user_id: String!
    name: String!
    address: String!
    is_active: Boolean!
    image: String
    email: String!
    phone_number: String
    created_at: DateTime!
    updated_at: DateTime!
    products: [Product!]!
    product_deliveries: [ProductDelivery!]!
    product_delivered_history: [ProductDeliveredHistory!]!
    product_return_history: [ProductReturnHistory!]!
    shop_orders: [ShopOrder!]!
    daily_sales_reports: [DailySalesReport!]!
  }

  type DeliveryPerson {
    id: String!
    name: String!
    image: String
    phone_number: String
    created_at: DateTime!
    updated_at: DateTime!
    product_deliveries: [ProductDelivery!]!
    product_delivered_history: [ProductDeliveredHistory!]!
    product_return_history: [ProductReturnHistory!]!
  }

  type ProductDelivery {
    id: String!
    pieces: Int!
    created_at: DateTime!
    updated_at: DateTime!
    product: Product!
    product_id: String!
    delivery_person: DeliveryPerson!
    delivery_person_id: String!
    shop: Shop!
    shop_id: String!
  }

  type ProductDeliveredHistory {
    id: String!
    pieces: Int! 
    total_price: Int!
    transaction_type: TransactionType!
    paid: Boolean!
    paid_at: DateTime
    signature: String
    created_at: DateTime!
    updated_at: DateTime!
    product: Product!
    product_id: String!
    shop: Shop!
    shop_id: String!
    delivery_person: DeliveryPerson
    delivery_person_id: String!
    payment: Payment
  }

  type ProductReturnHistory {
    id: String!
    pieces: Int!
    signature: String
    created_at: DateTime!
    updated_at: DateTime!
    product: Product!
    product_id: String!
    shop: Shop!
    shop_id: String!
    delivery_person: DeliveryPerson
    delivery_person_id: String!
  }

  type ProductRemaining {
    id: String!
    pieces: Int!
    is_delivered: Boolean!
    created_at: DateTime!
    updated_at: DateTime!
    product: Product!
    product_id: String!
  }

  type ProductStock {
    id: String!
    pieces: Int!
    is_delivered: Boolean!
    created_at: DateTime!
    updated_at: DateTime!
    product: Product!
    product_id: String!
  }

  type AdminApproval {
    id: String!
    shop_order_id: String!
    admin_id: String!
    approved: Boolean!
    notes: String
    created_at: DateTime!
    shop_order: ShopOrder!
  }

  input CreateShopInput {
    user_id: String!
    name: String!
    address: String!
    email: String!
    phone_number: String
    image: String
  }

  input UpdateShopInput {
    name: String
    address: String
    email: String
    phone_number: String
    image: String
    is_active: Boolean
  }

  input CreateDeliveryPersonInput {
    name: String!
    image: String
    phone_number: String
  }

  input UpdateDeliveryPersonInput {
    name: String
    image: String
    phone_number: String
  }

  extend type Query {
    users: [User!]!
    shops: [Shop!]!
    shop(id: String!): Shop
    shopOrders(shop_id: String, vendor_id: String, status: OrderStatus): [ShopOrder!]!
    shopOrder(id: String!): ShopOrder
    deliveryPersons: [DeliveryPerson!]!
    deliveryPerson(id: String!): DeliveryPerson
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: String!, input: UpdateUserInput!): User!
    deleteUser(id: String!): Boolean!
    createVendor(input: CreateVendorInput!): Vendor!
    updateVendor(id: String!, input: UpdateVendorInput!): Vendor!
    deleteVendor(id: String!): Boolean!
    createShop(input: CreateShopInput!): Shop!
    updateShop(id: String!, input: UpdateShopInput!): Shop!
    deleteShop(id: String!): Boolean!
    createDeliveryPerson(input: CreateDeliveryPersonInput!): DeliveryPerson!
    updateDeliveryPerson(id: String!, input: UpdateDeliveryPersonInput!): DeliveryPerson!
    deleteDeliveryPerson(id: String!): Boolean!
  }
`;