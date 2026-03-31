import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-6 max-w-md px-4">
        <h1 className="text-8xl font-display font-bold text-primary text-glow">404</h1>
        <h2 className="text-2xl font-bold">Signal Lost</h2>
        <p className="text-muted-foreground">
          The page you are looking for has been disconnected or does not exist.
        </p>
        <div className="pt-4">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              Return to Calculator
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
