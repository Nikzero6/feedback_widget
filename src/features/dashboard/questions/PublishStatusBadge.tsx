import { cn } from "@/lib/utils";

interface PublishStatusBadgeProps {
  published: boolean;
}

export default function PublishStatusBadge({
  published,
}: PublishStatusBadgeProps) {
  return (
    <span
      className={cn(
        "px-2 py-1 text-xs font-medium rounded-full",
        published
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800"
      )}
    >
      {published ? "Published" : "Draft"}
    </span>
  );
}
