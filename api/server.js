// src/app.ts
import { toNodeHandler } from "better-auth/node";
import express from "express";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// src/generated/prisma/client.ts
import "process";
import * as path from "path";
import { fileURLToPath } from "url";
import "@prisma/client/runtime/client";

// src/generated/prisma/enums.ts
var OrderStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED"
};
var UserStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  SUSPENDED: "SUSPENDED",
  BANNED: "BANNED"
};

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  // output   = "../../generated/prisma"\n  output   = "../../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\n// category table\nmodel Category {\n  id          String   @id @default(uuid())\n  name        String   @unique\n  description String?\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  medicine Medicine[]\n\n  @@map("categories")\n}\n\n// medicine table\nmodel Medicine {\n  id          String   @id @default(uuid())\n  name        String   @db.VarChar(200)\n  description String   @db.Text\n  price       Decimal  @db.Decimal(10, 2)\n  stock       Int\n  sellerId    String\n  categoryId  String\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  seller     User        @relation(fields: [sellerId], references: [id])\n  category   Category    @relation(fields: [categoryId], references: [id])\n  orderItems OrderItem[]\n  reviews    Review[]\n  cartItem   CartItem[]\n\n  @@index([sellerId])\n  @@map("medicine")\n}\n\n// order table\nenum OrderStatus {\n  PENDING\n  CONFIRMED\n  SHIPPED\n  DELIVERED\n  CANCELLED\n}\n\nmodel Order {\n  id              String      @id @default(uuid())\n  customerId      String\n  status          OrderStatus @default(PENDING)\n  totalAmount     Decimal     @db.Decimal(10, 2)\n  paymentMethod   String?     @default("CASH ON DELIVERY")\n  shippingAddress String      @default("Bangladesh")\n  createdAt       DateTime    @default(now())\n  updatedAt       DateTime    @updatedAt\n\n  customer   User        @relation(fields: [customerId], references: [id])\n  orderItems OrderItem[]\n  reviews    Review[]\n\n  @@index([customerId])\n  @@map("orders")\n}\n\n// order item\nmodel OrderItem {\n  id              String  @id @default(uuid())\n  orderId         String\n  medicineId      String\n  quantity        Int\n  priceAtPurchase Decimal @db.Decimal(10, 2)\n\n  orders    Order    @relation(fields: [orderId], references: [id])\n  medicines Medicine @relation(fields: [medicineId], references: [id])\n\n  @@index([orderId])\n  @@index([medicineId])\n  @@map("orderItems")\n}\n\n// reviews\nmodel Review {\n  id         String   @id @default(uuid())\n  customerId String\n  medicineId String\n  orderId    String\n  rating     Int\n  comment    String?\n  createdAt  DateTime @default(now())\n\n  customer  User     @relation(fields: [customerId], references: [id])\n  medicines Medicine @relation(fields: [medicineId], references: [id])\n  order     Order    @relation(fields: [orderId], references: [id])\n\n  @@index([customerId])\n  @@index([medicineId])\n  @@map("reviews")\n}\n\nmodel Cart {\n  id        String     @id @default(uuid())\n  userId    String     @unique\n  user      User       @relation(fields: [userId], references: [id])\n  items     CartItem[]\n  createdAt DateTime   @default(now())\n  updatedAt DateTime   @updatedAt\n}\n\nmodel CartItem {\n  id         String   @id @default(uuid())\n  cartId     String\n  cart       Cart     @relation(fields: [cartId], references: [id])\n  medicineId String\n  medicine   Medicine @relation(fields: [medicineId], references: [id])\n  quantity   Int      @default(1)\n  subtotal   Decimal  @db.Decimal(10, 2)\n}\n\n// user table\nenum UserStatus {\n  ACTIVE\n  INACTIVE\n  SUSPENDED\n  BANNED\n}\n\nmodel User {\n  id            String    @id\n  name          String\n  email         String\n  emailVerified Boolean   @default(false)\n  image         String?\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n  role          String?   @default("CUSTOMER")\n  status        String?   @default("ACTIVE")\n  sessions      Session[]\n  accounts      Account[]\n\n  medicinis Medicine[]\n  orders    Order[]\n  reviews   Review[]\n  cart      Cart[]\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"CategoryToMedicine"}],"dbName":"categories"},"Medicine":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"sellerId","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"seller","kind":"object","type":"User","relationName":"MedicineToUser"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMedicine"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MedicineToOrderItem"},{"name":"reviews","kind":"object","type":"Review","relationName":"MedicineToReview"},{"name":"cartItem","kind":"object","type":"CartItem","relationName":"CartItemToMedicine"}],"dbName":"medicine"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"totalAmount","kind":"scalar","type":"Decimal"},{"name":"paymentMethod","kind":"scalar","type":"String"},{"name":"shippingAddress","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"customer","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"reviews","kind":"object","type":"Review","relationName":"OrderToReview"}],"dbName":"orders"},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"priceAtPurchase","kind":"scalar","type":"Decimal"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"MedicineToOrderItem"}],"dbName":"orderItems"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"customer","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"MedicineToReview"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToReview"}],"dbName":"reviews"},"Cart":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"CartToUser"},{"name":"items","kind":"object","type":"CartItem","relationName":"CartToCartItem"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"CartItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"cartId","kind":"scalar","type":"String"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToCartItem"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"CartItemToMedicine"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"subtotal","kind":"scalar","type":"Decimal"}],"dbName":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"role","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"medicinis","kind":"object","type":"Medicine","relationName":"MedicineToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  trustedOrigins: [process.env.APP_URL],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true
  }
});

