#!/bin/bash

# Function to check if node modules are installed
check_node_modules() {
  if [ ! -d "node_modules" ]; then
    echo "Node modules not found. Installing dependencies..."
    npm install
  fi
}

# Navigate to the backend folder
cd backend

# Check and install backend dependencies
check_node_modules

# Run the backend
npm start &

# Move back to the main directory
cd ..

# Navigate to the frontend folder
cd frontend

# Check and install frontend dependencies
check_node_modules

# Run the frontend
npm start
