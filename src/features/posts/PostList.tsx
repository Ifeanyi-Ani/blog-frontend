import * as React from 'react';
import { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { SortDirection, SortableHeader } from '../../ui/shared/SortableHeader';
import PostItem from '../../ui/shared/PostItem';
import { IPost } from '../../types/type';

type PostSortField = 'createdAt' | 'title';

interface PostListProps {
  posts: IPost[];
}

const sortOptions: Array<{ field: PostSortField; label: string }> = [
  { field: 'title', label: 'Sort by Title' },
  { field: 'createdAt', label: 'Sort by Date' },
];

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const [sortField, setSortField] = useState<PostSortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filterTag, setFilterTag] = useState('');

  const sortedAndFilteredPosts = useMemo(() => {
    try {
      const filteredPosts = filterTag
        ? posts.filter((post) =>
            post.tags?.some((tag) =>
              tag.text?.toLowerCase().includes(filterTag.toLowerCase())
            )
          )
        : posts;

      return [...filteredPosts].sort((a, b) => {
        if (sortField === 'createdAt') {
          const dateA = new Date(a.createdAt as string).getTime();
          const dateB = new Date(b.createdAt as string).getTime();
          return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        } else if (sortField === 'title') {
          return sortDirection === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        }
        return 0;
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : String(err));
      return posts;
    }
  }, [posts, sortField, sortDirection, filterTag]);

  const handleSort = (field: PostSortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterTag(e.target.value);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="sticky top-20 mb-8 flex flex-col z-1000 items-start justify-between space-y-4 bg-background py-12 sm:flex-row sm:items-center sm:space-y-0">
        <div className="flex items-center space-x-2 rounded-md border border-input bg-background p-2 shadow-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Filter by tag"
            value={filterTag}
            onChange={handleFilterChange}
            className="bg-transparent text-sm text-foreground placeholder-muted-foreground focus:outline-none"
          />
        </div>
        <SortableHeader
          sortOptions={sortOptions}
          currentSortField={sortField}
          currentSortDirection={sortDirection}
          onSort={handleSort}
        />
      </div>
      <div className="flex-grow overflow-y-auto">
        <div className="space-y-6 p-4">
          {sortedAndFilteredPosts?.map((post) => (
            <PostItem post={post} key={post._id} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default PostList;
