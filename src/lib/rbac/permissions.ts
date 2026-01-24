export const RESOURCES = {
  PRODUCTS: "products",
  CATEGORIES: "categories",
  ORDERS: "orders",
  USERS: "users",
  REVIEWS: "reviews",
  INVENTORY: "inventory",
  PAYMENTS: "payments",
  SUPPORT: "support",
  CMS: "cms",
  SETTINGS: "settings",
  ANALYTICS: "analytics",
  AI: "ai",
} as const;

export const ACTIONS = {
  CREATE: "create",
  READ: "read",
  UPDATE: "update",
  DELETE: "delete",
  MANAGE: "manage",
} as const;

export type Resource = (typeof RESOURCES)[keyof typeof RESOURCES];
export type Action = (typeof ACTIONS)[keyof typeof ACTIONS];

export interface PermissionDefinition {
  resource: Resource;
  action: Action;
  description: string;
}

export const ALL_PERMISSIONS: PermissionDefinition[] = [
  // Products
  { resource: RESOURCES.PRODUCTS, action: ACTIONS.CREATE, description: "Create products" },
  { resource: RESOURCES.PRODUCTS, action: ACTIONS.READ, description: "View products" },
  { resource: RESOURCES.PRODUCTS, action: ACTIONS.UPDATE, description: "Update products" },
  { resource: RESOURCES.PRODUCTS, action: ACTIONS.DELETE, description: "Delete products" },
  { resource: RESOURCES.PRODUCTS, action: ACTIONS.MANAGE, description: "Full product management" },

  // Categories
  { resource: RESOURCES.CATEGORIES, action: ACTIONS.CREATE, description: "Create categories" },
  { resource: RESOURCES.CATEGORIES, action: ACTIONS.READ, description: "View categories" },
  { resource: RESOURCES.CATEGORIES, action: ACTIONS.UPDATE, description: "Update categories" },
  { resource: RESOURCES.CATEGORIES, action: ACTIONS.DELETE, description: "Delete categories" },
  { resource: RESOURCES.CATEGORIES, action: ACTIONS.MANAGE, description: "Full category management" },

  // Orders
  { resource: RESOURCES.ORDERS, action: ACTIONS.CREATE, description: "Create orders" },
  { resource: RESOURCES.ORDERS, action: ACTIONS.READ, description: "View orders" },
  { resource: RESOURCES.ORDERS, action: ACTIONS.UPDATE, description: "Update orders" },
  { resource: RESOURCES.ORDERS, action: ACTIONS.DELETE, description: "Cancel orders" },
  { resource: RESOURCES.ORDERS, action: ACTIONS.MANAGE, description: "Full order management" },

  // Users
  { resource: RESOURCES.USERS, action: ACTIONS.CREATE, description: "Create users" },
  { resource: RESOURCES.USERS, action: ACTIONS.READ, description: "View users" },
  { resource: RESOURCES.USERS, action: ACTIONS.UPDATE, description: "Update users" },
  { resource: RESOURCES.USERS, action: ACTIONS.DELETE, description: "Delete users" },
  { resource: RESOURCES.USERS, action: ACTIONS.MANAGE, description: "Full user management" },

  // Reviews
  { resource: RESOURCES.REVIEWS, action: ACTIONS.CREATE, description: "Create reviews" },
  { resource: RESOURCES.REVIEWS, action: ACTIONS.READ, description: "View reviews" },
  { resource: RESOURCES.REVIEWS, action: ACTIONS.UPDATE, description: "Moderate reviews" },
  { resource: RESOURCES.REVIEWS, action: ACTIONS.DELETE, description: "Delete reviews" },
  { resource: RESOURCES.REVIEWS, action: ACTIONS.MANAGE, description: "Full review management" },

  // Inventory
  { resource: RESOURCES.INVENTORY, action: ACTIONS.CREATE, description: "Add inventory" },
  { resource: RESOURCES.INVENTORY, action: ACTIONS.READ, description: "View inventory" },
  { resource: RESOURCES.INVENTORY, action: ACTIONS.UPDATE, description: "Update inventory" },
  { resource: RESOURCES.INVENTORY, action: ACTIONS.DELETE, description: "Remove inventory" },
  { resource: RESOURCES.INVENTORY, action: ACTIONS.MANAGE, description: "Full inventory management" },

  // Payments
  { resource: RESOURCES.PAYMENTS, action: ACTIONS.READ, description: "View payments" },
  { resource: RESOURCES.PAYMENTS, action: ACTIONS.UPDATE, description: "Process refunds" },
  { resource: RESOURCES.PAYMENTS, action: ACTIONS.MANAGE, description: "Full payment management" },

  // Support
  { resource: RESOURCES.SUPPORT, action: ACTIONS.CREATE, description: "Create tickets" },
  { resource: RESOURCES.SUPPORT, action: ACTIONS.READ, description: "View tickets" },
  { resource: RESOURCES.SUPPORT, action: ACTIONS.UPDATE, description: "Respond to tickets" },
  { resource: RESOURCES.SUPPORT, action: ACTIONS.DELETE, description: "Close tickets" },
  { resource: RESOURCES.SUPPORT, action: ACTIONS.MANAGE, description: "Full support management" },

  // CMS
  { resource: RESOURCES.CMS, action: ACTIONS.CREATE, description: "Create content" },
  { resource: RESOURCES.CMS, action: ACTIONS.READ, description: "View content" },
  { resource: RESOURCES.CMS, action: ACTIONS.UPDATE, description: "Update content" },
  { resource: RESOURCES.CMS, action: ACTIONS.DELETE, description: "Delete content" },
  { resource: RESOURCES.CMS, action: ACTIONS.MANAGE, description: "Full CMS management" },

  // Settings
  { resource: RESOURCES.SETTINGS, action: ACTIONS.READ, description: "View settings" },
  { resource: RESOURCES.SETTINGS, action: ACTIONS.UPDATE, description: "Update settings" },
  { resource: RESOURCES.SETTINGS, action: ACTIONS.MANAGE, description: "Full settings management" },

  // Analytics
  { resource: RESOURCES.ANALYTICS, action: ACTIONS.READ, description: "View analytics" },
  { resource: RESOURCES.ANALYTICS, action: ACTIONS.MANAGE, description: "Full analytics access" },

  // AI
  { resource: RESOURCES.AI, action: ACTIONS.READ, description: "View AI conversations" },
  { resource: RESOURCES.AI, action: ACTIONS.MANAGE, description: "Manage AI settings" },
];

export const ROLE_PERMISSIONS: Record<string, string[]> = {
  SUPER_ADMIN: ALL_PERMISSIONS.map((p) => `${p.resource}:${p.action}`),
  ADMIN: [
    "products:manage",
    "categories:manage",
    "orders:manage",
    "users:read",
    "users:update",
    "reviews:manage",
    "inventory:manage",
    "payments:read",
    "payments:update",
    "support:manage",
    "cms:manage",
    "settings:read",
    "analytics:read",
    "ai:read",
  ],
  WAREHOUSE: [
    "products:read",
    "orders:read",
    "orders:update",
    "inventory:manage",
  ],
  SUPPORT: [
    "products:read",
    "orders:read",
    "orders:update",
    "users:read",
    "reviews:read",
    "reviews:update",
    "support:manage",
    "ai:read",
  ],
  CUSTOMER: [
    "products:read",
    "categories:read",
    "orders:create",
    "orders:read",
    "reviews:create",
    "reviews:read",
    "support:create",
    "support:read",
  ],
};
