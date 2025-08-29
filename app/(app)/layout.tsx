import { Navigation } from "@/components/molecules/navigation";
import { HeartHandshake } from "lucide-react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex min-h-svh flex-col p-3 md:p-6 gap-6 max-w-5xl w-full mx-auto">
        <div className="flex gap-3 items-center justify-between w-full md:px-6">
          <div className="flex gap-3 items-center">
            <HeartHandshake size={50} className="stroke-red-700" />
            <h1 className="text-4xl font-bold hidden md:block">Cześć!</h1>
          </div>
          <Navigation />
        </div>
        <section className="p-6 bg-background rounded-3xl flex-1">
          {children}
        </section>
      </div>
    </>
  );
}
