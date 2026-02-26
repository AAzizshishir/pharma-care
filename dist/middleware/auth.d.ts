import type { NextFunction, Request, Response } from "express";
import type { UserStatus } from "../generated/prisma/enums";
export declare enum UserRole {
    CUSTOMER = "CUSTOMER",
    SELLER = "SELLER",
    ADMIN = "ADMIN"
}
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                name: string;
                role: string;
                status: UserStatus;
                emailVerified: boolean;
            };
        }
    }
}
declare const auth: (...roles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default auth;
//# sourceMappingURL=auth.d.ts.map