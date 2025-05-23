
import { Shield, Zap, Target, Code, List, Bold } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "SMART DETECTION",
    description: "Intelligently identifies and removes markdown syntax while preserving text structure."
  },
  {
    icon: List,
    title: "BULLET PRESERVATION",
    description: "Keeps bullet points and numbered lists intact when converting from markdown to plain text."
  },
  {
    icon: Zap,
    title: "INSTANT PROCESSING",
    description: "Real-time processing with immediate results for efficient workflow."
  },
  {
    icon: Target,
    title: "PRECISION HANDLING",
    description: "Special logic for problematic patterns like ** bold syntax that cause issues in other tools."
  },
  {
    icon: Bold,
    title: "BOLD TOGGLE",
    description: "Choose whether to preserve or remove bold formatting based on your needs."
  }
];

export const Features = () => {
  return (
    <section className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-coral-600 mb-4">
            INTELLIGENT FEATURES
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our custom markdown processing engine handles edge cases that break other tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-coral-200 hover:border-coral-300 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-coral-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-coral-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 text-sm text-gray-500">
            <span>[ #ADVANCED ]</span>
            <span>PROCESSING ENGINE</span>
            <span>[ #RELIABLE ]</span>
          </div>
        </div>
      </div>
    </section>
  );
};
