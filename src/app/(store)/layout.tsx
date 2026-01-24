import { StoreHeader } from "@/components/store/header";
import { StoreFooter } from "@/components/store/footer";
import { AIChat } from "@/components/store/ai-chat";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <StoreHeader />
      <main className="flex-1">{children}</main>
      <StoreFooter />
      <AIChat />
    </div>
  );
}