// src/app.ts
import cors from "cors";

// src/module/category/category.routes.ts
import { Router } from "express";

// src/middleware/auth.ts
var auth2 = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!"
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        status: session.user.status,
        emailVerified: session.user.emailVerified
      };
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden! You don't have permission to access this resources!"
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
var auth_default = auth2;

// src/middleware/catchAsync.ts
var catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
var catchAsync_default = catchAsync;

// src/module/category/category.service.ts
var addCategory = async (payload) => {
  const existing = await prisma.category.findUnique({
    where: { name: payload.name }
  });
  if (existing) {
    return { error: { message: "Category already exists" } };
  }
  const result = await prisma.category.create({
    data: {
      ...payload
    }
  });
  return result;
};
var getCategories = async () => {
  const result = await prisma.category.findMany();
  return result;
};
var categoryService = {
  addCategory,
  getCategories
};

// src/module/category/category.controller.ts
var addCategory2 = catchAsync_default(async (req, res) => {
  const result = await categoryService.addCategory(req.body);
  res.status(201).json({
    success: true,
    data: result,
    message: "Category added successfull"
  });
});
var getCategories2 = catchAsync_default(async (req, res) => {
  const result = await categoryService.getCategories();
  res.status(200).json({
    success: true,
    data: result,
    message: "Category retrieved successfull"
  });
});
var categoryController = {
  addCategory: addCategory2,
  getCategories: getCategories2
};

// src/module/category/category.routes.ts
var router = Router();
router.get("/categories", categoryController.getCategories);
router.post("/category", auth_default("ADMIN" /* ADMIN */), categoryController.addCategory);
var categoryRoutes = router;

// src/module/medicine/medicine.routes.ts
import { Router as Router2 } from "express";

// src/module/medicine/medicine.service.ts
var getMedicines = async () => {
  const result = await prisma.medicine.findMany({
    where: {
      seller: { status: UserStatus.ACTIVE }
    }
  });
  return result;
};
var getMedicineBySeller = async (sellerId) => {
  const result = await prisma.medicine.findMany({
    where: {
      sellerId
    }
  });
  return result;
};
var getMedicineById = async (medicineId) => {
  const result = await prisma.medicine.findUnique({
    where: {
      id: medicineId
    },
    include: { category: true }
  });
  return result;
};
var addMedicine = async (payload, sellerId) => {
  const result = await prisma.medicine.create({
    data: {
      ...payload,
      sellerId
    }
  });
  return result;
};
var updateMedicine = async (medicineId, sellerId, payload) => {
  const medicineData = await prisma.medicine.findUniqueOrThrow({
    where: {
      id: medicineId
    }
  });
  if (medicineData.sellerId !== sellerId) {
    throw new Error("This Medicine is not yours");
  }
  const result = await prisma.medicine.update({
    where: { id: medicineId },
    data: payload
  });
  return result;
};
var deleteMedicine = async (medicineId, sellerId) => {
  const medicineData = await prisma.medicine.findUniqueOrThrow({
    where: {
      id: medicineId
    }
  });
  if (medicineData.sellerId !== sellerId) {
    throw new Error("This Medicine is not yours");
  }
  const result = await prisma.medicine.delete({
    where: { id: medicineId }
  });
  return result;
};
var medicineService = {
  addMedicine,
  getMedicineBySeller,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine
};

