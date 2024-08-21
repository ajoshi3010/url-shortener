import { PrismaClient } from '@prisma/client';

// Function to create a new PrismaClient instance
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Declare globalThis for TypeScript, ensuring prismaGlobal exists
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Check if prismaGlobal exists, if not create a new PrismaClient instance
const client = globalThis.prismaGlobal ?? prismaClientSingleton();

export default client;

// In development, save the PrismaClient instance on the global object
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = client;
