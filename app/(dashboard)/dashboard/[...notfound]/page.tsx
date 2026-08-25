// app/(dashboard)/dashboard/[...notfound]/page.tsx
import { notFound } from "next/navigation";

export default function DashboardCatchAll() {
  // This explicitly triggers the nearest not-found.tsx file
  notFound(); 
}
