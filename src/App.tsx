import React, { useEffect, useState } from 'react';
import { fetchPosts, addPost, updatePost, deletePost } from './api/posts';
import { Modal, Spin } from 'antd';
import PostTable from './components/PostTable';
import PostForm from './components/PostForm';
import { Post } from './types/Post';
import './App.css';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true); // Loader state

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await fetchPosts();
      setTimeout(() => {
        setPosts(data);
        setLoading(false);
      }, 1500); // Simulate loader delay
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="app-container">
      {loading ? (
        // Loader while fetching data
        <div className="loader-container">
          <Spin size="large" />
          <p>Loading data...</p>
        </div>
      ) : (
        // Render content when loading is done
        <>
          <header className="app-header">
            <h1>CRUD Operation - DINAMO </h1>
          </header>
          <div className="content-wrapper">
            <div className="table-container">
              <PostTable
                posts={posts}
                onEdit={(post) => {
                  setEditingPost(post);
                  setIsModalVisible(true);
                }}
                onDelete={(id) => {
                  deletePost(id);
                  setPosts(posts.filter((post) => post.id !== id));
                }}
              />
            </div>
            <div className="form-container">
              <button
                className="add-button"
                onClick={() => {
                  setEditingPost(null);
                  setIsModalVisible(true);
                }}
              >
                Add New Post
              </button>
            </div>
          </div>
        </>
      )}

      <Modal
        title={editingPost ? 'Edit Post' : 'Add New Post'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <PostForm
          initialValues={editingPost || undefined}
          onSubmit={(values) => {
            if (editingPost) {
              updatePost(editingPost.id, values);
              setPosts(
                posts.map((post) =>
                  post.id === editingPost.id ? { ...post, ...values } : post
                )
              );
            } else {
              addPost(values).then((newPost) => setPosts([newPost, ...posts]));
            }
            setIsModalVisible(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default App;
