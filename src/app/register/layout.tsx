import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next JS Image Gallery Registration",
  description: "Register your details here. We will send an email with a nice image.",
};

//this is a layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
