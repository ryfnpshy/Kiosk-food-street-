import { notFound } from "next/navigation";
import { tenants, menus } from "@/src/lib/data";
import TenantPageClient from "./TenantPageClient";

interface TenantPageProps {
  params: Promise<{ id: string }>;
}

export default async function TenantPage({ params }: TenantPageProps) {
  const { id } = await params;
  const tenant = tenants.find((t) => t.id === id);
  const tenantMenus = menus.filter((m) => m.tenantId === id);

  if (!tenant) {
    notFound();
  }

  return <TenantPageClient tenant={tenant} tenantMenus={tenantMenus} />;
}
