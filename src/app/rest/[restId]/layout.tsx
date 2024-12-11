import { MenuDataProvider } from "@/context/menu.context";
import { NotificationProvider } from "@/providers/order_complete";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" min-h-screen ">
      <MenuDataProvider>
      <NotificationProvider>

        {children}
        </NotificationProvider>
        </MenuDataProvider>
    </div>
  );
}
