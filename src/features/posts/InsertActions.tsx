import { useState } from 'react';
import {
  Code,
  ImageIcon,
  Bold,
  Italic,
  Underline,
  List,
  Loader2,
} from 'lucide-react';
import { Button } from '@headlessui/react';

import { FormatState } from '../../types/type';
import { cn } from '../../lib/utils';

interface InsertActionsProps {
  isUploading: boolean;
  fileInputRef: React.RefObject<HTMLDivElement>;
  mediumEditorRef: React.RefObject<MediumEditor.MediumEditor | null>;
}

export const InsertActions = ({
  isUploading,
  fileInputRef,
  mediumEditorRef,
}: InsertActionsProps) => {
  const [formatState, setFormatState] = useState<FormatState>({
    bold: false,
    italic: false,
    underline: false,
    list: false,
  });

  const updateFormatState = () => {
    if (mediumEditorRef.current) {
      setFormatState({
        bold: mediumEditorRef.current.queryCommandState('bold'),
        italic: mediumEditorRef.current.queryCommandState('italic'),
        underline: mediumEditorRef.current.queryCommandState('underline'),
        list: mediumEditorRef.current.queryCommandState('insertUnorderedList'),
      });
    }
  };

  const formatText = (command: string) => {
    if (mediumEditorRef.current) {
      mediumEditorRef.current.execAction(command);
      updateFormatState();
    }
  };

  return (
    <>
      <div
        className={cn(
          'sticky top-20 z-40 ml-auto rounded-full bg-background/95 p-2 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60'
        )}
      >
        <div id="tool" className="flex gap-2">
          <Button
            onClick={() => formatText('bold')}
            className={cn(
              'p-1',
              formatState.bold &&
                'rounded-md bg-primary [&>*]:text-primary-foreground'
            )}
          >
            <Bold size={20} className="text-primary opacity-60" />
          </Button>
          <Button
            onClick={() => formatText('italic')}
            className={cn(
              'p-1',
              formatState.italic &&
                'rounded-md bg-primary [&>*]:text-primary-foreground'
            )}
          >
            <Italic size={20} className="text-primary opacity-60" />
          </Button>
          <Button
            onClick={() => formatText('underline')}
            className={cn(
              'p-1',
              formatState.underline &&
                'rounded-md bg-primary [&>*]:text-primary-foreground'
            )}
          >
            <Underline size={20} className="text-primary opacity-60" />
          </Button>
          <Button
            onClick={() => formatText('insertUnorderedList')}
            className={cn(
              'p-1',
              formatState.list &&
                'rounded-md bg-primary [&>*]:text-primary-foreground'
            )}
          >
            <List size={20} className="text-primary opacity-60" />
          </Button>
          <Button>
            <Code size={20} className="text-primary opacity-60" />
          </Button>
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2
                size={20}
                className="animate-spin text-primary opacity-60"
              />
            ) : (
              <ImageIcon size={20} className="text-primary opacity-60" />
            )}
          </Button>
        </div>
      </div>
    </>
  );
};