// src/module/medicine/medicine.controller.ts
var getMedicines2 = catchAsync_default(async (req, res) => {
  const result = await medicineService.getMedicines();
  res.status(200).json({
    success: true,
    data: result,
    message: "Medicines retrieved successfull"
  });
});
var getMedicineBySeller2 = catchAsync_default(async (req, res) => {
  const sellerId = req.user?.id;
  const result = await medicineService.getMedicineBySeller(sellerId);
  res.status(200).json({
    success: true,
    data: result,
    message: "Medicine retrieved successfull"
  });
});
var getMedicineById2 = catchAsync_default(async (req, res) => {
  const medicineId = req.params.id;
  const result = await medicineService.getMedicineById(medicineId);
  res.status(200).json({
    success: true,
    data: result,
    message: "Medicine retrieved successfull"
  });
});
var addMedicine2 = catchAsync_default(async (req, res) => {
  const sellerId = req?.user?.id;
  const result = await medicineService.addMedicine(
    req.body,
    sellerId
  );
  res.status(201).json({
    success: true,
    data: result,
    message: "Medicine added successfull"
  });
});
var updateMedicine2 = catchAsync_default(async (req, res) => {
  const medicineId = req.params.id;
  const sellerId = req.user?.id;
  const medicineData = req.body;
  const result = await medicineService.updateMedicine(
    medicineId,
    sellerId,
    medicineData
  );
  res.status(200).json({
    success: true,
    data: result,
    message: "Medicine update successfull"
  });
});
var deleteMedicine2 = catchAsync_default(async (req, res) => {
  const medicineId = req.params.id;
  const sellerId = req.user?.id;
  const result = await medicineService.deleteMedicine(
    medicineId,
    sellerId
  );
  res.status(200).json({
    success: true,
    data: result,
    message: "Medicine deleted successfull"
  });
});
var medicineController = {
  addMedicine: addMedicine2,
  getMedicineBySeller: getMedicineBySeller2,
  getMedicines: getMedicines2,
  getMedicineById: getMedicineById2,
  updateMedicine: updateMedicine2,
  deleteMedicine: deleteMedicine2
};

// src/module/medicine/medicine.routes.ts
var router2 = Router2();
router2.get("/medicines", medicineController.getMedicines);
router2.get(
  "/seller/medicines",
  auth_default("SELLER" /* SELLER */),
  medicineController.getMedicineBySeller
);
router2.get("/medicine/:id", medicineController.getMedicineById);
router2.post(
  "/seller/medicines",
  auth_default("SELLER" /* SELLER */),
  medicineController.addMedicine
);
router2.put(
  "/seller/medicine/:id",
  auth_default("SELLER" /* SELLER */),
  medicineController.updateMedicine
);
router2.delete(
  "/seller/medicine/:id",
  auth_default("SELLER" /* SELLER */),
  medicineController.deleteMedicine
);
var medicineRoutes = router2;

// src/middleware/globalErrorHandler.ts
var errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 400;
  const message = error.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
};

// src/module/user/user.routes.ts
import { Router as Router3 } from "express";

// src/module/user/user.service.ts
var getUsers = async () => {
  const result = await prisma.user.findMany();
  return result;
};
var updateUserStatus = async (userId, payload) => {
  console.log("From user service update user");
  const result = await prisma.user.update({
    where: { id: userId },
    data: payload
  });
  return result;
};
var userService = {
  getUsers,
  updateUserStatus
};

