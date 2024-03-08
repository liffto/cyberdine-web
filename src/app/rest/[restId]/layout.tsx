import { MenuDataProvider } from "@/context/menu.context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" min-h-screen ">
      <MenuDataProvider>{children}</MenuDataProvider>
    </div>
  );
}
