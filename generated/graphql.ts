import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { User, Vendor, Shop, Product, ProductDelivery, ProductDeliveredHistory, ProductReturnHistory, ProductRemaining, ProductStock, DeliveryPerson, ShopOrder, DailySalesReport, AdminApproval, Payment, ShopOrderItem } from '@prisma/client';
import { GraphQLContext } from '../graphql/context';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
};

export type GQL_AdminApproval = {
  __typename?: 'AdminApproval';
  admin_id: Scalars['String']['output'];
  approved: Scalars['Boolean']['output'];
  created_at: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  shop_order: GQL_ShopOrder;
  shop_order_id: Scalars['String']['output'];
};

export type GQL_CreateDeliveryPersonInput = {
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phone_number?: InputMaybe<Scalars['String']['input']>;
};

export type GQL_CreatePaymentInput = {
  amount: Scalars['Int']['input'];
  payment_reference?: InputMaybe<Scalars['String']['input']>;
  product_delivered_history_id: Scalars['String']['input'];
  transaction_type: GQL_TransactionType;
};

export type GQL_CreateProductInput = {
  barcode?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  expired_at?: InputMaybe<Scalars['Int']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  ingredient?: InputMaybe<Scalars['String']['input']>;
  price: Scalars['Int']['input'];
  shop_id?: InputMaybe<Scalars['String']['input']>;
  stock: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  vendor_id: Scalars['String']['input'];
};

export type GQL_CreateShopInput = {
  address: Scalars['String']['input'];
  email: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phone_number?: InputMaybe<Scalars['String']['input']>;
  user_id: Scalars['String']['input'];
};

export type GQL_CreateShopOrderInput = {
  delivered_at?: InputMaybe<Scalars['DateTime']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  order_items: Array<GQL_ShopOrderItemInput>;
  shop_id: Scalars['String']['input'];
  vendor_id: Scalars['String']['input'];
};

export type GQL_CreateUserInput = {
  clerk_id: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  role: GQL_UserRole;
};

export type GQL_CreateVendorInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phone_number?: InputMaybe<Scalars['String']['input']>;
  user_id: Scalars['String']['input'];
};

export type GQL_DailySalesReport = {
  __typename?: 'DailySalesReport';
  cash_sales: Scalars['Int']['output'];
  created_at: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  pending_payments: Scalars['Int']['output'];
  shop: GQL_Shop;
  shop_id: Scalars['String']['output'];
  total_orders: Scalars['Int']['output'];
  total_sales: Scalars['Int']['output'];
  transfer_sales: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  vendor: GQL_Vendor;
  vendor_id: Scalars['String']['output'];
};

export type GQL_DeliveryPerson = {
  __typename?: 'DeliveryPerson';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  phone_number?: Maybe<Scalars['String']['output']>;
  product_delivered_history: Array<GQL_ProductDeliveredHistory>;
  product_deliveries: Array<GQL_ProductDelivery>;
  product_return_history: Array<GQL_ProductReturnHistory>;
  updated_at: Scalars['DateTime']['output'];
};

export type GQL_Mutation = {
  __typename?: 'Mutation';
  cancelShopOrder: Scalars['Boolean']['output'];
  confirmDelivery: GQL_ProductDeliveredHistory;
  createDeliveryPerson: GQL_DeliveryPerson;
  createPayment: GQL_Payment;
  createProduct: GQL_Product;
  createShop: GQL_Shop;
  createShopOrder: GQL_ShopOrder;
  createUser: GQL_User;
  createVendor: GQL_Vendor;
  deleteDeliveryPerson: Scalars['Boolean']['output'];
  deleteProduct: Scalars['Boolean']['output'];
  deleteShop: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  deleteVendor: Scalars['Boolean']['output'];
  deliverProduct: GQL_ProductDelivery;
  generateDailySalesReport: GQL_DailySalesReport;
  returnProduct: GQL_ProductReturnHistory;
  updateDeliveryPerson: GQL_DeliveryPerson;
  updateProduct: GQL_Product;
  updateShop: GQL_Shop;
  updateShopOrder: GQL_ShopOrder;
  updateUser: GQL_User;
  updateVendor: GQL_Vendor;
};


export type GQL_MutationCancelShopOrderArgs = {
  id: Scalars['String']['input'];
};


export type GQL_MutationConfirmDeliveryArgs = {
  delivery_person_id: Scalars['String']['input'];
  pieces: Scalars['Int']['input'];
  product_id: Scalars['String']['input'];
  shop_id: Scalars['String']['input'];
  signature?: InputMaybe<Scalars['String']['input']>;
  total_price: Scalars['Int']['input'];
  transaction_type: GQL_TransactionType;
};


export type GQL_MutationCreateDeliveryPersonArgs = {
  input: GQL_CreateDeliveryPersonInput;
};


export type GQL_MutationCreatePaymentArgs = {
  input: GQL_CreatePaymentInput;
};


export type GQL_MutationCreateProductArgs = {
  input: GQL_CreateProductInput;
};


export type GQL_MutationCreateShopArgs = {
  input: GQL_CreateShopInput;
};


export type GQL_MutationCreateShopOrderArgs = {
  input: GQL_CreateShopOrderInput;
};


export type GQL_MutationCreateUserArgs = {
  input: GQL_CreateUserInput;
};


