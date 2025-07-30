# TaskManager-Mern

Features:

- JWT-based **User Authentication**
- CRUD operations for tasks (Create, Read, Update, Delete)
- State Management using Redux Toolkit
- Responsive Design for all screen sizes
- RESTful APIs built with Express and MongoDB
- Deployed on Vercel (Frontend) and Render(Backend)

Tech Stack:

- Frontend: React.js, Redux Toolkit, Axios, React Router
- Backend: Node.js, Express.js, JWT
- Database: MongoDB Atlas
- Others: Postman, Vercel, Render, Git

API Endpoints Overview:
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login existing user
GET	/api/tasks	Get all tasks (auth)
POST	/api/tasks	Create a new task
PUT	/api/tasks/:id	Update a task
DELETE	/api/tasks/:id	Delete a task

Setup Environment Variables:

Backend .env file:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=your_client_url

Frontend .env file:
REACT_APP_API_BASE_URL=your_server_url

Running the App:

Backend: npm start
Frontend: npm start
