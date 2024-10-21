import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  language: string | undefined;
  children: string | string[];
}
export function CodeBlock({ language, children }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children as string);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={copyToClipboard}
        className="absolute right-2 top-2 rounded bg-primary/10 p-1 text-primary hover:bg-primary/20"
        aria-label="Copy code"
      >
        {isCopied ? <Check size={18} /> : <Copy size={18} />}
      </button>
      <SyntaxHighlighter
        style={dracula}
        language={language as string}
        PreTag="div"
        className="!mb-0 !mt-0 bg-primary text-lg"
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
