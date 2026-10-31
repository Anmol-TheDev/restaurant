import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/adminSidebar";
import { getDashboardData } from "@/query/query.dashboard";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "RestoManager",
  description: "Restaurant Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { restaurant } = getDashboardData()

  return (
    <html lang="en">
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased`}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-14 items-center gap-3 border-b px-4">
              <SidebarTrigger className="-ml-1 shrink-0" />

              <div className="h-5 w-px bg-border shrink-0" />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-none truncate">{restaurant.name}</p>
                <p className="text-xs text-muted-foreground leading-none mt-0.5 truncate">{restaurant.tagline}</p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium leading-none">Restaurant Manager</p>
                  <p className="text-xs text-muted-foreground leading-none mt-0.5">admin@resto.com</p>
                </div>
                <div className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                  RM
                </div>
              </div>
            </header>

            <main className="flex-1 p-4">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}