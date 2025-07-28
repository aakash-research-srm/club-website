import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Details | ARL",
  description: "Detailed information about our events and workshops",
};

export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
