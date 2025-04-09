# Task Manager 
Manager your task at your own control

## Tech Stack
- Node.js
- Express.js
- PostgreSQL (Database)
- bcrypt (Password hashing)
- JWT (Authentication)
- Render (deployment)
- CORS

## Envionment Variables 
Create a .env file with the following content 
`
DB_HOST=""
DB_USERNAME=""
DB_PASSWORD=""
DB_PORT=
DB_NAME=""
SECRET_KEY=""
ACCESS_SECRET_KEY=""
REFRESH_SECRET_KEY=""
CORS_URL=""
`

## Setup
```
git clone https://github.com/JavaIsNotHard/task-manager-backend.git
cd task-manager-backend
```

## Building the project
Run the following command to build the project and pull the dependencies
```
npm install 
OR 
yarn
```

## Run the project
Run the following command to run the project
```
node index.js
```