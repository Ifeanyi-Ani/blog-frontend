import React, { useState, useMemo } from "react";
import { Filter } from "lucide-react";
import { toast } from "react-hot-toast";
import { SortDirection, SortableHeader } from "../../ui/shared/SortableHeader";
import PostItem from "../../ui/shared/PostItem";
import { IPost } from "../../types/type";

type PostSortField = "createdAt" | "title";

interface PostListProps {
  posts: IPost[];
}

const sortOptions: Array<{ field: PostSortField; label: string }> = [
  { field: "title", label: "Sort by Title" },
  { field: "createdAt", label: "Sort by Date" },
];

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const [sortField, setSortField] = useState<PostSortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [filterTag, setFilterTag] = useState("");

  const sortedAndFilteredPosts = useMemo(() => {
    try {
      let filteredPosts = filterTag
        ? posts.filter((post) =>
            post.tags.some((tag) =>
              tag.text.toLowerCase().includes(filterTag.toLowerCase())
            )
          )
        : posts;

      return [...filteredPosts].sort((a, b) => {
        if (sortField === "createdAt") {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
        } else if (sortField === "title") {
          return sortDirection === "asc"
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
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterTag(e.target.value);
  };

  return (
    <>
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2 bg-customBlue-800 rounded-full p-2 border border-electricCyan-700 shadow-lg shadow-electricCyan-900/20 focus-within:ring-2 focus-within:ring-neonPink-500 focus-within:border-transparent">
          <Filter className="text-electricCyan-400 " />
          <input
            type="text"
            placeholder="Filter by tag"
            value={filterTag}
            onChange={handleFilterChange}
            className="bg-transparent text-electricCyan-100 placeholder-electricCyan-600 focus:outline-none"
          />
        </div>

        <SortableHeader
          sortOptions={sortOptions}
          currentSortField={sortField}
          currentSortDirection={sortDirection}
          onSort={handleSort}
        />
      </div>

      <div className="space-y-10">
        {sortedAndFilteredPosts?.map((post) => (
          <PostItem post={post} key={post._id} />
        ))}
      </div>
    </>
  );
};

export default PostList;
