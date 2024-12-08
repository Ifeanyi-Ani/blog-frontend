import * as React from 'react';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Input } from '@headlessui/react';
import MediumEditor from 'medium-editor';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';

import { useCreatePostMutation } from './postSlice';
import { cn } from '../../lib/utils';
import { InsertActions } from './InsertActions';
import ImageUpload from '../../utils/image-upload';
import { SubmitBtn } from '../../ui/shared/SubmitBtn';

const createPostSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be 100 characters or less'),
  content: z.string().min(3, 'Content must be at least 3 characters long'),
  tags: z.string().optional(),
});

type CreatePostFormData = z.infer<typeof createPostSchema>;

export const CreatePostForm = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const editorWrapperRef = useRef<HTMLDivElement>(null);
  const mediumEditorRef = useRef<MediumEditor.MediumEditor | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [buttonPosition, setButtonPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const [createPost, { isLoading }] = useCreatePostMutation();

  const { register, handleSubmit, setValue } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: '',
    },
  });

  const getCaretPosition = () => {
    let left = 0;
    let top = 0;

    const isSupported = typeof window.getSelection !== 'undefined';

    if (isSupported) {
      const selection = window.getSelection() as Selection;
      if (selection?.rangeCount > 0) {
        const range = selection.getRangeAt(0).cloneRange();
        const rect = range.getClientRects()[0];
        if (rect) {
          left = rect.left + window.screenX;
          top = rect.top + window.scrollY;
        }
      }
    }

    return { left, top };
  };

  const insertImage = (imageUrl: string) => {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Uploaded image';
    img.className = 'max-w-full h-auto my-4';

    const wrapper = document.createElement('div');
    wrapper.className = 'relative inline-block';
    wrapper.appendChild(img);

    const removeButton = document.createElement('button');
    removeButton.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    removeButton.className =
      'absolute top-2 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors';
    removeButton.onclick = (e) => {
      e.preventDefault();
      wrapper.remove();
      updateContent();
    };
    wrapper.appendChild(removeButton);

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.insertNode(wrapper);
      range.setStartAfter(wrapper);
      range.setEndAfter(wrapper);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      contentRef.current?.appendChild(wrapper);
    }

    contentRef.current?.focus();
    updateContent();
  };

  const updateContent = () => {
    if (contentRef.current) {
      setValue('content', contentRef.current.innerHTML);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      ImageUpload.handleImageUpload(file, insertImage, setIsUploading);
    }
  };

  const onSubmit = async (data: CreatePostFormData) => {
    try {
      const tagsArray = data.tags
        ? data.tags.split(',').map((tag) => ({ text: tag.trim() }))
        : [];

      await createPost({ ...data, tags: tagsArray }).unwrap();
      toast.success('Post created successfully!');
      navigate('/');
    } catch (err) {
      console.error('Failed to create the post:', err);
      toast.error('Failed to create the post. Please try again.');
    }
  };

  const updateButtonPosition = useCallback(() => {
    const { top } = getCaretPosition();
    setButtonPosition({ top: top - 50, left: 20 });
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      mediumEditorRef.current = new MediumEditor(contentRef.current, {
        placeholder: {
          text: 'write your story...',
          hideOnClick: false,
        },
        toolbar: false,
        paste: {
          cleanPastedHTML: true,
          cleanReplacements: [],
          cleanAttrs: ['class', 'style', 'dir'],
          cleanTags: ['meta'],
        },
        anchorPreview: false,
        autoLink: true,
      });

      const editor = mediumEditorRef.current;

      editor?.subscribe('editableInput', () => {
        updateButtonPosition();
      });

      editor?.subscribe('focus', () => {
        updateButtonPosition();
      });
    }

    return () => {
      if (mediumEditorRef.current) {
        mediumEditorRef.current.destroy();
      }
    };
  }, [updateButtonPosition]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        if (
          document.activeElement === contentRef.current &&
          contentRef.current?.textContent === ''
        ) {
          e.preventDefault();
          titleRef.current?.focus();
        }
        if (
          document.activeElement === titleRef.current &&
          titleRef.current?.textContent === ''
        ) {
          e.preventDefault();
        }
      }

      if (e.key === 'Enter' && document.activeElement === titleRef.current) {
        e.preventDefault();
        contentRef.current?.focus();
      }
    };

    document.addEventListener('input', updateButtonPosition);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('input', updateButtonPosition);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [updateButtonPosition]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-lg">
      <div className="flex h-full flex-col space-y-2">
        <InsertActions
          isUploading={isUploading}
          fileInputRef={fileInputRef}
          mediumEditorRef={mediumEditorRef}
        />

        <div
          ref={editorWrapperRef}
          className={cn(
            'editor-wrapper flex w-full flex-grow flex-col whitespace-pre-line rounded-md bg-secondary p-5 shadow-md outline-none focus:outline-none',
            isDragging && 'border-2 border-dashed border-primary'
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <h1
            contentEditable
            suppressContentEditableWarning
            className={cn(
              'prose mb-2 outline-none empty:before:text-muted-foreground/70 empty:before:content-[attr(data-title-placeholder)]',
              titleRef.current &&
                titleRef.current?.textContent == '' &&
                'empty:before:content-[attr(data-title-placeholder)]'
            )}
            data-title-placeholder="Title"
            onInput={(e) =>
              setValue('title', e.currentTarget.textContent || '')
            }
            {...register('title')}
            ref={titleRef}
          />
          <p
            contentEditable
            suppressContentEditableWarning
            className="prose flex-grow cursor-text overflow-y-auto whitespace-normal outline-none empty:before:content-none [&>*]:my-2"
            onInput={updateContent}
            {...register('content')}
            ref={contentRef}
          />
          <Input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file)
                ImageUpload.handleImageUpload(
                  file,
                  insertImage,
                  setIsUploading
                );
            }}
          />
          {isDragging && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <p className="text-lg font-semibold text-primary">
                Drop your image here
              </p>
            </div>
          )}
        </div>
        <SubmitBtn
          className="ml-auto w-fit"
          type="submit"
          isLoading={isLoading}
          btnText="Post"
        />
      </div>
    </form>
  );
};
