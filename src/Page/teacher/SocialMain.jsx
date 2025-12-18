import React, { useState, useEffect, useContext } from "react";
import { PlusCircle, Coffee, User } from "lucide-react";
import { Link } from "react-router-dom";
import PostCard from "@/CustomComponent/teacher/Socials/PostCard";
import CreatePostModal from "@/CustomComponent/teacher/Socials/CreatePostModal";
import { GlobalContext } from "@/Context/GlobalProvider";
import { axiosInstance } from "@/lib/AxiosInstance";

const SocialMain = ({ posts: externalPosts, setPosts: setExternalPosts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localPosts, setLocalPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(GlobalContext);

  const posts = externalPosts || localPosts;
  const setPosts = setExternalPosts || setLocalPosts;

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/posts/getPosts?page=1&limit=10`);
      const fetched = response.data?.posts || [];

      const normalized = fetched.map((post) => ({
        _id: post._id,
        text: post.text || "",
        color: post.color || "#ffffff",
        assets: Array.isArray(post.assets) ? post.assets : [],
        author: {
          firstName: post?.author?.firstName || "Unknown",
          middleName: post?.author?.middleName || "",
          lastName: post?.author?.lastName || "",
          profileImg: post?.author?.profileImg?.url || "https://i.pravatar.cc/100?img=10",
        },
        createdAt: post.createdAt || new Date().toISOString(),
        likes: post.likes || [],
        comments: post.comments || [],
        liked: false,
      }));

      setPosts(normalized);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    setIsModalOpen(false);
    await fetchPosts();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔝 Navbar - Semantic Header */}
      <header className="bg-green-600 text-white rounded-lg shadow-sm sticky top-0 z-10 flex items-center justify-between px-6 py-3 border-b">
        <div className="flex items-center gap-3">
          <Coffee className="w-6 h-6" aria-hidden="true" />
          <h1 className="text-xl font-bold tracking-wide">Spill The Tea</h1>
        </div>

        <nav className="flex items-center gap-3" aria-label="Social Actions">
          {/* 👤 Profile Link */}
          <Link 
            to={`socialprofile/${user._id}`}
            className="flex items-center gap-2 bg-white hover:bg-gray-100 text-green-600 px-4 py-2 rounded-full transition text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-white outline-none"
            aria-label="View your social profile"
          >
            <User className="w-4 h-4" aria-hidden="true" />
            <span>Profile</span>
          </Link>

          {/* ➕ Create Post Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-white hover:bg-gray-100 text-green-600 px-5 py-2 rounded-full transition focus:ring-2 focus:ring-offset-2 focus:ring-white outline-none font-medium"
            aria-label="Create a new post"
          >
            <PlusCircle className="w-5 h-5" aria-hidden="true" />
            <span>Create</span>
          </button>
        </nav>
      </header>

      

      {/* 🧾 Posts - Semantic Main Content */}
      <main 
        className="max-w-3xl mx-auto mt-6 space-y-4 px-2 sm:px-4 pb-10" 
        id="main-content"
        aria-live="polite" 
        aria-busy={loading}
      >
        <h2 className="sr-only">Social Feed</h2>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20" role="status">
             {/* Simple visual loader - logic remains untouched */}
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-2"></div>
             <p className="text-gray-500">Loading latest tea...</p>
          </div>
        ) : posts.length > 0 ? (
          <section className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} setPosts={setPosts} />
            ))}
          </section>
        ) : (
          <div className="text-center text-gray-500 py-20 border-2 border-dashed rounded-lg">
            <p className="text-lg">No posts found. Be the first to spill the tea!</p>
          </div>
        )}
      </main>

      {/* ✏️ Create Post Modal */}
      {isModalOpen && (
        <CreatePostModal
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreatePost}
        />
      )}
    </div>
  );
};

export default SocialMain;