import { Navigation } from "@/components/molecules/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex items-center justify-center">
        <Navigation />
      </div>
      {children}
    </>
  );
}
