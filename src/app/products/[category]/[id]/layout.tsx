import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Next JS Image Gallery Registration",
  description:
    "Register your details here. We will send an email with a nice image.",
};

//children (required) - During rendering, children will be populated with the route segments the layout is wrapping. These will primarily be the component of a child Layout (if it exists) or Page, but could also be other special files like Loading or Error when applicable.
//params (optional) - The dynamic route parameters object from the root segment down to that layout.
//Layouts do not receive searchParams - Unlike Pages, Layout components do not receive the searchParams prop. This is because a shared layout is not re-rendered during navigation which could lead to stale searchParams between navigations.

export default function ShopLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: {
    category: string;
    id: string;
  };
}) {
  return (
    <section>
      <p>{`${params.category} ${params.id}`}</p>
      {children}
    </section>
  );
}
