// backend/graphql/resolvers/user.resolvers.ts
import type { GQL_Resolvers } from "../../generated/graphql";
import { requireAuth } from "@/lib/auth-utils";

export const userResolvers: Pick<GQL_Resolvers, 'Query' | 'Mutation'> = {
  Query: {
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
          vendor_profile: true,
        },
      });
    },

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
          vendor_profile: true,
        },
      });

      if (!user) return null;
      return user;
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
          admin_approvals: true, 
        },
        orderBy: { created_at: 'desc' },
      });
    },
  },

  Mutation: {
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

    cancelShopOrder: async (_parent, { id }, context) => {
      requireAuth(context);
      await context.prisma.shopOrder.update({
        where: { id },
        data: { status: 'CANCELLED' },
      });
      return true;
    },
  },
};