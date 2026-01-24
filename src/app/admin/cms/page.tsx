import Link from "next/link";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Eye, FileText } from "lucide-react";

export default async function AdminCMSPage() {
  const pages = await db.cMSPage.findMany({
    orderBy: { updatedAt: "desc" },
  });

  const policies = await db.policy.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-muted-foreground">Manage pages and policies</p>
        </div>
        <Button asChild>
          <Link href="/admin/cms/pages/new">
            <Plus className="h-4 w-4 mr-2" /> New Page
          </Link>
        </Button>
      </div>

      {/* Pages */}
      <Card>
        <CardContent className="p-0">
          <div className="p-4 border-b">
            <h2 className="font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4" /> Pages
            </h2>
          </div>
          <div className="divide-y">
            {pages.map((page) => (
              <div key={page.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">{page.title}</p>
                  <p className="text-sm text-muted-foreground">/{page.slug}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={page.isPublished ? "default" : "secondary"}>
                    {page.isPublished ? "Published" : "Draft"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(page.updatedAt)}
                  </span>
                  <div className="flex gap-2">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/${page.slug}`} target="_blank">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/admin/cms/pages/${page.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {pages.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                No pages yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Policies */}
      <Card>
        <CardContent className="p-0">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold">Policies</h2>
            <Button asChild size="sm">
              <Link href="/admin/cms/policies/new">
                <Plus className="h-4 w-4 mr-2" /> New Policy
              </Link>
            </Button>
          </div>
          <div className="divide-y">
            {policies.map((policy) => (
              <div key={policy.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">{policy.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {policy.type} • /{policy.slug}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={policy.isActive ? "default" : "secondary"}>
                    {policy.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/cms/policies/${policy.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
            {policies.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                No policies yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
