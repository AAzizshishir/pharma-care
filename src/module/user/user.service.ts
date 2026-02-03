import { prisma } from "../../lib/prisma";

// get user
const getUsers = async () => {
  const result = await prisma.user.findMany();

  return result;
};

export const userService = {
  getUsers,
};