export type GQL_MutationCreateVendorArgs = {
  input: GQL_CreateVendorInput;
};


export type GQL_MutationDeleteDeliveryPersonArgs = {
  id: Scalars['String']['input'];
};


export type GQL_MutationDeleteProductArgs = {
  id: Scalars['String']['input'];
};


export type GQL_MutationDeleteShopArgs = {
  id: Scalars['String']['input'];
};


export type GQL_MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type GQL_MutationDeleteVendorArgs = {
  id: Scalars['String']['input'];
};


export type GQL_MutationDeliverProductArgs = {
  delivery_person_id: Scalars['String']['input'];
  pieces: Scalars['Int']['input'];
  product_id: Scalars['String']['input'];
  shop_id: Scalars['String']['input'];
};


export type GQL_MutationGenerateDailySalesReportArgs = {
  date: Scalars['DateTime']['input'];
  shop_id: Scalars['String']['input'];
  vendor_id: Scalars['String']['input'];
};


export type GQL_MutationReturnProductArgs = {
  delivery_person_id: Scalars['String']['input'];
  pieces: Scalars['Int']['input'];
  product_id: Scalars['String']['input'];
  shop_id: Scalars['String']['input'];
  signature?: InputMaybe<Scalars['String']['input']>;
};


export type GQL_MutationUpdateDeliveryPersonArgs = {
  id: Scalars['String']['input'];
  input: GQL_UpdateDeliveryPersonInput;
};


export type GQL_MutationUpdateProductArgs = {
  id: Scalars['String']['input'];
  input: GQL_UpdateProductInput;
};


export type GQL_MutationUpdateShopArgs = {
  id: Scalars['String']['input'];
  input: GQL_UpdateShopInput;
};


export type GQL_MutationUpdateShopOrderArgs = {
  id: Scalars['String']['input'];
  input: GQL_UpdateShopOrderInput;
};


export type GQL_MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  input: GQL_UpdateUserInput;
};


export type GQL_MutationUpdateVendorArgs = {
  id: Scalars['String']['input'];
  input: GQL_UpdateVendorInput;
};

export enum GQL_OrderStatus {
  Approved = 'APPROVED',
  Cancelled = 'CANCELLED',
  Confirmed = 'CONFIRMED',
  Delivered = 'DELIVERED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  Returned = 'RETURNED'
}

export type GQL_Payment = {
  __typename?: 'Payment';
  amount: Scalars['Int']['output'];
  created_at: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  paid_at: Scalars['DateTime']['output'];
  payment_reference?: Maybe<Scalars['String']['output']>;
  product_delivered_history: GQL_ProductDeliveredHistory;
  product_delivered_history_id: Scalars['String']['output'];
  transaction_type: GQL_TransactionType;
};

export type GQL_Product = {
  __typename?: 'Product';
  barcode?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  expired_at?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  ingredient?: Maybe<Scalars['String']['output']>;
  price: Scalars['Int']['output'];
  product_delivered_history: Array<GQL_ProductDeliveredHistory>;
  product_deliveries: Array<GQL_ProductDelivery>;
  product_remaining: Array<GQL_ProductRemaining>;
  product_return_history: Array<GQL_ProductReturnHistory>;
  product_stock: Array<GQL_ProductStock>;
  shop?: Maybe<GQL_Shop>;
  shop_id?: Maybe<Scalars['String']['output']>;
  shop_order_items: Array<GQL_ShopOrderItem>;
  stock: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
  vendor?: Maybe<GQL_Vendor>;
  vendor_id?: Maybe<Scalars['String']['output']>;
};

export type GQL_ProductDeliveredHistory = {
  __typename?: 'ProductDeliveredHistory';
  created_at: Scalars['DateTime']['output'];
  delivery_person?: Maybe<GQL_DeliveryPerson>;
  delivery_person_id: Scalars['String']['output'];
  id: Scalars['String']['output'];
  paid: Scalars['Boolean']['output'];
  paid_at?: Maybe<Scalars['DateTime']['output']>;
  payment?: Maybe<GQL_Payment>;
  pieces: Scalars['Int']['output'];
  product: GQL_Product;
  product_id: Scalars['String']['output'];
  shop: GQL_Shop;
  shop_id: Scalars['String']['output'];
  signature?: Maybe<Scalars['String']['output']>;
  total_price: Scalars['Int']['output'];
  transaction_type: GQL_TransactionType;
  updated_at: Scalars['DateTime']['output'];
};

