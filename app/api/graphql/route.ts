//backend/app/api/graphql/route.ts
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest, NextResponse } from "next/server";
import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolvers";
import prisma from "@/lib/prisma";
import { verifyToken, createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});
async function getUser(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.replace("Bearer ", "");

  try {
    const tokenPayload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    });

    const userRecord = await clerkClient.users.getUser(tokenPayload.sub);

    return {
      id: userRecord.id,
      role: userRecord.publicMetadata?.role as
        | "ADMIN"
        | "VENDOR"
        | "USER"
        | undefined,
    };
  } catch (error) {
    console.error("Error verifying token or fetching user:", error);
    return null;
  }
}

const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest) => {
    const user = await getUser(req);
    return { prisma, user };
  },
});

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}
export const dynamic = "force-dynamic";

export {handler as GET, handler as POST};
