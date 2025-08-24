import Link from "next/link";
import Button from "@/components/ui/Button";

export default function CallToAction() {
  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Ready to Get Started?
      </h3>
      <p className="text-gray-600 mb-6">
        Access the admin dashboard to create your first feedback question.
      </p>
      <Button variant="primary" size="lg">
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>
    </div>
  );
}
