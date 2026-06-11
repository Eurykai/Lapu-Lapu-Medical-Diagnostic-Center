import React, { useState } from "react";
import { BLOG_POSTS } from "../data";
import { BlogPost } from "../types";
import { Search, Calendar, Clock, BookOpen, ArrowRight, X, Sparkles } from "lucide-react";

export default function BlogTips() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filteredPosts = BLOG_POSTS.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="bg-gray-50 py-12 md:py-16 px-4 md:px-8 min-h-[70vh]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-light-blue text-brand-blue text-xs font-bold rounded-full uppercase tracking-wider">
            <BookOpen size={14} />
            <span>Patient Knowledge Center</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand-dark tracking-tight">
            Laboratory Preparation & Health Tips
          </h2>
          <p className="text-xs md:text-sm text-gray-500">
            Read clinical insights compiled by our resident Medical Directors and Pathologists to prepare your body for blood extractions and diagnostic imaging.
          </p>
        </div>

        {/* Search tool block */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3.5 top-3.5 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search health tips (fasting, HbA1c, OGTT)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 focus:outline-hidden focus:border-brand-blue rounded-full text-sm shadow-xs transition-colors"
          />
        </div>

        {/* Blog post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <div 
              key={post.id} 
              className="bg-white rounded-2xl border border-gray-200/80 hover:border-gray-300 hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="p-6 space-y-4">
                <span className="px-2.5 py-0.5 text-[10px] font-bold text-brand-blue bg-brand-light-blue rounded uppercase tracking-wide">
                  {post.category}
                </span>

                <div className="space-y-1">
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-tight hover:text-brand-blue transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-4 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {post.publishedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-100 text-right">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-xs font-bold text-brand-blue hover:text-brand-navy flex items-center gap-1 cursor-pointer ml-auto"
                >
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Full Post Reader Overlay (Modal-style overlay) */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative flex flex-col animate-fadeIn border border-gray-100">
              
              {/* Sticky reader header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 p-4 sm:p-6 flex justify-between items-start gap-4 z-10">
                <div>
                  <span className="px-2 py-0.5 text-[10px] font-bold text-brand-blue bg-brand-light-blue rounded uppercase tracking-wide">
                    {selectedPost.category}
                  </span>
                  <h3 className="font-extrabold text-brand-dark text-base sm:text-lg leading-tight mt-1.5">
                    {selectedPost.title}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors shrink-0"
                  aria-label="Close reader"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Reader Body Content */}
              <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
                {/* Meta details */}
                <div className="flex items-center gap-4 text-xs text-gray-400 pb-4 border-b border-gray-100 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} />
                    Published: {selectedPost.publishedDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} />
                    Duration: {selectedPost.readTime}
                  </span>
                </div>

                {/* Simulated Content Rendering */}
                <div className="space-y-4 text-left whitespace-pre-line font-medium text-gray-600">
                  {selectedPost.content.trim()}
                </div>

                {/* Professional closure guidance */}
                <div className="bg-brand-light-blue/20 p-4 rounded-2xl border border-brand-light-blue text-xs text-brand-navy space-y-1 mt-6">
                  <h4 className="font-bold flex items-center gap-1 text-xs">
                    <Sparkles size={14} className="text-brand-teal" />
                    Testing at LLMDCI Cebu:
                  </h4>
                  <p className="leading-relaxed">
                    If you require any of the tests examined in this guide (FBS, HbA1c, Lipid core or OGTT panel), you can schedule your slot right now on the **Book a Test** tab. For questions, call **(032) 495 9328**.
                  </p>
                </div>
              </div>

              {/* Footer action */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 text-right mt-auto sticky bottom-0">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-5 py-2.5 bg-brand-navy text-white text-xs font-bold rounded-xl hover:bg-brand-blue transition-colors cursor-pointer"
                >
                  Done Reading
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
