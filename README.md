## CRUD Databases using Next.js and JSONAPIplaceholder



This is a simple CRUD (Create, Read, Update, Delete) application built using **Next.js**. The application interacts with an API to manage posts, allowing users to create, edit, delete, and view posts.

## Features
- Fetch and display posts from an API.
- Create new posts.
- Edit existing posts.
- Delete posts.
- Loading state while fetching data.

## Technologies Used
- **Next.js** (React framework)
- **Tailwind CSS Library DaisyUI**(for styling)
- **useState** and **useEffect** hooks (for state management and fetching data)
- **JSONAPIplaceholder** for a remote server

## Setup & Installation

### Prerequisites
Ensure you have **Node.js** and **npm/yarn** installed.

### Steps
1. **Start the project**
   ```sh
   npx create-next-app@latest crud
   ```

2. **Install dependencies**
   ```sh
   npm install  # or yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and define the API URL:
   ```sh
   NEXT_PUBLIC_API_URL=http://localhost:5000/posts
   ```

4. **Run the application**
   ```sh
   npm run dev  # or yarn dev
   ```

5. **Open in browser**
   Visit `http://localhost:3000` to see the app in action.

## Code Breakdown

### Fetching Posts
```js
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
```
- Uses `useEffect` to fetch posts when the component loads.
- Updates the `posts` state with fetched data.

### Creating a Post
```js
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
```
- Sends a `POST` request to create a new post.
- Updates the state with the newly created post.

### Updating a Post
```js
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
```
- Sends a `PUT` request to update a specific post.
- Updates the post in the state.

### Deleting a Post
```js
const deletePost = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    setPosts(posts.filter(post => post.id !== id));
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};
```
- Sends a `DELETE` request to remove a post.
- Updates the state to reflect the deletion.

## UI Components
- **Create Post Form**: Allows users to input a title and body for new posts.
- **Edit Post Form**: Displays when a user selects "Edit" on a post.
- **Post List**: Displays all posts with options to edit and delete.
- **Loading Indicator**: Shows when fetching data.

## Backend Remote server
- **Download dependency**:
  ```sh
   npm install -g json-server
   ```
- **Json file creation**: create a file db.json file which contains the dummy data for the database
- **Run the server as a background process**:
 ```sh
  npx json-server --watch db.json --port 5000 &
  ```




---
**Author:** Dhruv Bhatia  
**GitHub:** [Your GitHub Profile](https://github.com/dhruvbhatia2701)

 

