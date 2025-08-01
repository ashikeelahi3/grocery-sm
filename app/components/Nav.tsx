import Link from "next/link";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur border-b border-blue-100 shadow-sm">
      <div className="flex gap-6">
        <Link href="/" className="hover:text-blue-600 font-semibold transition">Home</Link>
        <Link href="/cart" className="hover:text-blue-600 font-semibold transition">Cart</Link>
        <Link href="/orders" className="hover:text-blue-600 font-semibold transition">Order History</Link>
        <Link href="/admin" className="hover:text-blue-600 font-semibold transition">Admin</Link>
      </div>
      <div>
        <SignedOut>
          <div className="space-x-4">
            <SignInButton>
              <span className="cursor-pointer">Sign In</span>
            </SignInButton>
            <SignUpButton>
              <span className="cursor-pointer">Sign Up</span>
            </SignUpButton>
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
