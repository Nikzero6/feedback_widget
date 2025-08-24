import { Header, Button } from "@/components/ui";
import Link from "next/link";
import { FeaturesGrid, HeroSection, CallToAction } from "@/features/landing";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Header */}
      <Header
        title="Dynamic Feedback Widget"
        actions={
          <Button variant="primary">
            <Link href="/dashboard">Admin Dashboard</Link>
          </Button>
        }
      />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <FeaturesGrid />
        <CallToAction />
      </main>
    </div>
  );
}
