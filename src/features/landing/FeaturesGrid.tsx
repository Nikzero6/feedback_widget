import { CheckIcon, DocumentIcon, ChartIcon } from "@/components/icons";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: <CheckIcon className="w-6 h-6 text-indigo-600" />,
    title: "Easy Integration",
    description:
      "Add to any website with a simple script tag. No complex setup required.",
  },
  {
    icon: <DocumentIcon className="w-6 h-6 text-purple-600" />,
    title: "Dynamic Questions",
    description:
      "Create and manage questions in real-time through our admin dashboard.",
  },
  {
    icon: <ChartIcon className="w-6 h-6 text-green-600" />,
    title: "Real-time Analytics",
    description:
      "View responses instantly with detailed metadata and insights.",
  },
];

export default function FeaturesGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      {features.map((feature) => (
        <FeatureCard
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
}
