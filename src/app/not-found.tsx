"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6 px-4">
      <div className="text-center space-y-4">
        {/* 404 Number */}
        <div className="text-8xl font-bold text-primary opacity-20">404</div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-foreground">Page Not Found</h1>

        <p className="text-lg text-muted-foreground max-w-md">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved, deleted, or doesn't exist.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground font-medium transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <Home size={18} />
          Go Home
        </Link>

        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-foreground font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>

      {/* Additional Help */}
      <div className="text-center text-sm text-muted-foreground">
        <p>
          Need help? Check out our{" "}
          <Link href="/" className="text-primary hover:underline">
            dashboard
          </Link>{" "}
          or{" "}
          <Link href="/" className="text-primary hover:underline">
            contact support
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
