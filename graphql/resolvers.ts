import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import type { GQL_Resolvers } from "../generated/graphql";
import { requireAuth, requireRole } from "@/lib/auth-utils";
import {DailySalesReport } from "@prisma/client";

const filterNullValues = <T extends Record<string, any>>(obj: T): any => {
  const filtered: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && value !== undefined) {
      filtered[key] = value;
    }
  }
  return filtered;
};

const DateTimeResolver = new GraphQLScalarType({
  name: "DateTime",
  description: "Date custom scalar type",
  serialize(value: any) {
    return value instanceof Date ? value.toISOString() : value;
  },
  parseValue(value: any) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

export const resolvers: GQL_Resolvers = {
  DateTime: DateTimeResolver,

  Query: {
    user: async (_parent, { id }, { prisma }) => {
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          shop_orders: {
            include: {
              shop: true,
              vendor: true,
              order_items: { include: { product: true } },
            },
          },
          vendor_requests: {
            include: {
              admin_approvals: true,
            },
          },
        },
      });

      if (!user) return null;
      return user;
    },

    users: async (_parent, _args, { prisma }) => {
      return await prisma.user.findMany({
        include: {
          shop_orders: {
            include: {
              shop: true,
              vendor: true,
              order_items: { include: { product: true } },
            },
          },
          vendor_requests: {
            include: {
              admin_approvals: true,
            },
          },
        },
      });
    },

    me: async (_parent, _args, context) => {
      requireAuth(context);
      return await context.prisma.user.findUnique({
        where: { id: context.user!.id },
        include: {
          shop_orders: {
            include: {
              shop: true,
              vendor: true,
              order_items: { include: { product: true } },
            },
          },
          vendor_requests: {
            include: {
              admin_approvals: true,
            },
          },
        },
      });
    },

    vendorRequests: async (_parent, { status }, { prisma }) => {
      return await prisma.vendorRequest.findMany({
        where: status ? { status } : {},
        include: {
          user: true,
          admin_approvals: true,
        },
        orderBy: { created_at: 'desc' },
      });
    },
  
    vendorRequest: async (_parent, { id }, { prisma }) => {
      return await prisma.vendorRequest.findUnique({
        where: { id },
        include: {
          user: true,
          admin_approvals: true,
        },
      });
    },
  
    vendors: async (_parent, _args, { prisma }) => {
      return await prisma.vendor.findMany({
        include: {
          products: true,
          daily_sales_reports: true,
        },
      });
    },

    vendor: async (_parent, { id }, { prisma }) => {
      return await prisma.vendor.findUnique({
        where: { id },
        include: {
          products: true,
          daily_sales_reports: true,
        },
      });
    },

    shops: async (_parent, _args, { prisma }) => {
      return await prisma.shop.findMany({
        include: {
          products: true,
          product_deliveries: true,
          product_delivered_history: true,
          product_return_history: true,
        },
      });
    },

    shop: async (_parent, { id }, { prisma }) => {
      return await prisma.shop.findUnique({
        where: { id },
        include: {
          products: true,
          product_deliveries: true,
          product_delivered_history: true,
          product_return_history: true,
        },
      });
    },

    shopOrders: async (_parent, { shop_id, vendor_id, status }, { prisma }) => {
      const where: any = {};
      if (shop_id) where.shop_id = shop_id;
      if (vendor_id) where.vendor_id = vendor_id;
      if (status) where.status = status;
  
      return await prisma.shopOrder.findMany({
        where,
        include: {
          shop: true,
          vendor: true,
          user: true,
          order_items: {
            include: { product: true }
          },
        },
        orderBy: { created_at: 'desc' },
      });
    },
  
    shopOrder: async (_parent, { id }, { prisma }) => {
      return await prisma.shopOrder.findUnique({
        where: { id },
        include: {
          shop: true,
          vendor: true,
          user: true,
          order_items: {
            include: { product: true }
          },
        },
      });
    },
  
    myShopOrders: async (_parent, _args, context) => {
      requireAuth(context);
      return await context.prisma.shopOrder.findMany({
        where: { user_id: context.user!.id },
        include: {
          shop: true,
          vendor: true,
          user: true,
          order_items: {
            include: { product: true }
          },
        },
        orderBy: { created_at: 'desc' },
      });
    },

    products: async (_parent, _args, { prisma }) => {
      return await prisma.product.findMany({
        include: {
          vendor: true,
          shop: true,
          product_deliveries: true,
          product_delivered_history: true,
          product_return_history: true,
          product_remaining: true,
          product_stock: true,
        },
      });
    },

    product: async (_parent, { id }, { prisma }) => {
      return await prisma.product.findUnique({
        where: { id },
        include: {
          vendor: true,
          shop: true,
          product_deliveries: true,
          product_delivered_history: true,
          product_return_history: true,
          product_remaining: true,
          product_stock: true,
        },
      });
    },

    productsByShop: async (_parent, { shop_id }, { prisma }) => {
      return await prisma.product.findMany({
        where: { shop_id },
        include: {
          vendor: true,
          shop: true,
          product_deliveries: true,
          product_delivered_history: true,
          product_return_history: true,
          product_remaining: true,
          product_stock: true,
        },
      });
    },

    dailySalesReports: async (_parent, { filter }, { prisma }) => {
      const where: any = {};
      if (filter?.shop_id) where.shop_id = filter.shop_id;
      if (filter?.vendor_id) where.vendor_id = filter.vendor_id;
      if (filter?.start_date || filter?.end_date) {
        where.date = {};
        if (filter.start_date) where.date.gte = filter.start_date;
        if (filter.end_date) where.date.lte = filter.end_date;
      }
  
      return await prisma.dailySalesReport.findMany({
        where,
        include: {
          shop: true,
          vendor: true,
        },
        orderBy: { date: 'desc' },
      });
    },
  
    salesSummary: async (_parent, { shop_id, vendor_id, start_date, end_date }, { prisma }) => {
      const where: any = {};
      if (shop_id) where.shop_id = shop_id;
      if (vendor_id) where.vendor_id = vendor_id;
      if (start_date || end_date) {
        where.date = {};
        if (start_date) where.date.gte = start_date;
        if (end_date) where.date.lte = end_date;
      }
  
      const reports = await prisma.dailySalesReport.findMany({ where });
      
      interface SalesSummary {
        total_sales: number;
        total_orders: number;
        cash_sales: number;
        transfer_sales: number;
        pending_payments: number;
      }
      
      const summary = reports.reduce((acc: SalesSummary, report: DailySalesReport) => ({
        total_sales: acc.total_sales + (report.total_sales || 0),
        total_orders: acc.total_orders + (report.total_orders || 0),
        cash_sales: acc.cash_sales + (report.cash_sales || 0),
        transfer_sales: acc.transfer_sales + (report.transfer_sales || 0),
        pending_payments: acc.pending_payments + (report.pending_payments || 0),
      }), {
        total_sales: 0,
        total_orders: 0,
        cash_sales: 0,
        transfer_sales: 0,
        pending_payments: 0,
      } as SalesSummary);
  
      const shop = shop_id ? await prisma.shop.findUnique({ where: { id: shop_id } }) : null;
      const vendor = vendor_id ? await prisma.vendor.findUnique({ where: { id: vendor_id } }) : null;
      
      return {
        id: 'summary',
        shop_id: shop_id || '',
        vendor_id: vendor_id || '',
        date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        total_sales: summary.total_sales,
        total_orders: summary.total_orders,
        cash_sales: summary.cash_sales,
        transfer_sales: summary.transfer_sales,
        pending_payments: summary.pending_payments,
        shop: shop ?? { name: '', created_at: new Date(), email: '', id: '', updated_at: new Date(), address: '', image: null, is_active: false, phone_number: null },
        vendor: vendor ?? { name: '', created_at: new Date(), email: '', id: '', updated_at: new Date(), address: null, image: null, is_active: false, phone_number: null },
      };
    },
  
    payments: async (_parent, { shop_id, vendor_id }, { prisma }) => {
      const where: any = {};
      if (shop_id || vendor_id) {
        where.product_delivered_history = {};
        if (shop_id) where.product_delivered_history.shop_id = shop_id;
        if (vendor_id) where.product_delivered_history.product = { vendor_id };
      }
  
      return await prisma.payment.findMany({
        where,
        include: {
          product_delivered_history: {
            include: {
              product: { include: { vendor: true } },
              shop: true,
            },
          },
        },
        orderBy: { created_at: 'desc' },
      });
    },
  
    payment: async (_parent, { id }, { prisma }) => {
      return await prisma.payment.findUnique({
        where: { id },
        include: {
          product_delivered_history: {
            include: {
              product: { include: { vendor: true } },
              shop: true,
            },
          },
        },
      });
    },

    deliveryPersons: async (_parent, _args, { prisma }) => {
      return await prisma.deliveryPerson.findMany({
        include: {
          product_deliveries: true,
          product_delivered_history: true,
          product_return_history: true,
        },
      });
    },

    deliveryPerson: async (_parent, { id }, { prisma }) => {
      return await prisma.deliveryPerson.findUnique({
        where: { id },
        include: {
          product_deliveries: true,
          product_delivered_history: true,
          product_return_history: true,
        },
      });
    },

    productDeliveredHistory: async (_parent, { shop_id }, { prisma }) => {
      return await prisma.productDeliveredHistory.findMany({
        where: shop_id ? { shop_id } : {},
        include: {
          product: {
            include: {
              vendor: true,
            },
          },
          shop: true,
          delivery_person: true,
        },
        orderBy: {
          created_at: "desc",
        },
      });
    },

    productReturnHistory: async (_parent, { shop_id }, { prisma }) => {
      return await prisma.productReturnHistory.findMany({
        where: shop_id ? { shop_id } : {},
        include: {
          product: {
            include: {
              vendor: true,
            },
          },
          shop: true,
          delivery_person: true,
        },
        orderBy: {
          created_at: "desc",
        },
      });
    },
  },

  Mutation: {
    createUser: async (_parent, { input }, context) => {
      requireRole(context, ["ADMIN"]);
      return await context.prisma.user.create({
        data: input,
        include: { 
          vendor_requests: true, 
          shop_orders: true 
        },
      });
    },

    updateUser: async (_parent, { id, input }, context) => {
      requireRole(context, ["ADMIN"]);
      return await context.prisma.user.update({
        where: { id },
        data: filterNullValues(input),
        include: { 
          vendor_requests: true, 
          shop_orders: true 
        },
      });
    },

    deleteUser: async (_parent, { id }, context) => {
      requireRole(context, ["ADMIN"]);
      await context.prisma.user.delete({ where: { id } });
      return true;
    },

    createVendorRequest: async (_parent, { input }, context) => {
      requireAuth(context);
      return await context.prisma.vendorRequest.create({
        data: {
          ...input,
          user_id: context.user!.id,
        },
        include: {
          user: true,
          admin_approvals: true,
        },
      });
    },

    approveVendorRequest: async (_parent, { id, approved, notes }, context) => {
      requireRole(context, ["ADMIN"]);
      
      await context.prisma.adminApproval.create({
        data: {
          vendor_request_id: id,
          admin_id: context.user!.id,
          approved,
          notes,
        },
      });

      const updatedRequest = await context.prisma.vendorRequest.update({
        where: { id },
        data: {
          status: approved ? 'APPROVED' : 'REJECTED',
          reviewed_at: new Date(),
        },
        include: {
          user: true,
          admin_approvals: true,
        },
      });

      if (approved) {
        await context.prisma.vendor.create({
          data: {
            name: updatedRequest.name,
            email: updatedRequest.email,
            phone_number: updatedRequest.phone,
            address: updatedRequest.address,
          },
        });

        await context.prisma.user.update({
          where: { id: updatedRequest.user_id },
          data: { role: 'VENDOR' },
        });
      }

      return updatedRequest;
    },

    createShopOrder: async (_parent, { input }, context) => {
      requireAuth(context);
      
      const orderNumber = `ORD-${Date.now()}`;
      
      const totalAmount = input.order_items.reduce(
        (sum, item) => sum + (item.quantity * item.unit_price), 
        0
      );

      return await context.prisma.shopOrder.create({
        data: {
          ...input,
          user_id: context.user!.id,
          order_number: orderNumber,
          total_amount: totalAmount,
          order_items: {
            create: input.order_items.map(item => ({
              ...item,
              total_price: item.quantity * item.unit_price,
            })),
          },
        },
        include: {
          shop: true,
          vendor: true,
          user: true,
          order_items: {
            include: { product: true }
          },
        },
      });
    },

    updateShopOrder: async (_parent, { id, input }, context) => {
      requireRole(context, ["VENDOR", "ADMIN"]);
      return await context.prisma.shopOrder.update({
        where: { id },
        data: filterNullValues(input),
        include: {
          shop: true,
          vendor: true,
          user: true,
          order_items: {
            include: { product: true }
          },
        },
      });
    },

    cancelShopOrder: async (_parent, { id }, context) => {
      requireAuth(context);
      await context.prisma.shopOrder.update({
        where: { id },
        data: { status: 'CANCELLED' },
      });
      return true;
    },

    createPayment: async (_parent, { input }, context) => {
      requireRole(context, ["VENDOR", "ADMIN"]);
      return await context.prisma.payment.create({
        data: {
          ...input,
          paid_at: new Date(),
        },
        include: {
          product_delivered_history: {
            include: {
              product: { include: { vendor: true } },
              shop: true,
            },
          },
        },
      });
    },

    generateDailySalesReport: async (_parent, { shop_id, vendor_id, date }, context) => {
      requireRole(context, ["VENDOR", "ADMIN"]);
      
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const deliveries = await context.prisma.productDeliveredHistory.findMany({
        where: {
          shop_id,
          product: { vendor_id },
          created_at: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

      const totalSales = deliveries.reduce((sum, d) => sum + d.total_price, 0);
      const totalOrders = deliveries.length;
      const cashSales = deliveries
        .filter(d => d.transaction_type === 'CASH')
        .reduce((sum, d) => sum + d.total_price, 0);
      const transferSales = deliveries
        .filter(d => d.transaction_type === 'TRANSFER')
        .reduce((sum, d) => sum + d.total_price, 0);
      const pendingPayments = deliveries
        .filter(d => !d.paid)
        .reduce((sum, d) => sum + d.total_price, 0);

      return await context.prisma.dailySalesReport.upsert({
        where: {
          shop_id_vendor_id_date: {
            shop_id,
            vendor_id,
            date: startOfDay,
          },
        },
        update: {
          total_sales: totalSales,
          total_orders: totalOrders,
          cash_sales: cashSales,
          transfer_sales: transferSales,
          pending_payments: pendingPayments,
        },
        create: {
          shop_id,
          vendor_id,
          date: startOfDay,
          total_sales: totalSales,
          total_orders: totalOrders,
          cash_sales: cashSales,
          transfer_sales: transferSales,
          pending_payments: pendingPayments,
        },
        include: {
          shop: true,
          vendor: true,
        },
      });
    },

    createVendor: async (_parent, { input }, context) => {
      requireRole(context, ["ADMIN"]);
      return await context.prisma.vendor.create({
        data: input,
        include: {
          products: true,
          daily_sales_reports: true,
        },
      });
    },

    updateVendor: async (_parent, { id, input }, context) => {
      requireRole(context, ["ADMIN"]);
      return await context.prisma.vendor.update({
        where: { id },
        data: filterNullValues(input),
        include: {
          products: true,
          daily_sales_reports: true,
        },
      });
    },

    deleteVendor: async (_parent, { id }, context) => {
      requireRole(context, ["ADMIN"]);
      await context.prisma.vendor.delete({ where: { id } });
      return true;
    },

    createShop: async (_parent, { input }, context) => {
      requireRole(context, ["ADMIN"]);
      return await context.prisma.shop.create({
        data: input,
        include: {
          products: true,
          product_deliveries: true,
          product_delivered_history: true,
          product_return_history: true,
        },
      });
    },

    updateShop: async (_parent, { id, input }, context) => {
      requireRole(context, ["ADMIN"]);
      return await context.prisma.shop.update({
        where: { id },
        data: filterNullValues(input),
        include: {
          products: true,
          product_deliveries: true,
          product_delivered_history: true,
          product_return_history: true,
        },
      });
    },

    deleteShop: async (_parent, { id }, context) => {
      requireRole(context, ["ADMIN"]);
      await context.prisma.shop.delete({ where: { id } });
      return true;
    },

    createProduct: async (_parent, { input }, context) => {
      requireRole(context, ["VENDOR"]);
      return await context.prisma.product.create({
        data: input,
        include: {
          vendor: true,
          shop: true,
          product_deliveries: true,
          product_delivered_history: true,
          product_return_history: true,
          product_remaining: true,
          product_stock: true,
        },
      });
    },

    updateProduct: async (_parent, { id, input }, context) => {
      requireRole(context, ["VENDOR"]);
      return await context.prisma.product.update({
        where: { id },
        data: filterNullValues(input),
        include: {
          vendor: true,
          shop: true,
          product_deliveries: true,
          product_delivered_history: true,
          product_return_history: true,
          product_remaining: true,
          product_stock: true,
        },
      });
    },

    deleteProduct: async (_parent, { id }, context) => {
      requireRole(context, ["VENDOR"]);
      await context.prisma.product.delete({ where: { id } });
      return true;
    },

    createDeliveryPerson: async (_parent, { input }, context) => {
      requireRole(context, ["ADMIN"]);
      return await context.prisma.deliveryPerson.create({
        data: input,
        include: {
          product_deliveries: true,
          product_delivered_history: true,
          product_return_history: true,
        },
      });
    },

    updateDeliveryPerson: async (_parent, { id, input }, context) => {
      requireRole(context, ["ADMIN"]);
      return await context.prisma.deliveryPerson.update({
        where: { id },
        data: filterNullValues(input),
        include: {
          product_deliveries: true,
          product_delivered_history: true,
          product_return_history: true,
        },
      });
    },

    deleteDeliveryPerson: async (_parent, { id }, context) => {
      requireRole(context, ["ADMIN"]);
      await context.prisma.deliveryPerson.delete({ where: { id } });
      return true;
    },

    deliverProduct: async (_parent, args, context) => {
      requireRole(context, ["VENDOR", "ADMIN"]);
      return await context.prisma.productDelivery.create({
        data: {
          product_id: args.product_id,
          shop_id: args.shop_id,
          delivery_person_id: args.delivery_person_id,
          pieces: args.pieces,
        },
        include: {
          product: {
            include: {
              vendor: true,
            },
          },
          shop: true,
          delivery_person: true,
        },
      });
    },

    confirmDelivery: async (_parent, args, context) => {
      requireRole(context, ["VENDOR", "ADMIN"]);
      return await context.prisma.productDeliveredHistory.create({
        data: {
          product_id: args.product_id,
          shop_id: args.shop_id,
          delivery_person_id: args.delivery_person_id,
          total_price: args.total_price,
          transaction_type: args.transaction_type,
          signature: args.signature ?? null,
          paid: true,
          paid_at: new Date(),
        },
        include: {
          product: {
            include: {
              vendor: true,
            },
          },
          shop: true,
          delivery_person: true,
        },
      });
    },

    returnProduct: async (_parent, args, context) => {
      requireRole(context, ["VENDOR", "ADMIN"]);
      return await context.prisma.productReturnHistory.create({
        data: {
          product_id: args.product_id,
          shop_id: args.shop_id,
          delivery_person_id: args.delivery_person_id,
          pieces: args.pieces,
          signature: args.signature ?? null,
        },
        include: {
          product: {
            include: {
              vendor: true,
            },
          },
          shop: true,
          delivery_person: true,
        },
      });
    },
  },
};