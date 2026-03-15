import { prisma } from "../../lib/prisma";

// get user
const getUsers = async () => {
  const result = await prisma.user.findMany();

  return result;
};

// update user status
const updateUserStatus = async (userId: string, payload: any) => {
  const result = await prisma.user.update({
    where: { id: userId },
    data: payload,
  });

  return result;
};

export const userService = {
  getUsers,
  updateUserStatus,
};
