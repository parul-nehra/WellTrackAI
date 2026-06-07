const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ['error', 'warn'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

let connectionRetries = 0;
const MAX_RETRIES = 10;

const connectWithRetry = async () => {
  while (connectionRetries < MAX_RETRIES) {
    try {
      await prisma.$connect();
      console.log('Database connected successfully');
      return true;
    } catch (err) {
      connectionRetries++;
      console.log(`Database connection attempt ${connectionRetries} failed. Retrying in 3s...`);
      if (connectionRetries >= MAX_RETRIES) {
        console.error('Failed to connect to database after maximum retries');
        return false;
      }
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
};

connectWithRetry();

module.exports = prisma;