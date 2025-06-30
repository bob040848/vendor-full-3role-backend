import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import type { GQL_Resolvers } from "../../generated/graphql";
import { requireRole } from "@/lib/auth-utils";

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

export const adminResolvers: GQL_Resolvers = {
  DateTime: DateTimeResolver,

  Query: {
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
          vendor_profile: true,
        },
      });
    },

    vendors: async (_parent, _args, { prisma }) => {
      return await prisma.vendor.findMany({
        include: {
          user: true,
          products: true,
          shop_orders: true, 
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

    deliveryPersons: async (_parent, _args, { prisma }) => {
      return await prisma.deliveryPerson.findMany({
        include: {
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
          admin_approvals: true,
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
  },

  Mutation: {
    createUser: async (_parent, { input }, context) => {
      requireRole(context, ["ADMIN"]);
      return await context.prisma.user.create({
        data: {
          clerk_id: input.clerk_id,
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
          imageUrl: input.imageUrl,
          role: input.role,
        },
        include: { 
          vendor_profile: true, 
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
          vendor_profile: true, 
          shop_orders: true 
        },
      });
    },

    deleteUser: async (_parent, { id }, context) => {
      requireRole(context, ["ADMIN"]);
      await context.prisma.user.delete({ where: { id } });
      return true;
    },

    createVendor: async (_parent, { input }, context) => {
      requireRole(context, ["ADMIN"]);
      return await context.prisma.vendor.create({
        data: {
          ...input,
          user_id: input.user_id, 
        },
        include: {
          user: true, 
          products: true,
          shop_orders: true,
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
          user: true,
          products: true,
          shop_orders: true, 
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
          pieces: args.pieces, 
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