// src/module/user/user.controller.ts
var getUsers2 = catchAsync_default(async (req, res) => {
  const result = await userService.getUsers();
  res.status(200).json({
    success: true,
    data: result,
    message: "Users retrieved successfull"
  });
});
var updateUserStatus2 = catchAsync_default(async (req, res) => {
  console.log(req.body);
  const userId = req.params.id;
  const result = await userService.updateUserStatus(userId, req.body);
  res.status(200).json({
    success: true,
    data: result,
    message: "Users update successfull"
  });
});
var userController = {
  getUsers: getUsers2,
  updateUserStatus: updateUserStatus2
};

// src/module/user/user.routes.ts
var router3 = Router3();
router3.get("/admin/users", auth_default("ADMIN" /* ADMIN */), userController.getUsers);
router3.put(
  "/admin/user/:id",
  auth_default("ADMIN" /* ADMIN */),
  userController.updateUserStatus
);
var userRoutes = router3;

// src/module/order/order.routes.ts
import { Router as Router4 } from "express";

// src/module/order/order.service.ts
var createOrder = async ({
  customerId,
  shippingAddress,
  items
}) => {
  let totalAmount = 0;
  const orderItemsData = [];
  const result = await prisma.$transaction(async (tx) => {
    for (const data of items) {
      const medicine = await tx.medicine.findUnique({
        where: { id: data.medicineId }
      });
      if (!medicine) throw new Error(`Medicine ${data.medicineId} not found`);
      if (medicine.stock < data.quantity)
        throw new Error(`Not enough stock for ${medicine.name}`);
      const subtotal = Number(medicine.price) * data.quantity;
      totalAmount += subtotal;
      orderItemsData.push({
        medicineId: data.medicineId,
        quantity: data.quantity,
        priceAtPurchase: medicine.price
      });
      await tx.medicine.update({
        where: { id: data.medicineId },
        data: { stock: { decrement: data.quantity } }
      });
    }
    const order = await tx.order.create({
      data: {
        customerId,
        status: OrderStatus.PENDING,
        shippingAddress,
        totalAmount,
        orderItems: { create: orderItemsData }
      },
      include: { orderItems: { include: { medicines: true } } }
    });
    await tx.cartItem.deleteMany({
      where: { cart: { userId: customerId } }
    });
    await tx.cart.deleteMany({
      where: { userId: customerId }
    });
    return order;
  });
  return result;
};
var getUserOrders = async (customerId) => {
  const result = await prisma.order.findMany({
    where: {
      customerId
    },
    include: {
      orderItems: {
        include: { medicines: true }
      }
    }
  });
  return result;
};
var getOrdersForAdmin = async () => {
  const result = prisma.order.findMany({
    include: {
      customer: true,
      orderItems: { include: { medicines: true } }
    }
  });
  return result;
};
var getUserOrderById = async (customerId, orderId) => {
  const result = await prisma.order.findUnique({
    where: {
      customerId,
      id: orderId
    },
    include: {
      orderItems: {
        include: { medicines: true }
      }
    }
  });
  return result;
};
var getSellerOrders = async (sellerId) => {
  return prisma.order.findMany({
    where: {
      orderItems: {
        some: { medicines: { sellerId } }
      }
    },
    include: {
      customer: true,
      orderItems: { include: { medicines: true } }
    }
  });
};
var updateOrderStatus = async (orderId, sellerId, payload) => {
  const orderData = await prisma.orderItem.findMany({
    where: {
      orderId,
      medicines: {
        sellerId
      }
    },
    include: {
      medicines: true
    }
  });
  if (orderData.length === 0) {
    throw new Error("This is not your order");
  }
  const result = await prisma.order.update({
    where: {
      id: orderId
    },
    data: payload
  });
  return result;
};
var cancellOrder = async (orderId, payload) => {
  const result = await prisma.order.update({
    where: {
      id: orderId
    },
    data: payload
  });
  return result;
};
var orderService = {
  createOrder,
  getUserOrders,
  getUserOrderById,
  getSellerOrders,
  getOrdersForAdmin,
  updateOrderStatus,
  cancellOrder
};

