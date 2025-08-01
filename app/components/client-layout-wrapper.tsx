"use client";

import { ReactNode, useEffect } from "react";
import { useCartStore } from "@/lib/store";
import { useUser } from "@clerk/nextjs";

export function ClientLayoutWrapper({ children }: { children: ReactNode }) {
  const loadCart = useCartStore((state) => state.loadCart);
  const { isSignedIn } = useUser();

  useEffect(() => {
    // Load cart depending on sign-in status (merge guest cart if needed)
    loadCart(!!isSignedIn);
  }, [isSignedIn, loadCart]);

  return <>{children}</>;
}
