// backend/graphql/resolvers/vendor.resolvers.ts
import type { GQL_Resolvers } from "../../generated/graphql";
import { requireRole } from "@/lib/auth-utils";
import { DailySalesReport } from "@prisma/client";

const filterNullValues = <T extends Record<string, any>>(obj: T): any => {
  const filtered: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && value !== undefined) {
      filtered[key] = value;
    }
  }
  return filtered;
};

export const vendorResolvers: Pick<GQL_Resolvers, 'Query' | 'Mutation'> = {
  Query: {
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

    vendor: async (_parent, { id }, { prisma }) => {
      return await prisma.vendor.findUnique({
        where: { id },
        include: {
          user: true,
          products: true,
          shop_orders: true,
          daily_sales_reports: true,
        },
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