// src/module/order/order.controller.ts
var createOrder2 = catchAsync_default(async (req, res) => {
  const customerId = req.user?.id;
  if (!customerId) {
    throw new Error("Customer ID is required");
  }
  const { items, shippingAddress } = req.body;
  console.log(customerId, req.body);
  const result = await orderService.createOrder({
    customerId,
    shippingAddress,
    items
  });
  res.status(201).json({
    success: true,
    data: result,
    message: "Order created successfull"
  });
});
var getUserOrders2 = catchAsync_default(async (req, res) => {
  const customerId = req.user?.id;
  console.log(customerId);
  const result = await orderService.getUserOrders(customerId);
  res.status(200).json({
    success: true,
    data: result,
    message: "Order Retrieved successfull"
  });
});
var getUserOrderById2 = catchAsync_default(async (req, res) => {
  const customerId = req.user?.id;
  const orderId = req.params.id;
  console.log(customerId);
  const result = await orderService.getUserOrderById(
    customerId,
    orderId
  );
  res.status(200).json({
    success: true,
    data: result,
    message: "Order Retrieved successfull"
  });
});
var getSellerOrders2 = catchAsync_default(async (req, res) => {
  const sellerId = req.user?.id;
  console.log(sellerId);
  const result = await orderService.getSellerOrders(sellerId);
  res.status(200).json({
    success: true,
    data: result,
    message: "Order Retrieved successfull"
  });
});
var getOrdersForAdmin2 = catchAsync_default(async (req, res) => {
  const result = await orderService.getOrdersForAdmin();
  res.status(200).json({
    success: true,
    data: result,
    message: "Orders Retrieved successfull"
  });
});
var updateOrderStatus2 = catchAsync_default(async (req, res) => {
  const orderId = req.params.id;
  const sellerId = req.user?.id;
  const orderData = req.body;
  const result = await orderService.updateOrderStatus(
    orderId,
    sellerId,
    orderData
  );
  res.status(200).json({
    success: true,
    data: result,
    message: "Order status updated successfull"
  });
});
var cancellOrder2 = catchAsync_default(async (req, res) => {
  const orderId = req.params.id;
  const orderData = req.body;
  const result = await orderService.cancellOrder(orderId, orderData);
  res.status(200).json({
    success: true,
    data: result,
    message: "Order cancell successfull"
  });
});
var orderController = {
  createOrder: createOrder2,
  getUserOrders: getUserOrders2,
  getUserOrderById: getUserOrderById2,
  getSellerOrders: getSellerOrders2,
  getOrdersForAdmin: getOrdersForAdmin2,
  updateOrderStatus: updateOrderStatus2,
  cancellOrder: cancellOrder2
};

// src/module/order/order.routes.ts
var router4 = Router4();
router4.get("/orders/admin", orderController.getOrdersForAdmin);
router4.get(
  "/orders/seller",
  auth_default("SELLER" /* SELLER */),
  orderController.getSellerOrders
);
router4.get("/orders", auth_default("CUSTOMER" /* CUSTOMER */), orderController.getUserOrders);
router4.get(
  "/order/:id",
  auth_default("CUSTOMER" /* CUSTOMER */),
  orderController.getUserOrderById
);
router4.patch(
  "/order/seller/:id",
  auth_default("SELLER" /* SELLER */),
  orderController.updateOrderStatus
);
router4.patch("/order/:id", orderController.cancellOrder);
router4.post("/order", auth_default("CUSTOMER" /* CUSTOMER */), orderController.createOrder);
var orderRoutes = router4;

// src/module/review/review.routes.ts
import { Router as Router5 } from "express";

