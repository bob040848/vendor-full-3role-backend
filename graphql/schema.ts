// backend/graphql/schema.ts - Enhanced with missing features
import { gql } from 'graphql-tag';

export const typeDefs = gql`
  scalar DateTime

  enum TransactionType {
    CASH
    TRANSFER
    NEXTPAYMENT
  }

  enum OrderStatus {
    PENDING
    CONFIRMED
    DELIVERED
    CANCELLED
    RETURNED
  }

  enum RequestStatus {
    PENDING
    APPROVED
    REJECTED
  }

  enum UserRole {
    ADMIN
    VENDOR
    USER
  }

  type User {
    id: String!
    email: String!
    firstName: String
    lastName: String
    imageUrl: String
    role: UserRole!
    isActive: Boolean!
    created_at: DateTime!
    updated_at: DateTime!
    vendor_requests: [VendorRequest!]!
    shop_orders: [ShopOrder!]!
  }

  type VendorRequest {
    id: String!
    user_id: String!
    name: String!
    email: String!
    phone: String
    address: String
    description: String
    status: RequestStatus!
    reviewed_at: DateTime
    created_at: DateTime!
    updated_at: DateTime!
    user: User!
    admin_approvals: [AdminApproval!]!
  }

  type AdminApproval {
    id: String!
    vendor_request_id: String!
    admin_id: String!
    approved: Boolean!
    notes: String
    created_at: DateTime!
    vendor_request: VendorRequest!
  }

  type ShopOrder {
    id: String!
    shop_id: String!
    vendor_id: String!
    user_id: String!
    order_number: String!
    status: OrderStatus!
    total_amount: Int!
    notes: String
    ordered_at: DateTime!
    delivered_at: DateTime
    created_at: DateTime!
    updated_at: DateTime!
    shop: Shop!
    vendor: Vendor!
    user: User!
    order_items: [ShopOrderItem!]!
  }

  type ShopOrderItem {
    id: String!
    shop_order_id: String!
    product_id: String!
    quantity: Int!
    unit_price: Int!
    total_price: Int!
    created_at: DateTime!
    shop_order: ShopOrder!
    product: Product!
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

  type Vendor {
    id: String!
    name: String!
    email: String!
    phone_number: String
    address: String
    is_active: Boolean!
    image: String
    created_at: DateTime!
    updated_at: DateTime!
    products: [Product!]!
    shop_orders: [ShopOrder!]!
    daily_sales_reports: [DailySalesReport!]!
  }

  type Shop {
    id: String!
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

  type Product {
    id: String!
    title: String!
    description: String
    stock: Int!
    ingredient: String
    barcode: Int
    price: Int!
    expired_at: Int
    image: String
    created_at: DateTime!
    updated_at: DateTime!
    vendor: Vendor!
    vendor_id: String!
    shop: Shop
    shop_id: String
    product_deliveries: [ProductDelivery!]!
    product_delivered_history: [ProductDeliveredHistory!]!
    product_return_history: [ProductReturnHistory!]!
    product_remaining: [ProductRemaining!]!
    product_stock: [ProductStock!]!
    shop_order_items: [ShopOrderItem!]!
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
    delivery_person: DeliveryPerson!
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
    delivery_person: DeliveryPerson!
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

  input CreateUserInput {
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

  input CreateVendorRequestInput {
    name: String!
    email: String!
    phone: String
    address: String
    description: String
  }

  input CreateShopOrderInput {
    vendor_id: String!
    shop_id: String!
    notes: String
    order_items: [ShopOrderItemInput!]!
  }

  input ShopOrderItemInput {
    product_id: String!
    quantity: Int!
    unit_price: Int!
  }

  input UpdateShopOrderInput {
    status: OrderStatus
    notes: String
    delivered_at: DateTime
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

  input CreateShopInput {
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

  input CreateProductInput {
    title: String!
    description: String
    stock: Int!
    ingredient: String
    barcode: Int
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
    barcode: Int
    price: Int
    expired_at: Int
    image: String
    vendor_id: String
    shop_id: String
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
  
  input CreateVendorInput {
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

  type Query {
    users: [User!]!
    user(id: String!): User
    me: User

    vendorRequests(status: RequestStatus): [VendorRequest!]!
    vendorRequest(id: String!): VendorRequest

    shopOrders(shop_id: String, vendor_id: String, status: OrderStatus): [ShopOrder!]!
    shopOrder(id: String!): ShopOrder
    myShopOrders: [ShopOrder!]!

    dailySalesReports(filter: SalesReportFilter): [DailySalesReport!]!
    salesSummary(shop_id: String, vendor_id: String, start_date: DateTime, end_date: DateTime): DailySalesReport

    payments(shop_id: String, vendor_id: String): [Payment!]!
    payment(id: String!): Payment

    vendors: [Vendor!]!
    vendor(id: String!): Vendor
    shops: [Shop!]!
    shop(id: String!): Shop
    products: [Product!]!
    product(id: String!): Product
    productsByShop(shop_id: String!): [Product!]!
    deliveryPersons: [DeliveryPerson!]!
    deliveryPerson(id: String!): DeliveryPerson
    productDeliveredHistory(shop_id: String): [ProductDeliveredHistory!]!
    productReturnHistory(shop_id: String): [ProductReturnHistory!]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: String!, input: UpdateUserInput!): User!
    deleteUser(id: String!): Boolean!

    createVendorRequest(input: CreateVendorRequestInput!): VendorRequest!
    approveVendorRequest(id: String!, approved: Boolean!, notes: String): VendorRequest!

    createShopOrder(input: CreateShopOrderInput!): ShopOrder!
    updateShopOrder(id: String!, input: UpdateShopOrderInput!): ShopOrder!
    cancelShopOrder(id: String!): Boolean!

    createPayment(input: CreatePaymentInput!): Payment!

    generateDailySalesReport(shop_id: String!, vendor_id: String!, date: DateTime!): DailySalesReport!

    createShop(input: CreateShopInput!): Shop!
    updateShop(id: String!, input: UpdateShopInput!): Shop!
    deleteShop(id: String!): Boolean!
    createProduct(input: CreateProductInput!): Product!
    updateProduct(id: String!, input: UpdateProductInput!): Product!
    deleteProduct(id: String!): Boolean!
    createDeliveryPerson(input: CreateDeliveryPersonInput!): DeliveryPerson!
    updateDeliveryPerson(id: String!, input: UpdateDeliveryPersonInput!): DeliveryPerson!
    deleteDeliveryPerson(id: String!): Boolean!
    deliverProduct(product_id: String!, shop_id: String!, delivery_person_id: String!, pieces: Int!): ProductDelivery!
    confirmDelivery(product_id: String!, shop_id: String!, delivery_person_id: String!, total_price: Int!, transaction_type: TransactionType!, signature: String): ProductDeliveredHistory!
    returnProduct(product_id: String!, shop_id: String!, delivery_person_id: String!, pieces: Int!, signature: String): ProductReturnHistory!
    createVendor(input: CreateVendorInput!): Vendor!
    updateVendor(id: String!, input: UpdateVendorInput!): Vendor!
    deleteVendor(id: String!): Boolean!
  }
`;