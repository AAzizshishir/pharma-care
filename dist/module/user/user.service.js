import { prisma } from "../../lib/prisma";
// get user
const getUsers = async () => {
    const result = await prisma.user.findMany();
    return result;
};
// update user status
const updateUserStatus = async (userId, payload) => {
    console.log("From user service update user");
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
//# sourceMappingURL=user.service.js.map