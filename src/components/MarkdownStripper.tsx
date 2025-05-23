
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy, Download, RefreshCw, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const MarkdownStripper = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const stripMarkdown = (text: string): string => {
    if (!text) return "";

    let result = text;

    // First preserve bullet points by replacing them with special markers
    // Handle various types of bullet points (*, -, +) and numbered lists
    result = result.replace(/^(\s*)[*\-+](\s+)/gm, '$1•$2'); // Convert markdown bullets to bullet character
    result = result.replace(/^(\s*)\d+\.(\s+)/gm, '$1•$2'); // Convert numbered lists to bullet character

    // Handle ** bold syntax with careful regex to avoid issues
    // This handles **text** while preserving standalone asterisks
    result = result.replace(/\*\*([^*]+)\*\*/g, '$1');
    
    // Handle single * italic syntax
    result = result.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '$1');
    
    // Handle __ bold syntax
    result = result.replace(/__([^_]+)__/g, '$1');
    
    // Handle _ italic syntax (but not in the middle of words)
    result = result.replace(/(?<!\w)_([^_\n]+)_(?!\w)/g, '$1');
    
    // Handle ~~strikethrough~~
    result = result.replace(/~~([^~]+)~~/g, '$1');
    
    // Handle `inline code`
    result = result.replace(/`([^`]+)`/g, '$1');
    
    // Handle ```code blocks``` but preserve line structure
    result = result.replace(/```[\s\S]*?```/g, (match) => {
      return match.replace(/```/g, '').trim();
    });
    
    // Handle [link text](url)
    result = result.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    
    // Handle ![alt text](image url)
    result = result.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1');
    
    // Handle headers (# ## ###) but preserve the text and line breaks
    result = result.replace(/^#{1,6}\s+(.+)$/gm, '$1');
    
    // Handle horizontal rules
    result = result.replace(/^(-{3,}|\*{3,}|_{3,})$/gm, '');
    
    // Handle > blockquotes but preserve indentation
    result = result.replace(/^>\s*/gm, '');
    
    // Clean up excessive line breaks but preserve intentional spacing
    result = result.replace(/\n{3,}/g, '\n\n');
    
    return result;
  };

  const handleProcess = () => {
    const processed = stripMarkdown(input);
    setOutput(processed);
    toast({
      title: "Processed successfully",
      description: "Markdown has been stripped while preserving formatting.",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied to clipboard",
      description: "The processed text has been copied.",
    });
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stripped-text.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Download started",
      description: "Your file is being downloaded.",
    });
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    toast({
      title: "Cleared",
      description: "All text has been cleared.",
    });
  };

  return (
    <section className="px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            PROCESS YOUR TEXT
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Paste your markdown text below and our intelligent processor will remove all markdown syntax while preserving your formatting structure.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-coral-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Input</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClear}
                className="text-coral-600 border-coral-200 hover:bg-coral-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your markdown text here..."
              className="min-h-[400px] font-mono text-sm border-coral-200 focus:border-coral-400 focus:ring-coral-400"
            />
            <Button
              onClick={handleProcess}
              className="w-full mt-4 bg-coral-500 hover:bg-coral-600 text-white"
              disabled={!input.trim()}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Process Text
            </Button>
          </Card>

          {/* Output Section */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-coral-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Output</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  disabled={!output}
                  className="text-coral-600 border-coral-200 hover:bg-coral-50"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  disabled={!output}
                  className="text-coral-600 border-coral-200 hover:bg-coral-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            <Textarea
              value={output}
              readOnly
              placeholder="Processed text will appear here..."
              className="min-h-[400px] font-mono text-sm bg-gray-50 border-coral-200"
            />
            {output && (
              <div className="mt-4 text-sm text-gray-600">
                Characters: {output.length} | Lines: {output.split('\n').length}
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};
