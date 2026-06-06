# Step 1: Use an official lightweight Node.js runtime as the base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json from your server folder
COPY package*.json ./

# Step 4: Install only production dependencies to keep the image small
RUN npm install --only=production

# Step 5: Copy the rest of your server files (including the compiled 'build' folder)
COPY . .

# Step 6: Expose the port your server runs on (from index.js, default is 8181)
EXPOSE 8181

# Step 7: Define the environment variable for production
ENV NODE_ENV=production

# Step 8: Command to start your Node.js application
CMD ["node", "index.js"]