import { db } from "@/lib/db";
import { Resource, Action } from "./permissions";

export async function hasPermission(
  userId: string,
  resource: Resource,
  action: Action
): Promise<boolean> {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      role: {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  if (!user) return false;

  const userPermissions = user.role.permissions.map(
    (rp) => `${rp.permission.resource}:${rp.permission.action}`
  );

  // Check for exact permission or manage permission
  const requiredPermission = `${resource}:${action}`;
  const managePermission = `${resource}:manage`;

  return (
    userPermissions.includes(requiredPermission) ||
    userPermissions.includes(managePermission)
  );
}

export async function getUserPermissions(userId: string): Promise<string[]> {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      role: {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  if (!user) return [];

  return user.role.permissions.map(
    (rp) => `${rp.permission.resource}:${rp.permission.action}`
  );
}

export function checkPermissionSync(
  userPermissions: string[],
  resource: Resource,
  action: Action
): boolean {
  const requiredPermission = `${resource}:${action}`;
  const managePermission = `${resource}:manage`;

  return (
    userPermissions.includes(requiredPermission) ||
    userPermissions.includes(managePermission)
  );
}
