
import { FileText, Zap, List } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-coral-100 text-coral-800 px-4 py-2 rounded-full text-sm font-medium">
                <Zap className="w-4 h-4" />
                INTELLIGENT PROCESSING
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-coral-600 leading-tight">
                MARKDOWN
                <br />
                <span className="text-coral-500">STRIPPER</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-md">
                Remove markdown formatting while preserving text structure, indentation, and bullet points perfectly - especially for ChatGPT content.
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>[ #PRESERVE ]</span>
              <span>FORMATTING</span>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute top-4 right-4 w-16 h-16 bg-coral-400 rounded-full opacity-60" />
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-coral-200">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-coral-500" />
                <span className="font-semibold text-gray-700">Smart Processing</span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="text-gray-600">✓ Removes markdown formatting</div>
                <div className="text-gray-600">✓ Preserves indentation</div>
                <div className="text-gray-600">✓ Maintains bullet points</div>
                <div className="text-gray-600">✓ Keeps line breaks</div>
                <div className="text-gray-600">✓ Works with copied ChatGPT content</div>
                <div className="text-gray-600">✓ Perfect for Gmail & Google Chat</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
