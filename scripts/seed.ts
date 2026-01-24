import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clean existing data
  await prisma.aIAction.deleteMany();
  await prisma.aIMessage.deleteMany();
  await prisma.aIConversation.deleteMany();
  await prisma.ticketMessage.deleteMany();
  await prisma.supportTicket.deleteMany();
  await prisma.review.deleteMany();
  await prisma.refundExchange.deleteMany();
  await prisma.shipment.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderStatusHistory.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.stockLevel.deleteMany();
  await prisma.inventoryLocation.deleteMany();
  await prisma.bundleItem.deleteMany();
  await prisma.attributeValue.deleteMany();
  await prisma.variantOption.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.attributeSetAttribute.deleteMany();
  await prisma.attribute.deleteMany();
  await prisma.categoryAttributeSet.deleteMany();
  await prisma.attributeSet.deleteMany();
  await prisma.category.deleteMany();
  await prisma.policy.deleteMany();
  await prisma.cMSPage.deleteMany();
  await prisma.deliveryRule.deleteMany();
  await prisma.address.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.user.deleteMany();
  await prisma.rolePermission.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.role.deleteMany();

  console.log("✅ Cleaned existing data");

  // Create permissions
  const permissions = [
    { name: "products:create", resource: "products", action: "create", description: "Create products" },
    { name: "products:read", resource: "products", action: "read", description: "View products" },
    { name: "products:update", resource: "products", action: "update", description: "Update products" },
    { name: "products:delete", resource: "products", action: "delete", description: "Delete products" },
    { name: "products:manage", resource: "products", action: "manage", description: "Full product management" },
    { name: "categories:create", resource: "categories", action: "create", description: "Create categories" },
    { name: "categories:read", resource: "categories", action: "read", description: "View categories" },
    { name: "categories:update", resource: "categories", action: "update", description: "Update categories" },
    { name: "categories:delete", resource: "categories", action: "delete", description: "Delete categories" },
    { name: "categories:manage", resource: "categories", action: "manage", description: "Full category management" },
    { name: "orders:create", resource: "orders", action: "create", description: "Create orders" },
    { name: "orders:read", resource: "orders", action: "read", description: "View orders" },
    { name: "orders:update", resource: "orders", action: "update", description: "Update orders" },
    { name: "orders:delete", resource: "orders", action: "delete", description: "Cancel orders" },
    { name: "orders:manage", resource: "orders", action: "manage", description: "Full order management" },
    { name: "users:create", resource: "users", action: "create", description: "Create users" },
    { name: "users:read", resource: "users", action: "read", description: "View users" },
    { name: "users:update", resource: "users", action: "update", description: "Update users" },
    { name: "users:delete", resource: "users", action: "delete", description: "Delete users" },
    { name: "users:manage", resource: "users", action: "manage", description: "Full user management" },
    { name: "reviews:create", resource: "reviews", action: "create", description: "Create reviews" },
    { name: "reviews:read", resource: "reviews", action: "read", description: "View reviews" },
    { name: "reviews:update", resource: "reviews", action: "update", description: "Moderate reviews" },
    { name: "reviews:delete", resource: "reviews", action: "delete", description: "Delete reviews" },
    { name: "reviews:manage", resource: "reviews", action: "manage", description: "Full review management" },
    { name: "inventory:create", resource: "inventory", action: "create", description: "Add inventory" },
    { name: "inventory:read", resource: "inventory", action: "read", description: "View inventory" },
    { name: "inventory:update", resource: "inventory", action: "update", description: "Update inventory" },
    { name: "inventory:delete", resource: "inventory", action: "delete", description: "Remove inventory" },
    { name: "inventory:manage", resource: "inventory", action: "manage", description: "Full inventory management" },
    { name: "payments:read", resource: "payments", action: "read", description: "View payments" },
    { name: "payments:update", resource: "payments", action: "update", description: "Process refunds" },
    { name: "payments:manage", resource: "payments", action: "manage", description: "Full payment management" },
    { name: "support:create", resource: "support", action: "create", description: "Create tickets" },
    { name: "support:read", resource: "support", action: "read", description: "View tickets" },
    { name: "support:update", resource: "support", action: "update", description: "Respond to tickets" },
    { name: "support:delete", resource: "support", action: "delete", description: "Close tickets" },
    { name: "support:manage", resource: "support", action: "manage", description: "Full support management" },
    { name: "cms:create", resource: "cms", action: "create", description: "Create content" },
    { name: "cms:read", resource: "cms", action: "read", description: "View content" },
    { name: "cms:update", resource: "cms", action: "update", description: "Update content" },
    { name: "cms:delete", resource: "cms", action: "delete", description: "Delete content" },
    { name: "cms:manage", resource: "cms", action: "manage", description: "Full CMS management" },
    { name: "settings:read", resource: "settings", action: "read", description: "View settings" },
    { name: "settings:update", resource: "settings", action: "update", description: "Update settings" },
    { name: "settings:manage", resource: "settings", action: "manage", description: "Full settings management" },
    { name: "analytics:read", resource: "analytics", action: "read", description: "View analytics" },
    { name: "analytics:manage", resource: "analytics", action: "manage", description: "Full analytics access" },
    { name: "ai:read", resource: "ai", action: "read", description: "View AI conversations" },
    { name: "ai:manage", resource: "ai", action: "manage", description: "Manage AI settings" },
  ];

  const createdPermissions = await Promise.all(
    permissions.map((p) =>
      prisma.permission.create({
        data: p,
      })
    )
  );

  console.log(`✅ Created ${createdPermissions.length} permissions`);

  // Create roles
  const superAdminRole = await prisma.role.create({
    data: {
      name: "SUPER_ADMIN",
      description: "Full system access",
      isSystem: true,
    },
  });

  const adminRole = await prisma.role.create({
    data: {
      name: "ADMIN",
      description: "Administrative access",
      isSystem: true,
    },
  });

  const warehouseRole = await prisma.role.create({
    data: {
      name: "WAREHOUSE",
      description: "Warehouse staff access",
      isSystem: true,
    },
  });

  const supportRole = await prisma.role.create({
    data: {
      name: "SUPPORT",
      description: "Customer support access",
      isSystem: true,
    },
  });

  const customerRole = await prisma.role.create({
    data: {
      name: "CUSTOMER",
      description: "Customer access",
      isSystem: true,
    },
  });

  console.log("✅ Created roles");

  // Assign permissions to roles
  // Super Admin gets all permissions
  await Promise.all(
    createdPermissions.map((p) =>
      prisma.rolePermission.create({
        data: {
          roleId: superAdminRole.id,
          permissionId: p.id,
        },
      })
    )
  );

  // Admin permissions
  const adminPermissionNames = [
    "products:manage", "categories:manage", "orders:manage",
    "users:read", "users:update", "reviews:manage", "inventory:manage",
    "payments:read", "payments:update", "support:manage", "cms:manage",
    "settings:read", "analytics:read", "ai:read",
  ];
  const adminPermissions = createdPermissions.filter((p) => adminPermissionNames.includes(p.name));
  await Promise.all(
    adminPermissions.map((p) =>
      prisma.rolePermission.create({
        data: {
          roleId: adminRole.id,
          permissionId: p.id,
        },
      })
    )
  );

  // Warehouse permissions
  const warehousePermissionNames = ["products:read", "orders:read", "orders:update", "inventory:manage"];
  const warehousePermissions = createdPermissions.filter((p) => warehousePermissionNames.includes(p.name));
  await Promise.all(
    warehousePermissions.map((p) =>
      prisma.rolePermission.create({
        data: {
          roleId: warehouseRole.id,
          permissionId: p.id,
        },
      })
    )
  );

  // Support permissions
  const supportPermissionNames = [
    "products:read", "orders:read", "orders:update", "users:read",
    "reviews:read", "reviews:update", "support:manage", "ai:read",
  ];
  const supportPermissions = createdPermissions.filter((p) => supportPermissionNames.includes(p.name));
  await Promise.all(
    supportPermissions.map((p) =>
      prisma.rolePermission.create({
        data: {
          roleId: supportRole.id,
          permissionId: p.id,
        },
      })
    )
  );

  // Customer permissions
  const customerPermissionNames = [
    "products:read", "categories:read", "orders:create", "orders:read",
    "reviews:create", "reviews:read", "support:create", "support:read",
  ];
  const customerPermissions = createdPermissions.filter((p) => customerPermissionNames.includes(p.name));
  await Promise.all(
    customerPermissions.map((p) =>
      prisma.rolePermission.create({
        data: {
          roleId: customerRole.id,
          permissionId: p.id,
        },
      })
    )
  );

  console.log("✅ Assigned permissions to roles");

  // Create users
  const passwordHash = await bcrypt.hash("Admin123!", 12);

  const superAdmin = await prisma.user.create({
    data: {
      email: "superadmin@intactghana.com",
      phone: "+233200000001",
      passwordHash,
      firstName: "Super",
      lastName: "Admin",
      roleId: superAdminRole.id,
      emailVerified: new Date(),
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: "admin@intactghana.com",
      phone: "+233200000002",
      passwordHash,
      firstName: "Admin",
      lastName: "User",
      roleId: adminRole.id,
      emailVerified: new Date(),
    },
  });

  const customer = await prisma.user.create({
    data: {
      email: "customer@example.com",
      phone: "+233200000003",
      passwordHash: await bcrypt.hash("Customer123!", 12),
      firstName: "John",
      lastName: "Doe",
      roleId: customerRole.id,
      emailVerified: new Date(),
    },
  });

  console.log("✅ Created users");

  // Create categories
  const laptopsCategory = await prisma.category.create({
    data: {
      name: "Laptops",
      slug: "laptops",
      description: "Laptops and notebooks for work, gaming, and everyday use",
      sortOrder: 1,
    },
  });

  const phonesCategory = await prisma.category.create({
    data: {
      name: "Phones",
      slug: "phones",
      description: "Smartphones and mobile devices",
      sortOrder: 2,
    },
  });

  const tabletsCategory = await prisma.category.create({
    data: {
      name: "Tablets",
      slug: "tablets",
      description: "Tablets and iPads",
      sortOrder: 3,
    },
  });

  const accessoriesCategory = await prisma.category.create({
    data: {
      name: "Accessories",
      slug: "accessories",
      description: "Tech accessories and peripherals",
      sortOrder: 4,
    },
  });

  const printersCategory = await prisma.category.create({
    data: {
      name: "Printers",
      slug: "printers",
      description: "Printers and scanners",
      sortOrder: 5,
    },
  });

  const networkingCategory = await prisma.category.create({
    data: {
      name: "Networking",
      slug: "networking",
      description: "Routers, switches, and networking equipment",
      sortOrder: 6,
    },
  });

  console.log("✅ Created categories");

  // Create attribute sets and attributes
  const laptopAttributeSet = await prisma.attributeSet.create({
    data: {
      name: "Laptop Attributes",
      description: "Attributes for laptop products",
    },
  });

  const phoneAttributeSet = await prisma.attributeSet.create({
    data: {
      name: "Phone Attributes",
      description: "Attributes for phone products",
    },
  });

  // Create attributes
  const attributes = await Promise.all([
    prisma.attribute.create({
      data: { name: "Processor", slug: "processor", type: "TEXT", isFilterable: true },
    }),
    prisma.attribute.create({
      data: { name: "RAM", slug: "ram", type: "SELECT", unit: "GB", isFilterable: true },
    }),
    prisma.attribute.create({
      data: { name: "Storage", slug: "storage", type: "SELECT", unit: "GB", isFilterable: true },
    }),
    prisma.attribute.create({
      data: { name: "Screen Size", slug: "screen-size", type: "NUMBER", unit: "inches", isFilterable: true },
    }),
    prisma.attribute.create({
      data: { name: "Battery", slug: "battery", type: "TEXT", isFilterable: false },
    }),
    prisma.attribute.create({
      data: { name: "Operating System", slug: "os", type: "SELECT", isFilterable: true },
    }),
    prisma.attribute.create({
      data: { name: "Color", slug: "color", type: "COLOR", isFilterable: true },
    }),
  ]);

  console.log("✅ Created attributes");

  // Link attributes to attribute sets
  await Promise.all(
    attributes.map((attr, index) =>
      prisma.attributeSetAttribute.create({
        data: {
          attributeSetId: laptopAttributeSet.id,
          attributeId: attr.id,
          sortOrder: index,
        },
      })
    )
  );

  // Link attribute set to category
  await prisma.categoryAttributeSet.create({
    data: {
      categoryId: laptopsCategory.id,
      attributeSetId: laptopAttributeSet.id,
    },
  });

  console.log("✅ Linked attributes to categories");

  // Create inventory location
  const mainWarehouse = await prisma.inventoryLocation.create({
    data: {
      name: "Main Warehouse",
      code: "MAIN-WH",
      address: "Accra, Ghana",
      isDefault: true,
    },
  });

  console.log("✅ Created inventory location");

  // Create sample products
  const laptop1 = await prisma.product.create({
    data: {
      sku: "LAP-HP-001",
      name: "HP Pavilion 15",
      slug: "hp-pavilion-15",
      shortDescription: "Powerful laptop for work and entertainment",
      description: "The HP Pavilion 15 is a versatile laptop perfect for everyday computing, featuring a stunning display and powerful performance.",
      brand: "HP",
      model: "Pavilion 15",
      warrantyMonths: 12,
      warrantyTerms: "1 year manufacturer warranty",
      categoryId: laptopsCategory.id,
      isFeatured: true,
      images: {
        create: [
          { url: "/images/products/hp-pavilion-15-1.jpg", alt: "HP Pavilion 15 Front", isPrimary: true, sortOrder: 0 },
          { url: "/images/products/hp-pavilion-15-2.jpg", alt: "HP Pavilion 15 Side", sortOrder: 1 },
        ],
      },
      variants: {
        create: [
          {
            sku: "LAP-HP-001-8-256",
            name: "8GB RAM / 256GB SSD",
            price: 4500,
            compareAtPrice: 5000,
            cost: 3800,
          },
          {
            sku: "LAP-HP-001-16-512",
            name: "16GB RAM / 512GB SSD",
            price: 5500,
            compareAtPrice: 6000,
            cost: 4600,
          },
        ],
      },
    },
    include: {
      variants: true,
    },
  });

  const laptop2 = await prisma.product.create({
    data: {
      sku: "LAP-DELL-001",
      name: "Dell Inspiron 14",
      slug: "dell-inspiron-14",
      shortDescription: "Compact and powerful laptop",
      description: "The Dell Inspiron 14 combines portability with performance, making it ideal for professionals on the go.",
      brand: "Dell",
      model: "Inspiron 14",
      warrantyMonths: 12,
      warrantyTerms: "1 year manufacturer warranty",
      categoryId: laptopsCategory.id,
      isFeatured: true,
      images: {
        create: [
          { url: "/images/products/dell-inspiron-14-1.jpg", alt: "Dell Inspiron 14 Front", isPrimary: true, sortOrder: 0 },
        ],
      },
      variants: {
        create: [
          {
            sku: "LAP-DELL-001-8-256",
            name: "8GB RAM / 256GB SSD",
            price: 4200,
            cost: 3500,
          },
        ],
      },
    },
    include: {
      variants: true,
    },
  });

  const phone1 = await prisma.product.create({
    data: {
      sku: "PHN-SAM-001",
      name: "Samsung Galaxy A54",
      slug: "samsung-galaxy-a54",
      shortDescription: "Premium mid-range smartphone",
      description: "The Samsung Galaxy A54 offers flagship features at an affordable price, with an amazing camera and long battery life.",
      brand: "Samsung",
      model: "Galaxy A54",
      warrantyMonths: 12,
      warrantyTerms: "1 year manufacturer warranty",
      categoryId: phonesCategory.id,
      isFeatured: true,
      images: {
        create: [
          { url: "/images/products/samsung-a54-1.jpg", alt: "Samsung Galaxy A54", isPrimary: true, sortOrder: 0 },
        ],
      },
      variants: {
        create: [
          {
            sku: "PHN-SAM-001-128",
            name: "128GB",
            price: 2800,
            compareAtPrice: 3200,
            cost: 2300,
          },
          {
            sku: "PHN-SAM-001-256",
            name: "256GB",
            price: 3200,
            cost: 2600,
          },
        ],
      },
    },
    include: {
      variants: true,
    },
  });

  console.log("✅ Created sample products");

  // Create stock levels
  await Promise.all([
    ...laptop1.variants.map((v) =>
      prisma.stockLevel.create({
        data: {
          variantId: v.id,
          locationId: mainWarehouse.id,
          quantity: 50,
          lowStockThreshold: 10,
        },
      })
    ),
    ...laptop2.variants.map((v) =>
      prisma.stockLevel.create({
        data: {
          variantId: v.id,
          locationId: mainWarehouse.id,
          quantity: 30,
          lowStockThreshold: 5,
        },
      })
    ),
    ...phone1.variants.map((v) =>
      prisma.stockLevel.create({
        data: {
          variantId: v.id,
          locationId: mainWarehouse.id,
          quantity: 100,
          lowStockThreshold: 20,
        },
      })
    ),
  ]);

  console.log("✅ Created stock levels");

  // Create delivery rules
  await Promise.all([
    prisma.deliveryRule.create({
      data: {
        region: "Greater Accra",
        baseFee: 20,
        freeAbove: 500,
        minDays: 1,
        maxDays: 2,
      },
    }),
    prisma.deliveryRule.create({
      data: {
        region: "Ashanti",
        baseFee: 40,
        freeAbove: 800,
        minDays: 2,
        maxDays: 4,
      },
    }),
    prisma.deliveryRule.create({
      data: {
        region: "Western",
        baseFee: 50,
        freeAbove: 1000,
        minDays: 3,
        maxDays: 5,
      },
    }),
    prisma.deliveryRule.create({
      data: {
        region: "Eastern",
        baseFee: 35,
        freeAbove: 700,
        minDays: 2,
        maxDays: 4,
      },
    }),
    prisma.deliveryRule.create({
      data: {
        region: "Central",
        baseFee: 35,
        freeAbove: 700,
        minDays: 2,
        maxDays: 4,
      },
    }),
    prisma.deliveryRule.create({
      data: {
        region: "Northern",
        baseFee: 70,
        freeAbove: 1500,
        minDays: 4,
        maxDays: 7,
      },
    }),
  ]);

  console.log("✅ Created delivery rules");

  // Create policies
  await Promise.all([
    prisma.policy.create({
      data: {
        name: "Delivery Policy",
        slug: "delivery-policy",
        type: "DELIVERY",
        summary: "Free delivery on orders above GHS 500 in Greater Accra",
        content: `
# Delivery Policy

## Delivery Areas
We deliver to all regions in Ghana.

## Delivery Times
- Greater Accra: 1-2 business days
- Other regions: 2-7 business days

## Delivery Fees
- Greater Accra: GHS 20 (Free above GHS 500)
- Other regions: GHS 35-70 depending on location

## Tracking
You will receive SMS updates on your order status.
        `.trim(),
      },
    }),
    prisma.policy.create({
      data: {
        name: "Return Policy",
        slug: "return-policy",
        type: "RETURN",
        summary: "7-day return policy for unopened items",
        content: `
# Return Policy

## Return Window
You may return unopened items within 7 days of delivery.

## Conditions
- Item must be in original packaging
- Item must be unused and undamaged
- Receipt or proof of purchase required

## Process
1. Contact our support team
2. Receive return authorization
3. Ship item back or drop off at our location
4. Refund processed within 5 business days
        `.trim(),
      },
    }),
    prisma.policy.create({
      data: {
        name: "Warranty Policy",
        slug: "warranty-policy",
        type: "WARRANTY",
        summary: "Manufacturer warranty on all products",
        content: `
# Warranty Policy

## Coverage
All products come with manufacturer warranty as specified on the product page.

## What's Covered
- Manufacturing defects
- Hardware failures under normal use

## What's Not Covered
- Physical damage
- Water damage
- Unauthorized modifications

## Claim Process
1. Contact our support team with your order number
2. Describe the issue
3. Our team will guide you through the warranty claim process
        `.trim(),
      },
    }),
  ]);

  console.log("✅ Created policies");

  // Create CMS pages
  await Promise.all([
    prisma.cMSPage.create({
      data: {
        title: "About Us",
        slug: "about",
        type: "PAGE",
        isPublished: true,
        publishedAt: new Date(),
        content: `
# About Intact Ghana

Intact Ghana is your trusted destination for quality electronics and technology products in Ghana.

## Our Mission
To provide Ghanaians with access to genuine, quality electronics at competitive prices with excellent customer service.

## Why Choose Us
- **Authentic Products**: All our products are 100% genuine
- **Warranty**: Full manufacturer warranty on all items
- **Support**: Dedicated customer support team
- **Fast Delivery**: Quick delivery across Ghana
        `.trim(),
      },
    }),
    prisma.cMSPage.create({
      data: {
        title: "Contact Us",
        slug: "contact",
        type: "PAGE",
        isPublished: true,
        publishedAt: new Date(),
        content: `
# Contact Us

## Get in Touch
- **Phone**: +233 XX XXX XXXX
- **Email**: support@intactghana.com
- **WhatsApp**: +233 XX XXX XXXX

## Business Hours
Monday - Friday: 9:00 AM - 6:00 PM
Saturday: 10:00 AM - 4:00 PM
Sunday: Closed

## Location
Accra, Ghana
        `.trim(),
      },
    }),
  ]);

  console.log("✅ Created CMS pages");

  console.log("\n🎉 Seed completed successfully!");
  console.log("\n📋 Test Accounts:");
  console.log("  Super Admin: superadmin@intactghana.com / Admin123!");
  console.log("  Admin: admin@intactghana.com / Admin123!");
  console.log("  Customer: customer@example.com / Customer123!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
