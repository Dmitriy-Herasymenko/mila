import type { ReactNode } from "react";
import { inter } from "../fonts";
import "../globals.css";

export const metadata = {
  title: "Admin — Mila Patramanska",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body style={{ backgroundColor: "var(--color-midnight-cocoa)" }}>{children}</body>
    </html>
  );
}
