import React, { useState } from 'react';
import { Heart, MessageCircle, Plus, Search, Tag, User } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { GalleryPost } from '../types';

const Gallery: React.FC = () => {
  const { posts, addPost, addComment, toggleLike } = useData();
  const { user, gainXp } = useAuth();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTags, setNewPostTags] = useState('');

  const [selectedPost, setSelectedPost] = useState<GalleryPost | null>(null);
  const [commentText, setCommentText] = useState('');

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newPost: GalleryPost = {
      id: Date.now().toString(),
      title: newPostTitle,
      content: newPostContent,
      author: user.name,
      authorDept: user.department,
      date: new Date().toLocaleDateString(),
      likes: 0,
      tags: newPostTags.split(',').map(t => t.trim()).filter(t => t),
      comments: []
    };

    addPost(newPost);
    gainXp(50); // Big reward for posting
    setIsModalOpen(false);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostTags('');
    alert('게시글이 등록되었습니다! (+50 XP)');
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedPost || !commentText.trim()) return;

    const newComment = {
        id: Date.now().toString(),
        author: user.name,
        text: commentText,
        date: new Date().toLocaleDateString()
    };

    addComment(selectedPost.id, newComment);
    gainXp(10); // Reward for commenting
    setCommentText('');
    
    // Update local selected post to show new comment immediately
    setSelectedPost({
        ...selectedPost,
        comments: [...selectedPost.comments, newComment]
    });
  };

  return (
    <div className="bg-neutral-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900 mb-2">자랑하기 게시판</h1>
                    <p className="text-gray-600">
                        AI를 활용해 업무 시간을 단축했거나, 멋진 결과물을 만든 경험을 공유해주세요.<br/>
                        서로 칭찬하고 배우며 함께 성장합니다.
                    </p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md"
                >
                    <Plus size={20} /> 글쓰기
                </button>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all flex flex-col h-full">
                    <div className="p-6 flex-1">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-bold bg-blue-50 text-primary px-2 py-1 rounded-md">{post.authorDept}</span>
                            <span className="text-xs text-gray-400">{post.date}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.content}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map(tag => (
                                <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded flex items-center">
                                    <Tag size={10} className="mr-1" /> {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="border-t border-gray-100 p-4 bg-gray-50 flex justify-between items-center">
                        <div className="flex items-center gap-1 text-sm text-gray-600 font-medium">
                            <User size={14} /> {post.author}
                        </div>
                        <div className="flex gap-4">
                            <button 
                                onClick={() => { toggleLike(post.id); }}
                                className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <Heart size={18} fill={post.likes > 0 ? "currentColor" : "none"} className={post.likes > 0 ? "text-red-500" : ""} /> 
                                <span className="text-sm">{post.likes}</span>
                            </button>
                            <button 
                                onClick={() => setSelectedPost(post)}
                                className="flex items-center gap-1 text-gray-400 hover:text-primary transition-colors"
                            >
                                <MessageCircle size={18} />
                                <span className="text-sm">{post.comments.length}</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Write Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8">
                  <h2 className="text-2xl font-bold mb-6">나만의 노하우 공유하기</h2>
                  <form onSubmit={handlePostSubmit} className="space-y-4">
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">제목</label>
                          <input 
                            value={newPostTitle} onChange={e => setNewPostTitle(e.target.value)}
                            className="w-full border rounded-lg p-3 focus:outline-primary" placeholder="예: 엑셀 매크로로 재고 정리 10분컷 하기" required 
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">내용</label>
                          <textarea 
                            value={newPostContent} onChange={e => setNewPostContent(e.target.value)}
                            className="w-full border rounded-lg p-3 h-40 resize-none focus:outline-primary" placeholder="어떤 AI 도구를 사용했는지, 프롬프트는 무엇이었는지 자세히 적어주세요." required 
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">태그 (쉼표로 구분)</label>
                          <input 
                             value={newPostTags} onChange={e => setNewPostTags(e.target.value)}
                             className="w-full border rounded-lg p-3 focus:outline-primary" placeholder="예: 엑셀, ChatGPT, 시간단축" 
                          />
                      </div>
                      <div className="flex justify-end gap-3 mt-6">
                          <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-lg border hover:bg-gray-50">취소</button>
                          <button type="submit" className="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:bg-blue-700">등록하기</button>
                      </div>
                  </form>
              </div>
          </div>
      )}

      {/* Detail/Comment Modal */}
      {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
             <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col">
                <div className="p-6 border-b flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedPost.title}</h2>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span>{selectedPost.author} ({selectedPost.authorDept})</span>
                            <span>•</span>
                            <span>{selectedPost.date}</span>
                        </div>
                    </div>
                    <button onClick={() => setSelectedPost(null)} className="text-gray-400 hover:text-gray-600">
                        <Plus size={24} className="rotate-45" />
                    </button>
                </div>
                
                <div className="p-8 overflow-y-auto flex-1">
                    <p className="whitespace-pre-wrap leading-relaxed text-gray-700 mb-8">{selectedPost.content}</p>
                    
                    <div className="border-t pt-6">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <MessageCircle size={18} /> 댓글 <span className="text-primary">{selectedPost.comments.length}</span>
                        </h3>
                        <div className="space-y-4 mb-6">
                            {selectedPost.comments.length > 0 ? (
                                selectedPost.comments.map(comment => (
                                    <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-bold text-sm text-gray-900">{comment.author}</span>
                                            <span className="text-xs text-gray-400">{comment.date}</span>
                                        </div>
                                        <p className="text-sm text-gray-700">{comment.text}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-400 py-4">아직 댓글이 없습니다. 첫 번째 댓글을 남겨보세요!</p>
                            )}
                        </div>
                        
                        <form onSubmit={handleCommentSubmit} className="flex gap-2">
                            <input 
                                value={commentText} onChange={e => setCommentText(e.target.value)}
                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                                placeholder="응원이나 질문을 남겨주세요..."
                            />
                            <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700">등록</button>
                        </form>
                    </div>
                </div>
             </div>
          </div>
      )}
    </div>
  );
};

export default Gallery;