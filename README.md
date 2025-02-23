#CRUD Database Application

##This is a simple CRUD (Create, Read, Update, Delete) application built using Next.js and React. The application interacts with a backend API to perform database operations for managing posts.

###Features

1.Create new posts with a title and body.

2.Read and display all posts from the backend.

3.Update existing posts.

4.Delete posts.

###Loading state handling while fetching data.

Technologies Used

Next.js (React framework)

React Hooks (useState, useEffect)

Tailwind CSS (for styling)

Fetch API (to interact with the backend API)

Setup and Installation

Prerequisites

Ensure you have the following installed:

Node.js

npm or yarn

Installation Steps

Clone the repository:

git clone https://github.com/yourusername/crud-app.git

Navigate to the project directory:

cd crud-app

Install dependencies:

npm install

or

yarn install

Set up environment variables:

Create a .env.local file in the root directory.

Add the following line:

NEXT_PUBLIC_API_URL=http://localhost:5000/posts

Start the development server:

npm run dev

or

yarn dev

Open the app in your browser at http://localhost:3000

File Structure

crud-app/
│-- pages/
│   ├── index.js  # Main component (CRUD functionality)
│-- styles/       # CSS styles (Tailwind)
│-- .env.local    # Environment variables
│-- package.json  # Dependencies and scripts
│-- README.md     # Documentation

How It Works

Fetching Posts

When the component mounts, it fetches posts from the API using fetchPosts inside useEffect.

Creating a Post

Users enter a title and body.

The createPost function sends a POST request to the API.

The new post is added to the state.

Updating a Post

Clicking "Edit" sets the post to editingPost.

The user modifies the title or body.

The updatePost function sends a PUT request to update the post.

Deleting a Post

Clicking "Delete" sends a DELETE request to remove the post from the backend.

Possible Enhancements

Add authentication and user management.

Improve UI/UX with animations.

Implement error handling and validation.

License

This project is open-source and available under the MIT License.

Happy coding! 🚀


