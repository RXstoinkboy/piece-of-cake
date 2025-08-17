import { ReactNode } from "react";

export default function RecipesLayout({
  children,
  modals,
}: {
  children: ReactNode;
  modals: ReactNode;
}) {
  return (
    <>
      {children}
      {modals}
    </>
  );
}
