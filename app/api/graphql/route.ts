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
      email: userRecord.emailAddresses?.[0]?.emailAddress,
      firstName: userRecord.firstName,
      lastName: userRecord.lastName,
      imageUrl: userRecord.imageUrl,
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

const FRONTEND_ORIGIN =
  process.env.NODE_ENV === "production"
    ? "https://vendor-full-3role-frontend.vercel.app"
    : "http://localhost:3000";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": FRONTEND_ORIGIN,
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}

export async function POST(req: Request) {
  const response = (await handler(req)) as NextResponse;
  response.headers.set("Access-Control-Allow-Origin", FRONTEND_ORIGIN);
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}

export async function GET(req: Request) {
  const response = (await handler(req)) as NextResponse;
  response.headers.set("Access-Control-Allow-Origin", FRONTEND_ORIGIN);
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}
export async function PUT(req: Request) {
  const response = (await handler(req)) as NextResponse;
  response.headers.set("Access-Control-Allow-Origin", FRONTEND_ORIGIN);
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}
export async function DELETE(req: Request) {
  const response = (await handler(req)) as NextResponse;
  response.headers.set("Access-Control-Allow-Origin", FRONTEND_ORIGIN);
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}
