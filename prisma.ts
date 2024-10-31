'server-cli-only';
import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

function getPrismaClient(): InstanceType<typeof PrismaClient> {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
  return prisma;
}

const prismaClientSingleton = () => {
  return getPrismaClient();
};

let prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
const setTestPrisma = (newprisma: PrismaClient) => {
  prisma = newprisma;
};
export { prisma, setTestPrisma };