export type GQL_ProductDelivery = {
  __typename?: 'ProductDelivery';
  created_at: Scalars['DateTime']['output'];
  delivery_person: GQL_DeliveryPerson;
  delivery_person_id: Scalars['String']['output'];
  id: Scalars['String']['output'];
  pieces: Scalars['Int']['output'];
  product: GQL_Product;
  product_id: Scalars['String']['output'];
  shop: GQL_Shop;
  shop_id: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type GQL_ProductRemaining = {
  __typename?: 'ProductRemaining';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  is_delivered: Scalars['Boolean']['output'];
  pieces: Scalars['Int']['output'];
  product: GQL_Product;
  product_id: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type GQL_ProductReturnHistory = {
  __typename?: 'ProductReturnHistory';
  created_at: Scalars['DateTime']['output'];
  delivery_person?: Maybe<GQL_DeliveryPerson>;
  delivery_person_id: Scalars['String']['output'];
  id: Scalars['String']['output'];
  pieces: Scalars['Int']['output'];
  product: GQL_Product;
  product_id: Scalars['String']['output'];
  shop: GQL_Shop;
  shop_id: Scalars['String']['output'];
  signature?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['DateTime']['output'];
};

export type GQL_ProductStock = {
  __typename?: 'ProductStock';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  is_delivered: Scalars['Boolean']['output'];
  pieces: Scalars['Int']['output'];
  product: GQL_Product;
  product_id: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type GQL_Query = {
  __typename?: 'Query';
  dailySalesReports: Array<GQL_DailySalesReport>;
  deliveryPerson?: Maybe<GQL_DeliveryPerson>;
  deliveryPersons: Array<GQL_DeliveryPerson>;
  me?: Maybe<GQL_User>;
  myShopOrders: Array<GQL_ShopOrder>;
  payment?: Maybe<GQL_Payment>;
  payments: Array<GQL_Payment>;
  product?: Maybe<GQL_Product>;
  productDeliveredHistory: Array<GQL_ProductDeliveredHistory>;
  productReturnHistory: Array<GQL_ProductReturnHistory>;
  products: Array<GQL_Product>;
  productsByShop: Array<GQL_Product>;
  salesSummary?: Maybe<GQL_DailySalesReport>;
  shop?: Maybe<GQL_Shop>;
  shopOrder?: Maybe<GQL_ShopOrder>;
  shopOrders: Array<GQL_ShopOrder>;
  shops: Array<GQL_Shop>;
  user?: Maybe<GQL_User>;
  users: Array<GQL_User>;
  vendor?: Maybe<GQL_Vendor>;
  vendors: Array<GQL_Vendor>;
};


export type GQL_QueryDailySalesReportsArgs = {
  filter?: InputMaybe<GQL_SalesReportFilter>;
};


export type GQL_QueryDeliveryPersonArgs = {
  id: Scalars['String']['input'];
};


export type GQL_QueryPaymentArgs = {
  id: Scalars['String']['input'];
};


export type GQL_QueryPaymentsArgs = {
  shop_id?: InputMaybe<Scalars['String']['input']>;
  vendor_id?: InputMaybe<Scalars['String']['input']>;
};


export type GQL_QueryProductArgs = {
  id: Scalars['String']['input'];
};


export type GQL_QueryProductDeliveredHistoryArgs = {
  shop_id?: InputMaybe<Scalars['String']['input']>;
};


export type GQL_QueryProductReturnHistoryArgs = {
  shop_id?: InputMaybe<Scalars['String']['input']>;
};


export type GQL_QueryProductsByShopArgs = {
  shop_id: Scalars['String']['input'];
};


export type GQL_QuerySalesSummaryArgs = {
  end_date?: InputMaybe<Scalars['DateTime']['input']>;
  shop_id?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['DateTime']['input']>;
  vendor_id?: InputMaybe<Scalars['String']['input']>;
};


export type GQL_QueryShopArgs = {
  id: Scalars['String']['input'];
};


export type GQL_QueryShopOrderArgs = {
  id: Scalars['String']['input'];
};


export type GQL_QueryShopOrdersArgs = {
  shop_id?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<GQL_OrderStatus>;
  vendor_id?: InputMaybe<Scalars['String']['input']>;
};


export type GQL_QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type GQL_QueryVendorArgs = {
  id: Scalars['String']['input'];
};

export enum GQL_RequestStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type GQL_SalesReportFilter = {
  end_date?: InputMaybe<Scalars['DateTime']['input']>;
  shop_id?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['DateTime']['input']>;
  vendor_id?: InputMaybe<Scalars['String']['input']>;
};

export type GQL_Shop = {
  __typename?: 'Shop';
  address: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  daily_sales_reports: Array<GQL_DailySalesReport>;
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  is_active: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  phone_number?: Maybe<Scalars['String']['output']>;
  product_delivered_history: Array<GQL_ProductDeliveredHistory>;
  product_deliveries: Array<GQL_ProductDelivery>;
  product_return_history: Array<GQL_ProductReturnHistory>;
  products: Array<GQL_Product>;
  shop_orders: Array<GQL_ShopOrder>;
  updated_at: Scalars['DateTime']['output'];
  user_id: Scalars['String']['output'];
};

export type GQL_ShopOrder = {
  __typename?: 'ShopOrder';
  admin_approvals: Array<GQL_AdminApproval>;
  created_at: Scalars['DateTime']['output'];
  delivered_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  order_items: Array<GQL_ShopOrderItem>;
  order_number: Scalars['String']['output'];
  ordered_at: Scalars['DateTime']['output'];
  shop: GQL_Shop;
  shop_id: Scalars['String']['output'];
  status: GQL_OrderStatus;
  total_amount: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  user: GQL_User;
  user_id: Scalars['String']['output'];
  vendor: GQL_Vendor;
  vendor_id: Scalars['String']['output'];
};

export type GQL_ShopOrderItem = {
  __typename?: 'ShopOrderItem';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  product: GQL_Product;
  product_id: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  shop_order: GQL_ShopOrder;
  shop_order_id: Scalars['String']['output'];
  total_price: Scalars['Int']['output'];
  unit_price: Scalars['Int']['output'];
};

export type GQL_ShopOrderItemInput = {
  product_id: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  unit_price: Scalars['Int']['input'];
};

export enum GQL_TransactionType {
  Cash = 'CASH',
  Nextpayment = 'NEXTPAYMENT',
  Transfer = 'TRANSFER'
}

export type GQL_UpdateDeliveryPersonInput = {
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
};

export type GQL_UpdateProductInput = {
  barcode?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  expired_at?: InputMaybe<Scalars['Int']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  ingredient?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  shop_id?: InputMaybe<Scalars['String']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  vendor_id?: InputMaybe<Scalars['String']['input']>;
};

export type GQL_UpdateShopInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
};

export type GQL_UpdateShopOrderInput = {
  delivered_at?: InputMaybe<Scalars['DateTime']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<GQL_OrderStatus>;
};

export type GQL_UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<GQL_UserRole>;
};

export type GQL_UpdateVendorInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
};

