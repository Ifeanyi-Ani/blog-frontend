import * as React from 'react';
import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';

interface CodeSnippetProps {
  onSave: (content: string) => void;
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({ onSave }) => {
  const [language, setLanguage] = useState<string>('javascript');
  const [code, setCode] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLanguage(event.target.value);
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    onSave(`<pre><code class="language-${language}">${code}</code></pre>`);
  }, [language, code, onSave]);

  return (
    <div className="mb-4 w-full overflow-hidden rounded-md border">
      <div className="flex items-center justify-between bg-gray-100 p-2">
        <select
          className="rounded border bg-white px-2 py-1"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="ruby">Ruby</option>
        </select>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <div className="relative">
        <textarea
          value={code}
          onChange={handleCodeChange}
          className="w-full bg-gray-50 p-4 font-mono text-sm focus:outline-none"
          rows={10}
          placeholder="Enter your code here..."
        />
        <div className="pointer-events-none absolute inset-0">
          <SyntaxHighlighter
            language={language}
            style={tomorrow}
            customStyle={{
              margin: 0,
              padding: '1rem',
              background: 'transparent',
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};
