
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Clean Text from{" "}
            <span className="text-coral-600">Markdown</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Transform your markdown-formatted text into clean, readable content while preserving the essential formatting and structure you need.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button className="bg-coral-500 hover:bg-coral-600 text-white">
              Get started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="border-coral-200 text-coral-600 hover:bg-coral-50">
              Learn more
            </Button>
          </div>
          
          {/* Developer Credit */}
          <div className="mt-16 text-sm text-gray-500">
            Developed by{" "}
            <a 
              href="https://linkedin.com/in/gnkbhuvan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-coral-600 hover:text-coral-700 font-medium underline transition-colors"
            >
              Bhuvan Gnk
            </a>
          </div>

          {/* Feature highlights */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-lg border border-coral-100">
              <FileText className="h-8 w-8 text-coral-500 mb-3" />
              <h3 className="font-semibold text-gray-900">Smart Processing</h3>
              <p className="text-sm text-gray-600 text-center mt-2">
                Intelligently removes markdown syntax while preserving your content structure
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-lg border border-coral-100">
              <Zap className="h-8 w-8 text-coral-500 mb-3" />
              <h3 className="font-semibold text-gray-900">Instant Results</h3>
              <p className="text-sm text-gray-600 text-center mt-2">
                Process your text in real-time with immediate preview and copy functionality
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-lg border border-coral-100">
              <FileText className="h-8 w-8 text-coral-500 mb-3" />
              <h3 className="font-semibold text-gray-900">Format Friendly</h3>
              <p className="text-sm text-gray-600 text-center mt-2">
                Perfect for emails, documents, and any platform that needs clean text
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
