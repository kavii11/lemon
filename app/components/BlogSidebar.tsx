export default function BlogSidebar() {
  return (
    <div className="flex flex-col h-full">

      {/* 🔝 TOP */}
      <div className="flex-1 p-4">
        <h2 className="text-sm text-zinc-400 mb-4">Blog Tools</h2>
        <button className="block mb-2">New Post</button>
        <button className="block mb-2">All Posts</button>
        <button className="block">Categories</button>
      </div>

      {/* 🔻 BOTTOM */}
      <div>
        <div className="w-full border-t border-zinc-800"></div>

        <div className="p-4 space-y-2 text-right">
          <p className="text-sm text-zinc-400 hover:text-white cursor-pointer">
            Guide
          </p>
          <p className="text-sm text-zinc-400 hover:text-white cursor-pointer">
            How to use?
          </p>
        </div>
      </div>

    </div>
  );
}