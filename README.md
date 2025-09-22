# Chatbot Platform (Minimal Version)

This is a minimal chatbot platform built with **Node.js, Express, MySQL, and JWT authentication**.  
It allows users to register, log in, create projects, and interact with a chatbot using the OpenAI API (or other LLM services).



## Features
- User registration & login (with **bcrypt** password hashing + **JWT** authentication)
- MySQL database integration
- REST API endpoints for authentication
- Extensible structure for projects and chatbot prompts
- Secure environment configuration with .env



## Project Structure
Chatbot Platform/
│── package.json
│── .env
│── README.md
│── server.js
│── src/
├── routes/
│ └── auth.js
├── controllers/
│ └── authController.js
├── models/
│ └── db.js



## Setup Instructions

## 1.Install Dependencies

## bash
npm install

## 2.Configure environment variables

## Create a .env file in the root:
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=chatbot_db
JWT_SECRET=supersecretkey
OPENAI_API_KEY=your_openai_api_key


## 3.Setup MySQL Database

## 4.Run the application
node server.js

## 5.Test the endpoints on postman
Register Endpoint:
POST http://localhost:5000/auth/register

Body → raw → JSON:
json 
{
  "name": "Aditi",
  "email": "aditi@example.com",
  "password": "mypassword"
}

Expected response:
{
  "message": "User registered successfully!"
}


Login Endpoint:
POST http://localhost:5000/auth/login

json
{
  "email": "aditi@example.com",
  "password": "mypassword"
}


expected response:
{
  "message": "Login successful!",
  "token": "your_jwt_token_here"
}


