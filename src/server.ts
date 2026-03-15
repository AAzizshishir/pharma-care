import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT;

async function main() {
  try {
    await prisma.$connect();

    app.listen(PORT, () => {});
  } catch (error) {
    console.error("an error occured", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