// src/module/review/review.service.ts
var addReview = async (customerId, payload) => {
  const order = await prisma.order.findUnique({
    where: { id: payload.orderId },
    include: { orderItems: true }
  });
  if (order?.customerId !== customerId || order.status !== "DELIVERED") {
    throw new Error("Invalid order for review");
  }
  const medicineInOrder = order.orderItems.find(
    (item) => item.medicineId === payload.medicineId
  );
  if (!medicineInOrder) {
    throw new Error("Medicine not found in order");
  }
  const result = await prisma.review.create({
    data: {
      customerId,
      ...payload
    }
  });
  return result;
};
var getCustomerReview = async (customerId) => {
  const reviews = await prisma.review.findMany({
    where: { customerId },
    include: {
      medicines: {
        select: {
          id: true,
          name: true
        }
      },
      order: {
        select: {
          id: true,
          status: true,
          createdAt: true
        }
      },
      customer: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return reviews;
};
var getMedicineReviews = async (medicineId) => {
  console.log("from review service", medicineId);
  const result = await prisma.review.findMany({
    where: { medicineId },
    include: {
      medicines: {
        select: {
          id: true,
          name: true
        }
      },
      order: {
        select: {
          id: true,
          status: true,
          createdAt: true
        }
      },
      customer: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var getSellerMedicineReviews = async (sellerId) => {
  const result = await prisma.review.findMany({
    where: { medicines: { sellerId } },
    include: {
      medicines: {
        select: {
          id: true,
          name: true
        }
      },
      order: {
        select: {
          id: true,
          status: true,
          createdAt: true
        }
      },
      customer: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var deleteReview = async (customerId, reviewId) => {
  const findReview = await prisma.review.findFirstOrThrow({
    where: {
      customerId
    }
  });
  if (findReview.customerId !== customerId) {
    throw new Error("This is not your review");
  }
  const result = await prisma.review.delete({
    where: {
      id: reviewId
    }
  });
  return result;
};
var reviewService = {
  addReview,
  getCustomerReview,
  getMedicineReviews,
  getSellerMedicineReviews,
  deleteReview
};

// src/module/review/review.controller.ts
var addReview2 = catchAsync_default(async (req, res) => {
  const customerId = req.user?.id;
  const payload = req.body;
  const result = await reviewService.addReview(customerId, payload);
  res.status(201).json({
    success: true,
    data: result,
    message: "review added successful"
  });
});
var getCustomerReview2 = catchAsync_default(async (req, res) => {
  const customerId = req.user?.id;
  const result = await reviewService.getCustomerReview(customerId);
  res.status(200).json({
    success: true,
    data: result,
    message: "review fetched successful"
  });
});
var getMedicineReviews2 = catchAsync_default(async (req, res) => {
  const medicineId = req.params.id;
  console.log("from controller", medicineId);
  const result = await reviewService.getMedicineReviews(medicineId);
  res.status(200).json({
    success: true,
    data: result,
    message: "review fetched successful"
  });
});
var getSellerMedicineReviews2 = catchAsync_default(
  async (req, res) => {
    const sellerId = req.user?.id;
    const result = await reviewService.getSellerMedicineReviews(
      sellerId
    );
    res.status(200).json({
      success: true,
      data: result,
      message: "review fetched successful"
    });
  }
);
var deleteReview2 = catchAsync_default(async (req, res) => {
  const customerId = req.user?.id;
  const reviewId = req.params.id;
  const result = await reviewService.deleteReview(
    customerId,
    reviewId
  );
  res.status(200).json({
    success: true,
    data: result,
    message: "Review delete successfull"
  });
});
var reviewController = {
  addReview: addReview2,
  getCustomerReview: getCustomerReview2,
  getMedicineReviews: getMedicineReviews2,
  getSellerMedicineReviews: getSellerMedicineReviews2,
  deleteReview: deleteReview2
};

// src/module/review/review.routes.ts
var router5 = Router5();
router5.post("/review", auth_default("CUSTOMER" /* CUSTOMER */), reviewController.addReview);
router5.get(
  "/review",
  auth_default("CUSTOMER" /* CUSTOMER */),
  reviewController.getCustomerReview
);
router5.get("/review/:id", reviewController.getMedicineReviews);
router5.get(
  "/seller/review",
  auth_default("SELLER" /* SELLER */),
  reviewController.getSellerMedicineReviews
);
router5.delete(
  "/review/:id",
  auth_default("CUSTOMER" /* CUSTOMER */),
  reviewController.deleteReview
);
var reviewRoutes = router5;

// src/module/cart/cart.routes.ts
import { Router as Router6 } from "express";

// src/module/cart/cart.service.ts
var addToCart = async (userId, medicineId, quantity) => {
  const existingItem = await prisma.cartItem.findFirst({
    where: { cart: { userId }, medicineId }
  });
  if (existingItem) {
    const medicine2 = await prisma.medicine.findUnique({
      where: { id: medicineId }
    });
    if (!medicine2) throw new Error("Medicine not found");
    const newQuantity = existingItem.quantity + quantity;
    const newSubtotal = medicine2.price.toNumber() * newQuantity;
    return prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: newQuantity,
        subtotal: newSubtotal
      }
    });
  }
  const medicine = await prisma.medicine.findUnique({
    where: { id: medicineId }
  });
  if (!medicine) throw new Error("Medicine not found");
  const subtotal = medicine.price.toNumber() * quantity;
  return prisma.cartItem.create({
    data: {
      cart: {
        connectOrCreate: {
          where: { userId },
          create: { userId }
        }
      },
      medicine: { connect: { id: medicineId } },
      quantity,
      subtotal
    }
  });
};
var getCart = async (userId) => {
  const result = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          medicine: {
            include: { category: true }
          }
        }
      }
    }
  });
  return result;
};
var deleteCartItem = async (cartItemId, userId) => {
  const cartItem = await prisma.cartItem.findUniqueOrThrow({
    where: { id: cartItemId },
    include: { cart: true }
  });
  if (cartItem.cart.userId !== userId) {
    throw new Error("This Cart is not yours");
  }
  const result = await prisma.cartItem.delete({
    where: { id: cartItemId }
  });
  return result;
};
var cartService = {
  addToCart,
  getCart,
  deleteCartItem
};

// src/module/cart/cart.controller.ts
var addToCart2 = catchAsync_default(async (req, res) => {
  const userId = req.user?.id;
  const medicineId = req.params.id;
  const { quantity } = req.body;
  console.log(
    "userId:",
    userId,
    "medicineId:",
    medicineId,
    "quantity:",
    quantity
  );
  const result = await cartService.addToCart(
    userId,
    medicineId,
    quantity
  );
  res.status(201).json({
    success: true,
    data: result,
    message: "Cart Added successfull"
  });
});
var getCart2 = catchAsync_default(async (req, res) => {
  const userId = req.user?.id;
  const result = await cartService.getCart(userId);
  res.status(200).json({
    success: true,
    data: result,
    message: "Cart retrieved successfull"
  });
});
var deleteCartItem2 = catchAsync_default(async (req, res) => {
  const cartId = req.params.id;
  const userId = req.user?.id;
  const result = await cartService.deleteCartItem(
    cartId,
    userId
  );
  res.status(200).json({
    success: true,
    data: result,
    message: "CartItem deleted successfull"
  });
});
var cartController = {
  addToCart: addToCart2,
  getCart: getCart2,
  deleteCartItem: deleteCartItem2
};

// src/module/cart/cart.routes.ts
var router6 = Router6();
router6.get("/cart", auth_default("CUSTOMER" /* CUSTOMER */), cartController.getCart);
router6.post("/cart/:id", auth_default("CUSTOMER" /* CUSTOMER */), cartController.addToCart);
router6.delete(
  "/cart/:id",
  auth_default("CUSTOMER" /* CUSTOMER */),
  cartController.deleteCartItem
);
var cartRoutes = router6;

// src/app.ts
var app = express();
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true
  })
);
app.use(express.json());
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api", categoryRoutes);
app.use("/api", medicineRoutes);
app.use("/api", orderRoutes);
app.use("/api", userRoutes);
app.use("/api", reviewRoutes);
app.use("/api", cartRoutes);
app.get("/", (req, res) => {
  res.send("Pharma Care");
});
app.use(errorHandler);
var app_default = app;

// src/server.ts
var PORT = process.env.PORT || 5e3;
async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");
    app_default.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (error) {
    console.error("an error occured", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
