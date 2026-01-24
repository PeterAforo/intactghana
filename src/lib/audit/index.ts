import { db } from "@/lib/db";
import { headers } from "next/headers";

export interface AuditLogInput {
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  oldData?: Record<string, unknown>;
  newData?: Record<string, unknown>;
}

export async function createAuditLog(input: AuditLogInput): Promise<void> {
  const headersList = await headers();
  const ipAddress = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
  const userAgent = headersList.get("user-agent") || "unknown";

  await db.auditLog.create({
    data: {
      userId: input.userId,
      action: input.action,
      resource: input.resource,
      resourceId: input.resourceId,
      oldData: input.oldData ? JSON.parse(JSON.stringify(input.oldData)) : null,
      newData: input.newData ? JSON.parse(JSON.stringify(input.newData)) : null,
      ipAddress,
      userAgent,
    },
  });
}

export async function getAuditLogs(options: {
  userId?: string;
  resource?: string;
  resourceId?: string;
  limit?: number;
  offset?: number;
}) {
  const { userId, resource, resourceId, limit = 50, offset = 0 } = options;

  const where: Record<string, unknown> = {};
  if (userId) where.userId = userId;
  if (resource) where.resource = resource;
  if (resourceId) where.resourceId = resourceId;

  const [logs, total] = await Promise.all([
    db.auditLog.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    }),
    db.auditLog.count({ where }),
  ]);

  return { logs, total };
}
