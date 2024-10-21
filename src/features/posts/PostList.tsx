import { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

import { SortDirection, SortableHeader } from '../../ui/shared/SortableHeader';
import PostItem from '../../ui/shared/PostItem';
import { IPost } from '../../types/type';

const PostList = ({ posts }: { posts: IPost[] }) => {
  const [sortField, setSortField] = useState<'createdAt' | 'title'>(
    'createdAt'
  );
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filterTag, setFilterTag] = useState('');

  const sortedAndFilteredPosts = useMemo(() => {
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
  }, [posts, sortField, sortDirection, filterTag]);

  const handleSort = (field: 'createdAt' | 'title') => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="relative flex flex-col">
      <div className="sticky top-20 z-40 bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex justify-between px-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
          <div className="flex items-center space-x-2 rounded-md border border-input bg-background p-2 shadow-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Filter by tag"
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
              className="bg-transparent text-sm text-foreground placeholder-muted-foreground focus:outline-none"
            />
          </div>
          <SortableHeader
            sortOptions={[
              { field: 'title', label: 'Sort by Title' },
              { field: 'createdAt', label: 'Sort by Date' },
            ]}
            currentSortField={sortField}
            currentSortDirection={sortDirection}
            onSort={handleSort}
          />
        </div>
      </div>
      <div className="">
        <AnimatePresence>
          <div className="space-y-6 p-4">
            {sortedAndFilteredPosts?.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};
export default PostList;
