import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy, Download, RefreshCw, Trash2, Bold } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

export const MarkdownStripper = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [preserveBold, setPreserveBold] = useState(false);
  const { toast } = useToast();

  const stripMarkdown = (text: string, keepBold: boolean): string => {
    if (!text) return "";

    let result = text;

    // Preprocessing rules
    // 1. Ignore lines with pricing patterns ($ followed by numbers and "million")
    const pricingPattern = /^.*\$\d+.*million.*tokens.*$/gm;
    result = result.replace(pricingPattern, '');

    // 2. Convert numbered bullet points with bold formatting to plain text
    // Pattern: "1. **Text** rest of line" -> "1. Text rest of line"
    result = result.replace(/^(\s*\d+\.\s*)\*\*([^*]+)\*\*(.*)$/gm, '$1$2$3');
    result = result.replace(/^(\s*\d+\.\s*)__([^_]+)__(.*)$/gm, '$1$2$3');

    // 3. Replace em dash (—) with comma
    result = result.replace(/—/g, ',');

    // Special handling for ChatGPT-style bullet points and indentation
    // Preserve both markdown bullet points and Unicode bullets that might exist
    result = result.replace(/^(\s*)[-*+•](\s+)/gm, '$1•$2'); // Convert all bullets to bullet character
    result = result.replace(/^(\s*)\d+\.(\s+)/gm, '$1•$2'); // Convert numbered lists to bullet character
    
    // Handle code blocks first (prevent processing inside code blocks)
    const codeBlocks: string[] = [];
    result = result.replace(/```[\s\S]*?```/g, (match) => {
      const id = `__CODE_BLOCK_${codeBlocks.length}__`;
      codeBlocks.push(match.replace(/```/g, '').trim());
      return id;
    });

    // Handle bold syntax based on user preference
    if (!keepBold) {
      // Remove bold formatting completely if not preserving
      result = result.replace(/\*\*([^*]+)\*\*/g, '$1');
      result = result.replace(/__([^_]+)__/g, '$1');
    } else {
      // For better compatibility with text applications, use Unicode bold characters when possible
      // or keep the original markdown syntax for manual formatting
      result = result.replace(/\*\*([^*]+)\*\*/g, (match, content) => {
        // Try to convert to Unicode bold characters for basic ASCII
        const boldContent = content.split('').map((char: string) => {
          const code = char.charCodeAt(0);
          // Convert A-Z to bold
          if (code >= 65 && code <= 90) {
            return String.fromCharCode(code - 65 + 0x1D400 + 26);
          }
          // Convert a-z to bold
          if (code >= 97 && code <= 122) {
            return String.fromCharCode(code - 97 + 0x1D41A);
          }
          // Convert 0-9 to bold
          if (code >= 48 && code <= 57) {
            return String.fromCharCode(code - 48 + 0x1D7CE);
          }
          return char;
        }).join('');
        
        // If Unicode conversion resulted in different characters, use it; otherwise keep original
        return boldContent !== content ? boldContent : `**${content}**`;
      });
      
      result = result.replace(/__([^_]+)__/g, (match, content) => {
        // Try to convert to Unicode bold characters for basic ASCII
        const boldContent = content.split('').map((char: string) => {
          const code = char.charCodeAt(0);
          // Convert A-Z to bold
          if (code >= 65 && code <= 90) {
            return String.fromCharCode(code - 65 + 0x1D400 + 26);
          }
          // Convert a-z to bold
          if (code >= 97 && code <= 122) {
            return String.fromCharCode(code - 97 + 0x1D41A);
          }
          // Convert 0-9 to bold
          if (code >= 48 && code <= 57) {
            return String.fromCharCode(code - 48 + 0x1D7CE);
          }
          return char;
        }).join('');
        
        // If Unicode conversion resulted in different characters, use it; otherwise keep original
        return boldContent !== content ? boldContent : `__${content}__`;
      });
    }
    
    // Handle single * italic syntax (but not bullet points)
    result = result.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '$1');
    
    // Handle _ italic syntax (but not in the middle of words)
    result = result.replace(/(?<!\w)_([^_\n]+)_(?!\w)/g, '$1');
    
    // Handle ~~strikethrough~~
    result = result.replace(/~~([^~]+)~~/g, '$1');
    
    // Handle `inline code` - preserve exact content
    result = result.replace(/`([^`]+)`/g, '$1');
    
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
    
    // Restore code blocks
    codeBlocks.forEach((block, i) => {
      result = result.replace(`__CODE_BLOCK_${i}__`, block);
    });
    
    // Ensure proper spacing for bullet points and lines
    result = result.replace(/^•\s*/gm, '• ');
    
    // Clean up empty lines left by ignored pricing lines
    result = result.replace(/\n{3,}/g, '\n\n');
    
    return result;
  };

  const handleProcess = () => {
    const processed = stripMarkdown(input, preserveBold);
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

  const handleToggleBold = () => {
    setPreserveBold(!preserveBold);
    if (input.trim()) {
      // Re-process with new setting if there's input
      const processed = stripMarkdown(input, !preserveBold);
      setOutput(processed);
      toast({
        title: `Bold text ${!preserveBold ? 'preserved' : 'removed'}`,
        description: "Text has been re-processed with new settings.",
      });
    }
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

        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-2">
            <Switch 
              id="preserve-bold" 
              checked={preserveBold} 
              onCheckedChange={handleToggleBold}
              className="data-[state=checked]:bg-coral-500"
            />
            <label htmlFor="preserve-bold" className="text-sm font-medium text-gray-700 flex items-center">
              <Bold className="h-4 w-4 mr-1" />
              Preserve Bold Text
            </label>
          </div>
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
