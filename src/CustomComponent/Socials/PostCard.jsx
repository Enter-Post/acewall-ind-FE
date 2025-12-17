import React, { useState } from "react";
import PostReactions from "./PostReactions";
import CommentSection from "./CommentSection"; // Assuming this is imported but not used directly here
import PostComments from "./PostComments";

const PostCard = ({ post, setPosts }) => {
  const [showComments, setShowComments] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  const TEXT_LIMIT = 150;

  // ✅ Extract author info safely
  const author = post?.author || {};
  const authorName = `${author.firstName || ""} ${author.middleName || ""} ${author.lastName || ""}`.trim();

  const profilePic =
    author?.profileImg?.url ||
    author?.profileImg ||
    "https://i.pravatar.cc/100?img=10";

  const postDate = post?.createdAt ? new Date(post.createdAt) : new Date();
  const postTimeDisplay = postDate.toLocaleString();
  const postDateTimeISO = postDate.toISOString();

  // ✅ Strip HTML from post.text
  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const text = stripHtml(post?.text || "");

  const assets = Array.isArray(post?.assets) ? post.assets : [];

  // Unique ID for the expandable text area and comment section
  const postContentId = `post-content-${post._id}`;
  const commentSectionId = `comments-for-${post._id}`;


  return (
    // Added role="article" for semantic consistency within a feed
    <div className="bg-white rounded-xl shadow-sm p-3 hover:shadow-md transition-all" role="article" aria-labelledby={`author-name-${post._id}`}>
      {/* 🧑‍💻 Header */}
      <div className="flex items-center gap-3 mb-2">
        <img
          src={profilePic}
          // Essential: Descriptive alt text for the profile image
          alt={`${authorName}'s profile picture`}
          className="w-9 h-9 rounded-full object-cover"
        />
        <div>
          {/* H3 for the author's name within the article */}
          <h3 className="font-semibold text-gray-900 text-[15px]" id={`author-name-${post._id}`}>
            {authorName || "Unknown User"}
          </h3>
          {/* Using <time> for semantic dates */}
          <time dateTime={postDateTimeISO} className="text-xs text-gray-500">
            {postTimeDisplay}
          </time>
        </div>
      </div>

      {/* 📝 Text Content */}
      {text && (
        <div 
          className="text-gray-800 text-[14px] py-4 leading-relaxed whitespace-pre-line"
          id={postContentId}
          // Set aria-live="polite" if content could change dynamically, but here it's static post text.
        >
          {showFullText || text.length <= TEXT_LIMIT
            ? text
            : `${text.slice(0, TEXT_LIMIT)}...`}
          
          {/* "Read more" / "Show less" button */}
          {text.length > TEXT_LIMIT && (
            <button
              onClick={() => setShowFullText(!showFullText)}
              className="text-blue-600 text-sm ml-1 hover:underline"
              aria-expanded={showFullText}
              aria-controls={postContentId} // The control affects the parent text div
              aria-label={showFullText ? `Show less text from post by ${authorName}` : `Read more text from post by ${authorName}`}
            >
              {showFullText ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      )}

      {/* 📸 Media */}
      {assets.length > 0 && (
        <div className="grid grid-cols-1 gap-2 mt-2" role="group" aria-label={`Media assets for post by ${authorName}`}>
          {assets.map((asset, index) => {
            const isVideo =
              asset?.url?.endsWith(".mp4") || asset?.type?.includes("video");
            
            // Generate a sensible alt text for media if none is available
            const mediaAlt = isVideo ? `Video asset ${index + 1}` : `Image asset ${index + 1}`;

            return isVideo ? (
              <video
                key={index}
                controls
                className="w-full rounded-lg max-h-[300px] object-cover"
                // Added title and aria-label for accessibility
                title={mediaAlt} 
                aria-label={`Video player for ${mediaAlt}`}
              >
                <source src={asset.url} type="video/mp4" />
                {/* Fallback content */}
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                key={index}
                src={asset.url}
                // Essential: Descriptive alt text for the image
                alt={mediaAlt}
                className="w-full rounded-lg object-contain max-h-[300px]"
              />
            );
          })}
        </div>
      )}

      {/* ❤️ Reactions + 💬 Comments (Component handles button accessibility) */}
      <PostReactions
        post={post}
        setPosts={setPosts}
        onToggleComments={() => setShowComments((prev) => !prev)}
        // Pass ARIA attributes to the toggle button inside PostReactions
        ariaControls={commentSectionId}
        ariaExpanded={showComments}
      />

      {/* Comments Section (Content that is toggled) */}
      {showComments && (
        // Added id and role="region" for the controlled content area
        <div id={commentSectionId} role="region" aria-label={`Comments section for post by ${authorName}`}>
            <PostComments postId={post._id} setPosts={setPosts} />
        </div>
      )}
    </div>
  );
};

export default PostCard;