import { ReactNode } from "react";

export const DrawerCSSProvider = ({ children }: { children: ReactNode }) => {
  return (
    <div vaul-drawer-wrapper="" className="h-full">
      <div className="relative flex h-full min-h-screen flex-col bg-background">
        {children}
      </div>
    </div>
  );
};
