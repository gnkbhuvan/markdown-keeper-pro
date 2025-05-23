
import { MarkdownStripper } from "@/components/MarkdownStripper";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-coral-50 to-orange-50">
      <div className="relative overflow-hidden">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(to right, #e07a5f 1px, transparent 1px),
              linear-gradient(to bottom, #e07a5f 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        <Hero />
        <MarkdownStripper />
        <Features />
      </div>
    </div>
  );
};

export default Index;
