// backend/graphql/schemas/vendor.schema.ts
import { gql } from 'graphql-tag';

export const vendorTypeDefs = gql`
  type Vendor {
    id: String!
    user_id: String!
    name: String!
    email: String!
    phone_number: String
    address: String
    is_active: Boolean!
    image: String
    created_at: DateTime!
    updated_at: DateTime!
    user: User!
    products: [Product!]!
    shop_orders: [ShopOrder!]!
    daily_sales_reports: [DailySalesReport!]!
  }

  type Product {
    id: String!
    title: String!
    description: String
    stock: Int!
    ingredient: String
    barcode: String
    price: Int!
    expired_at: Int
    image: String
    created_at: DateTime!
    updated_at: DateTime!
    vendor: Vendor
    vendor_id: String
    shop: Shop
    shop_id: String
    product_deliveries: [ProductDelivery!]!
    product_delivered_history: [ProductDeliveredHistory!]!
    product_return_history: [ProductReturnHistory!]!
    product_remaining: [ProductRemaining!]!
    product_stock: [ProductStock!]!
    shop_order_items: [ShopOrderItem!]!
  }

  type DailySalesReport {
    id: String!
    shop_id: String!
    vendor_id: String!
    date: DateTime!
    total_sales: Int!
    total_orders: Int!
    cash_sales: Int!
    transfer_sales: Int!
    pending_payments: Int!
    created_at: DateTime!
    updated_at: DateTime!
    shop: Shop!
    vendor: Vendor!
  }

  type Payment {
    id: String!
    product_delivered_history_id: String!
    amount: Int!
    transaction_type: TransactionType!
    payment_reference: String
    paid_at: DateTime!
    created_at: DateTime!
    product_delivered_history: ProductDeliveredHistory!
  }

  input CreateVendorInput {
    user_id: String!
    name: String!
    email: String!
    phone_number: String
    address: String
    image: String
  }

  input UpdateVendorInput {
    name: String
    email: String
    phone_number: String
    address: String
    image: String
    is_active: Boolean
  }

  input CreateProductInput {
    title: String!
    description: String
    stock: Int!
    ingredient: String
    barcode: String
    price: Int!
    expired_at: Int
    image: String
    vendor_id: String!
    shop_id: String
  }

  input UpdateProductInput {
    title: String
    description: String
    stock: Int
    ingredient: String
    barcode: String
    price: Int
    expired_at: Int
    image: String
    vendor_id: String
    shop_id: String
  }

  input CreatePaymentInput {
    product_delivered_history_id: String!
    amount: Int!
    transaction_type: TransactionType!
    payment_reference: String
  }

  input SalesReportFilter {
    shop_id: String
    vendor_id: String
    start_date: DateTime
    end_date: DateTime
  }

  extend type Query {
    vendors: [Vendor!]!
    vendor(id: String!): Vendor
    products: [Product!]!
    product(id: String!): Product
    productsByShop(shop_id: String!): [Product!]!
    dailySalesReports(filter: SalesReportFilter): [DailySalesReport!]!
    salesSummary(shop_id: String, vendor_id: String, start_date: DateTime, end_date: DateTime): DailySalesReport
    payments(shop_id: String, vendor_id: String): [Payment!]!
    payment(id: String!): Payment
    productDeliveredHistory(shop_id: String): [ProductDeliveredHistory!]!
    productReturnHistory(shop_id: String): [ProductReturnHistory!]!
  }

  extend type Mutation {
    createProduct(input: CreateProductInput!): Product!
    updateProduct(id: String!, input: UpdateProductInput!): Product!
    deleteProduct(id: String!): Boolean!
    updateShopOrder(id: String!, input: UpdateShopOrderInput!): ShopOrder!
    createPayment(input: CreatePaymentInput!): Payment!
    generateDailySalesReport(shop_id: String!, vendor_id: String!, date: DateTime!): DailySalesReport!
    deliverProduct(product_id: String!, shop_id: String!, delivery_person_id: String!, pieces: Int!): ProductDelivery!
    confirmDelivery(product_id: String!, shop_id: String!, delivery_person_id: String!, pieces: Int!, total_price: Int!, transaction_type: TransactionType!, signature: String): ProductDeliveredHistory!
    returnProduct(product_id: String!, shop_id: String!, delivery_person_id: String!, pieces: Int!, signature: String): ProductReturnHistory!
  }
`;