'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/posts';

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    if (!newPost.title || !newPost.body) return;
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });
      const data = await res.json();
      setPosts([data, ...posts]);
      setNewPost({ title: '', body: '' });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const updatePost = async () => {
    if (!editingPost?.title || !editingPost?.body) return;
    try {
      const res = await fetch(`${API_URL}/${editingPost.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPost),
      });
      const updatedPost = await res.json();
      setPosts(posts.map(post => (post.id === editingPost.id ? updatedPost : post)));
      setEditingPost(null);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const deletePost = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">CRUD Database By Dhruv Bhatia</h1>

      {/* Create Post Form */}
      <div className="mb-6 p-4 border rounded bg-black-100 shadow">
        <h2 className="text-xl font-semibold mb-2">Create New Post</h2>
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered w-full mb-2"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="Body"
          className="textarea textarea-bordered w-full mb-2"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        />
        <button className="btn btn-primary w-full" onClick={createPost}>Create Post</button>
      </div>

      {/* Edit Post Form */}
      {editingPost && (
        <div className="mb-6 p-4 border rounded bg-blue-100 shadow">
          <h2 className="text-xl font-semibold mb-2">Edit Post</h2>
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full mb-2"
            value={editingPost.title}
            onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
          />
          <textarea
            placeholder="Body"
            className="textarea textarea-bordered w-full mb-2"
            value={editingPost.body}
            onChange={(e) => setEditingPost({ ...editingPost, body: e.target.value })}
          />
          <button className="btn btn-success w-full mb-2" onClick={updatePost}>Update Post</button>
          <button className="btn btn-secondary w-full" onClick={() => setEditingPost(null)}>Cancel</button>
        </div>
      )}

      {/* Loading State */}
      {loading && <p className="text-center text-gray-500">Loading posts...</p>}

      {/* Display Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p>{post.body}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-sm btn-outline" onClick={() => setEditingPost(post)}>Edit</button>
                <button className="btn btn-sm btn-error" onClick={() => deletePost(post.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Posts Message */}
      {!loading && posts.length === 0 && <p className="text-center text-gray-500 mt-4">No posts available.</p>}
    </div>
  );
}