"use client";

import { useSearchParams } from "next/navigation";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/";

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h1>Create your account</h1>
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        redirectUrl={redirectUrl} // redirect after signup, can be dynamic
      />
    </div>
  );
}
