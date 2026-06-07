const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

let isConnected = false;

const connectWithRetry = async (retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await prisma.$connect();
      console.log('Database connected successfully');
      isConnected = true;
      return;
    } catch (err) {
      console.log(`Database connection attempt ${i + 1} failed:`, err.message);
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  console.error('Failed to connect to database');
};

connectWithRetry();

module.exports = prisma;