export type GQL_User = {
  __typename?: 'User';
  clerk_id: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  role: GQL_UserRole;
  shop_orders: Array<GQL_ShopOrder>;
  updated_at: Scalars['DateTime']['output'];
  vendor_profile?: Maybe<GQL_Vendor>;
};

export enum GQL_UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Vendor = 'VENDOR'
}

export type GQL_Vendor = {
  __typename?: 'Vendor';
  address?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  daily_sales_reports: Array<GQL_DailySalesReport>;
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  is_active: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  phone_number?: Maybe<Scalars['String']['output']>;
  products: Array<GQL_Product>;
  shop_orders: Array<GQL_ShopOrder>;
  updated_at: Scalars['DateTime']['output'];
  user: GQL_User;
  user_id: Scalars['String']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type GQL_ResolversTypes = ResolversObject<{
  AdminApproval: ResolverTypeWrapper<AdminApproval>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateDeliveryPersonInput: GQL_CreateDeliveryPersonInput;
  CreatePaymentInput: GQL_CreatePaymentInput;
  CreateProductInput: GQL_CreateProductInput;
  CreateShopInput: GQL_CreateShopInput;
  CreateShopOrderInput: GQL_CreateShopOrderInput;
  CreateUserInput: GQL_CreateUserInput;
  CreateVendorInput: GQL_CreateVendorInput;
  DailySalesReport: ResolverTypeWrapper<DailySalesReport>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DeliveryPerson: ResolverTypeWrapper<DeliveryPerson>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  OrderStatus: GQL_OrderStatus;
  Payment: ResolverTypeWrapper<Payment>;
  Product: ResolverTypeWrapper<Product>;
  ProductDeliveredHistory: ResolverTypeWrapper<ProductDeliveredHistory>;
  ProductDelivery: ResolverTypeWrapper<ProductDelivery>;
  ProductRemaining: ResolverTypeWrapper<ProductRemaining>;
  ProductReturnHistory: ResolverTypeWrapper<ProductReturnHistory>;
  ProductStock: ResolverTypeWrapper<ProductStock>;
  Query: ResolverTypeWrapper<{}>;
  RequestStatus: GQL_RequestStatus;
  SalesReportFilter: GQL_SalesReportFilter;
  Shop: ResolverTypeWrapper<Shop>;
  ShopOrder: ResolverTypeWrapper<ShopOrder>;
  ShopOrderItem: ResolverTypeWrapper<ShopOrderItem>;
  ShopOrderItemInput: GQL_ShopOrderItemInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TransactionType: GQL_TransactionType;
  UpdateDeliveryPersonInput: GQL_UpdateDeliveryPersonInput;
  UpdateProductInput: GQL_UpdateProductInput;
  UpdateShopInput: GQL_UpdateShopInput;
  UpdateShopOrderInput: GQL_UpdateShopOrderInput;
  UpdateUserInput: GQL_UpdateUserInput;
  UpdateVendorInput: GQL_UpdateVendorInput;
  User: ResolverTypeWrapper<User>;
  UserRole: GQL_UserRole;
  Vendor: ResolverTypeWrapper<Vendor>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type GQL_ResolversParentTypes = ResolversObject<{
  AdminApproval: AdminApproval;
  Boolean: Scalars['Boolean']['output'];
  CreateDeliveryPersonInput: GQL_CreateDeliveryPersonInput;
  CreatePaymentInput: GQL_CreatePaymentInput;
  CreateProductInput: GQL_CreateProductInput;
  CreateShopInput: GQL_CreateShopInput;
  CreateShopOrderInput: GQL_CreateShopOrderInput;
  CreateUserInput: GQL_CreateUserInput;
  CreateVendorInput: GQL_CreateVendorInput;
  DailySalesReport: DailySalesReport;
  DateTime: Scalars['DateTime']['output'];
  DeliveryPerson: DeliveryPerson;
  Int: Scalars['Int']['output'];
  Mutation: {};
  Payment: Payment;
  Product: Product;
  ProductDeliveredHistory: ProductDeliveredHistory;
  ProductDelivery: ProductDelivery;
  ProductRemaining: ProductRemaining;
  ProductReturnHistory: ProductReturnHistory;
  ProductStock: ProductStock;
  Query: {};
  SalesReportFilter: GQL_SalesReportFilter;
  Shop: Shop;
  ShopOrder: ShopOrder;
  ShopOrderItem: ShopOrderItem;
  ShopOrderItemInput: GQL_ShopOrderItemInput;
  String: Scalars['String']['output'];
  UpdateDeliveryPersonInput: GQL_UpdateDeliveryPersonInput;
  UpdateProductInput: GQL_UpdateProductInput;
  UpdateShopInput: GQL_UpdateShopInput;
  UpdateShopOrderInput: GQL_UpdateShopOrderInput;
  UpdateUserInput: GQL_UpdateUserInput;
  UpdateVendorInput: GQL_UpdateVendorInput;
  User: User;
  Vendor: Vendor;
}>;

export type GQL_AdminApprovalResolvers<ContextType = GraphQLContext, ParentType extends GQL_ResolversParentTypes['AdminApproval'] = GQL_ResolversParentTypes['AdminApproval']> = ResolversObject<{
  admin_id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  approved?: Resolver<GQL_ResolversTypes['Boolean'], ParentType, ContextType>;
  created_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>;
  shop_order?: Resolver<GQL_ResolversTypes['ShopOrder'], ParentType, ContextType>;
  shop_order_id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQL_DailySalesReportResolvers<ContextType = GraphQLContext, ParentType extends GQL_ResolversParentTypes['DailySalesReport'] = GQL_ResolversParentTypes['DailySalesReport']> = ResolversObject<{
  cash_sales?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  created_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  date?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  pending_payments?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  shop?: Resolver<GQL_ResolversTypes['Shop'], ParentType, ContextType>;
  shop_id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  total_orders?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  total_sales?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  transfer_sales?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  updated_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  vendor?: Resolver<GQL_ResolversTypes['Vendor'], ParentType, ContextType>;
  vendor_id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface GQL_DateTimeScalarConfig extends GraphQLScalarTypeConfig<GQL_ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type GQL_DeliveryPersonResolvers<ContextType = GraphQLContext, ParentType extends GQL_ResolversParentTypes['DeliveryPerson'] = GQL_ResolversParentTypes['DeliveryPerson']> = ResolversObject<{
  created_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  phone_number?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>;
  product_delivered_history?: Resolver<Array<GQL_ResolversTypes['ProductDeliveredHistory']>, ParentType, ContextType>;
  product_deliveries?: Resolver<Array<GQL_ResolversTypes['ProductDelivery']>, ParentType, ContextType>;
  product_return_history?: Resolver<Array<GQL_ResolversTypes['ProductReturnHistory']>, ParentType, ContextType>;
  updated_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQL_MutationResolvers<ContextType = GraphQLContext, ParentType extends GQL_ResolversParentTypes['Mutation'] = GQL_ResolversParentTypes['Mutation']> = ResolversObject<{
  cancelShopOrder?: Resolver<GQL_ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQL_MutationCancelShopOrderArgs, 'id'>>;
  confirmDelivery?: Resolver<GQL_ResolversTypes['ProductDeliveredHistory'], ParentType, ContextType, RequireFields<GQL_MutationConfirmDeliveryArgs, 'delivery_person_id' | 'pieces' | 'product_id' | 'shop_id' | 'total_price' | 'transaction_type'>>;
  createDeliveryPerson?: Resolver<GQL_ResolversTypes['DeliveryPerson'], ParentType, ContextType, RequireFields<GQL_MutationCreateDeliveryPersonArgs, 'input'>>;
  createPayment?: Resolver<GQL_ResolversTypes['Payment'], ParentType, ContextType, RequireFields<GQL_MutationCreatePaymentArgs, 'input'>>;
  createProduct?: Resolver<GQL_ResolversTypes['Product'], ParentType, ContextType, RequireFields<GQL_MutationCreateProductArgs, 'input'>>;
  createShop?: Resolver<GQL_ResolversTypes['Shop'], ParentType, ContextType, RequireFields<GQL_MutationCreateShopArgs, 'input'>>;
  createShopOrder?: Resolver<GQL_ResolversTypes['ShopOrder'], ParentType, ContextType, RequireFields<GQL_MutationCreateShopOrderArgs, 'input'>>;
  createUser?: Resolver<GQL_ResolversTypes['User'], ParentType, ContextType, RequireFields<GQL_MutationCreateUserArgs, 'input'>>;
  createVendor?: Resolver<GQL_ResolversTypes['Vendor'], ParentType, ContextType, RequireFields<GQL_MutationCreateVendorArgs, 'input'>>;
  deleteDeliveryPerson?: Resolver<GQL_ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQL_MutationDeleteDeliveryPersonArgs, 'id'>>;
  deleteProduct?: Resolver<GQL_ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQL_MutationDeleteProductArgs, 'id'>>;
  deleteShop?: Resolver<GQL_ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQL_MutationDeleteShopArgs, 'id'>>;
  deleteUser?: Resolver<GQL_ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQL_MutationDeleteUserArgs, 'id'>>;
  deleteVendor?: Resolver<GQL_ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQL_MutationDeleteVendorArgs, 'id'>>;
  deliverProduct?: Resolver<GQL_ResolversTypes['ProductDelivery'], ParentType, ContextType, RequireFields<GQL_MutationDeliverProductArgs, 'delivery_person_id' | 'pieces' | 'product_id' | 'shop_id'>>;
  generateDailySalesReport?: Resolver<GQL_ResolversTypes['DailySalesReport'], ParentType, ContextType, RequireFields<GQL_MutationGenerateDailySalesReportArgs, 'date' | 'shop_id' | 'vendor_id'>>;
  returnProduct?: Resolver<GQL_ResolversTypes['ProductReturnHistory'], ParentType, ContextType, RequireFields<GQL_MutationReturnProductArgs, 'delivery_person_id' | 'pieces' | 'product_id' | 'shop_id'>>;
  updateDeliveryPerson?: Resolver<GQL_ResolversTypes['DeliveryPerson'], ParentType, ContextType, RequireFields<GQL_MutationUpdateDeliveryPersonArgs, 'id' | 'input'>>;
  updateProduct?: Resolver<GQL_ResolversTypes['Product'], ParentType, ContextType, RequireFields<GQL_MutationUpdateProductArgs, 'id' | 'input'>>;
  updateShop?: Resolver<GQL_ResolversTypes['Shop'], ParentType, ContextType, RequireFields<GQL_MutationUpdateShopArgs, 'id' | 'input'>>;
  updateShopOrder?: Resolver<GQL_ResolversTypes['ShopOrder'], ParentType, ContextType, RequireFields<GQL_MutationUpdateShopOrderArgs, 'id' | 'input'>>;
  updateUser?: Resolver<GQL_ResolversTypes['User'], ParentType, ContextType, RequireFields<GQL_MutationUpdateUserArgs, 'id' | 'input'>>;
  updateVendor?: Resolver<GQL_ResolversTypes['Vendor'], ParentType, ContextType, RequireFields<GQL_MutationUpdateVendorArgs, 'id' | 'input'>>;
}>;

export type GQL_PaymentResolvers<ContextType = GraphQLContext, ParentType extends GQL_ResolversParentTypes['Payment'] = GQL_ResolversParentTypes['Payment']> = ResolversObject<{
  amount?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  created_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  paid_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  payment_reference?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>;
  product_delivered_history?: Resolver<GQL_ResolversTypes['ProductDeliveredHistory'], ParentType, ContextType>;
  product_delivered_history_id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  transaction_type?: Resolver<GQL_ResolversTypes['TransactionType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQL_ProductResolvers<ContextType = GraphQLContext, ParentType extends GQL_ResolversParentTypes['Product'] = GQL_ResolversParentTypes['Product']> = ResolversObject<{
  barcode?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>;
  expired_at?: Resolver<Maybe<GQL_ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>;
  ingredient?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  product_delivered_history?: Resolver<Array<GQL_ResolversTypes['ProductDeliveredHistory']>, ParentType, ContextType>;
  product_deliveries?: Resolver<Array<GQL_ResolversTypes['ProductDelivery']>, ParentType, ContextType>;
  product_remaining?: Resolver<Array<GQL_ResolversTypes['ProductRemaining']>, ParentType, ContextType>;
  product_return_history?: Resolver<Array<GQL_ResolversTypes['ProductReturnHistory']>, ParentType, ContextType>;
  product_stock?: Resolver<Array<GQL_ResolversTypes['ProductStock']>, ParentType, ContextType>;
  shop?: Resolver<Maybe<GQL_ResolversTypes['Shop']>, ParentType, ContextType>;
  shop_id?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>;
  shop_order_items?: Resolver<Array<GQL_ResolversTypes['ShopOrderItem']>, ParentType, ContextType>;
  stock?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  vendor?: Resolver<Maybe<GQL_ResolversTypes['Vendor']>, ParentType, ContextType>;
  vendor_id?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQL_ProductDeliveredHistoryResolvers<ContextType = GraphQLContext, ParentType extends GQL_ResolversParentTypes['ProductDeliveredHistory'] = GQL_ResolversParentTypes['ProductDeliveredHistory']> = ResolversObject<{
  created_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  delivery_person?: Resolver<Maybe<GQL_ResolversTypes['DeliveryPerson']>, ParentType, ContextType>;
  delivery_person_id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  paid?: Resolver<GQL_ResolversTypes['Boolean'], ParentType, ContextType>;
  paid_at?: Resolver<Maybe<GQL_ResolversTypes['DateTime']>, ParentType, ContextType>;
  payment?: Resolver<Maybe<GQL_ResolversTypes['Payment']>, ParentType, ContextType>;
  pieces?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  product?: Resolver<GQL_ResolversTypes['Product'], ParentType, ContextType>;
  product_id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  shop?: Resolver<GQL_ResolversTypes['Shop'], ParentType, ContextType>;
  shop_id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  signature?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>;
  total_price?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  transaction_type?: Resolver<GQL_ResolversTypes['TransactionType'], ParentType, ContextType>;
  updated_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQL_ProductDeliveryResolvers<ContextType = GraphQLContext, ParentType extends GQL_ResolversParentTypes['ProductDelivery'] = GQL_ResolversParentTypes['ProductDelivery']> = ResolversObject<{
  created_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  delivery_person?: Resolver<GQL_ResolversTypes['DeliveryPerson'], ParentType, ContextType>;
  delivery_person_id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  pieces?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  product?: Resolver<GQL_ResolversTypes['Product'], ParentType, ContextType>;
  product_id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  shop?: Resolver<GQL_ResolversTypes['Shop'], ParentType, ContextType>;
  shop_id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQL_ProductRemainingResolvers<ContextType = GraphQLContext, ParentType extends GQL_ResolversParentTypes['ProductRemaining'] = GQL_ResolversParentTypes['ProductRemaining']> = ResolversObject<{
  created_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  is_delivered?: Resolver<GQL_ResolversTypes['Boolean'], ParentType, ContextType>;
  pieces?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  product?: Resolver<GQL_ResolversTypes['Product'], ParentType, ContextType>;
  product_id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQL_ProductReturnHistoryResolvers<ContextType = GraphQLContext, ParentType extends GQL_ResolversParentTypes['ProductReturnHistory'] = GQL_ResolversParentTypes['ProductReturnHistory']> = ResolversObject<{
  created_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  delivery_person?: Resolver<Maybe<GQL_ResolversTypes['DeliveryPerson']>, ParentType, ContextType>;
  delivery_person_id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  pieces?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  product?: Resolver<GQL_ResolversTypes['Product'], ParentType, ContextType>;
  product_id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  shop?: Resolver<GQL_ResolversTypes['Shop'], ParentType, ContextType>;
  shop_id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  signature?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>;
  updated_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQL_ProductStockResolvers<ContextType = GraphQLContext, ParentType extends GQL_ResolversParentTypes['ProductStock'] = GQL_ResolversParentTypes['ProductStock']> = ResolversObject<{
  created_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  is_delivered?: Resolver<GQL_ResolversTypes['Boolean'], ParentType, ContextType>;
  pieces?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  product?: Resolver<GQL_ResolversTypes['Product'], ParentType, ContextType>;
  product_id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQL_QueryResolvers<ContextType = GraphQLContext, ParentType extends GQL_ResolversParentTypes['Query'] = GQL_ResolversParentTypes['Query']> = ResolversObject<{
  dailySalesReports?: Resolver<Array<GQL_ResolversTypes['DailySalesReport']>, ParentType, ContextType, Partial<GQL_QueryDailySalesReportsArgs>>;
  deliveryPerson?: Resolver<Maybe<GQL_ResolversTypes['DeliveryPerson']>, ParentType, ContextType, RequireFields<GQL_QueryDeliveryPersonArgs, 'id'>>;
  deliveryPersons?: Resolver<Array<GQL_ResolversTypes['DeliveryPerson']>, ParentType, ContextType>;
  me?: Resolver<Maybe<GQL_ResolversTypes['User']>, ParentType, ContextType>;
  myShopOrders?: Resolver<Array<GQL_ResolversTypes['ShopOrder']>, ParentType, ContextType>;
  payment?: Resolver<Maybe<GQL_ResolversTypes['Payment']>, ParentType, ContextType, RequireFields<GQL_QueryPaymentArgs, 'id'>>;
  payments?: Resolver<Array<GQL_ResolversTypes['Payment']>, ParentType, ContextType, Partial<GQL_QueryPaymentsArgs>>;
  product?: Resolver<Maybe<GQL_ResolversTypes['Product']>, ParentType, ContextType, RequireFields<GQL_QueryProductArgs, 'id'>>;
  productDeliveredHistory?: Resolver<Array<GQL_ResolversTypes['ProductDeliveredHistory']>, ParentType, ContextType, Partial<GQL_QueryProductDeliveredHistoryArgs>>;
  productReturnHistory?: Resolver<Array<GQL_ResolversTypes['ProductReturnHistory']>, ParentType, ContextType, Partial<GQL_QueryProductReturnHistoryArgs>>;
  products?: Resolver<Array<GQL_ResolversTypes['Product']>, ParentType, ContextType>;
  productsByShop?: Resolver<Array<GQL_ResolversTypes['Product']>, ParentType, ContextType, RequireFields<GQL_QueryProductsByShopArgs, 'shop_id'>>;
  salesSummary?: Resolver<Maybe<GQL_ResolversTypes['DailySalesReport']>, ParentType, ContextType, Partial<GQL_QuerySalesSummaryArgs>>;
  shop?: Resolver<Maybe<GQL_ResolversTypes['Shop']>, ParentType, ContextType, RequireFields<GQL_QueryShopArgs, 'id'>>;
  shopOrder?: Resolver<Maybe<GQL_ResolversTypes['ShopOrder']>, ParentType, ContextType, RequireFields<GQL_QueryShopOrderArgs, 'id'>>;
  shopOrders?: Resolver<Array<GQL_ResolversTypes['ShopOrder']>, ParentType, ContextType, Partial<GQL_QueryShopOrdersArgs>>;
  shops?: Resolver<Array<GQL_ResolversTypes['Shop']>, ParentType, ContextType>;
  user?: Resolver<Maybe<GQL_ResolversTypes['User']>, ParentType, ContextType, RequireFields<GQL_QueryUserArgs, 'id'>>;
  users?: Resolver<Array<GQL_ResolversTypes['User']>, ParentType, ContextType>;
  vendor?: Resolver<Maybe<GQL_ResolversTypes['Vendor']>, ParentType, ContextType, RequireFields<GQL_QueryVendorArgs, 'id'>>;
  vendors?: Resolver<Array<GQL_ResolversTypes['Vendor']>, ParentType, ContextType>;
}>;

export type GQL_ShopResolvers<ContextType = GraphQLContext, ParentType extends GQL_ResolversParentTypes['Shop'] = GQL_ResolversParentTypes['Shop']> = ResolversObject<{
  address?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  created_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  daily_sales_reports?: Resolver<Array<GQL_ResolversTypes['DailySalesReport']>, ParentType, ContextType>;
  email?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>;
  is_active?: Resolver<GQL_ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  phone_number?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>;
  product_delivered_history?: Resolver<Array<GQL_ResolversTypes['ProductDeliveredHistory']>, ParentType, ContextType>;
  product_deliveries?: Resolver<Array<GQL_ResolversTypes['ProductDelivery']>, ParentType, ContextType>;
  product_return_history?: Resolver<Array<GQL_ResolversTypes['ProductReturnHistory']>, ParentType, ContextType>;
  products?: Resolver<Array<GQL_ResolversTypes['Product']>, ParentType, ContextType>;
  shop_orders?: Resolver<Array<GQL_ResolversTypes['ShopOrder']>, ParentType, ContextType>;
  updated_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  user_id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQL_ShopOrderResolvers<ContextType = GraphQLContext, ParentType extends GQL_ResolversParentTypes['ShopOrder'] = GQL_ResolversParentTypes['ShopOrder']> = ResolversObject<{
  admin_approvals?: Resolver<Array<GQL_ResolversTypes['AdminApproval']>, ParentType, ContextType>;
  created_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  delivered_at?: Resolver<Maybe<GQL_ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>;
  order_items?: Resolver<Array<GQL_ResolversTypes['ShopOrderItem']>, ParentType, ContextType>;
  order_number?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  ordered_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  shop?: Resolver<GQL_ResolversTypes['Shop'], ParentType, ContextType>;
  shop_id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<GQL_ResolversTypes['OrderStatus'], ParentType, ContextType>;
  total_amount?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  updated_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<GQL_ResolversTypes['User'], ParentType, ContextType>;
  user_id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  vendor?: Resolver<GQL_ResolversTypes['Vendor'], ParentType, ContextType>;
  vendor_id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQL_ShopOrderItemResolvers<ContextType = GraphQLContext, ParentType extends GQL_ResolversParentTypes['ShopOrderItem'] = GQL_ResolversParentTypes['ShopOrderItem']> = ResolversObject<{
  created_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  product?: Resolver<GQL_ResolversTypes['Product'], ParentType, ContextType>;
  product_id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  quantity?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  shop_order?: Resolver<GQL_ResolversTypes['ShopOrder'], ParentType, ContextType>;
  shop_order_id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  total_price?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  unit_price?: Resolver<GQL_ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQL_UserResolvers<ContextType = GraphQLContext, ParentType extends GQL_ResolversParentTypes['User'] = GQL_ResolversParentTypes['User']> = ResolversObject<{
  clerk_id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  created_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>;
  isActive?: Resolver<GQL_ResolversTypes['Boolean'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<GQL_ResolversTypes['UserRole'], ParentType, ContextType>;
  shop_orders?: Resolver<Array<GQL_ResolversTypes['ShopOrder']>, ParentType, ContextType>;
  updated_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  vendor_profile?: Resolver<Maybe<GQL_ResolversTypes['Vendor']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQL_VendorResolvers<ContextType = GraphQLContext, ParentType extends GQL_ResolversParentTypes['Vendor'] = GQL_ResolversParentTypes['Vendor']> = ResolversObject<{
  address?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  daily_sales_reports?: Resolver<Array<GQL_ResolversTypes['DailySalesReport']>, ParentType, ContextType>;
  email?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>;
  is_active?: Resolver<GQL_ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  phone_number?: Resolver<Maybe<GQL_ResolversTypes['String']>, ParentType, ContextType>;
  products?: Resolver<Array<GQL_ResolversTypes['Product']>, ParentType, ContextType>;
  shop_orders?: Resolver<Array<GQL_ResolversTypes['ShopOrder']>, ParentType, ContextType>;
  updated_at?: Resolver<GQL_ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<GQL_ResolversTypes['User'], ParentType, ContextType>;
  user_id?: Resolver<GQL_ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQL_Resolvers<ContextType = GraphQLContext> = ResolversObject<{
  AdminApproval?: GQL_AdminApprovalResolvers<ContextType>;
  DailySalesReport?: GQL_DailySalesReportResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DeliveryPerson?: GQL_DeliveryPersonResolvers<ContextType>;
  Mutation?: GQL_MutationResolvers<ContextType>;
  Payment?: GQL_PaymentResolvers<ContextType>;
  Product?: GQL_ProductResolvers<ContextType>;
  ProductDeliveredHistory?: GQL_ProductDeliveredHistoryResolvers<ContextType>;
  ProductDelivery?: GQL_ProductDeliveryResolvers<ContextType>;
  ProductRemaining?: GQL_ProductRemainingResolvers<ContextType>;
  ProductReturnHistory?: GQL_ProductReturnHistoryResolvers<ContextType>;
  ProductStock?: GQL_ProductStockResolvers<ContextType>;
  Query?: GQL_QueryResolvers<ContextType>;
  Shop?: GQL_ShopResolvers<ContextType>;
  ShopOrder?: GQL_ShopOrderResolvers<ContextType>;
  ShopOrderItem?: GQL_ShopOrderItemResolvers<ContextType>;
  User?: GQL_UserResolvers<ContextType>;
  Vendor?: GQL_VendorResolvers<ContextType>;
}>;

