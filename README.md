## Table of content

1. [Project Description](#project-description)
2. [Technologies](#technologies)
3. [Setup](#setup)
   - [Development Setup](#development-setup)
   - [Production Setup "Docker Compose"](#production-setup-docker-compose)


## Project Description
The following project consists of an easy to deploy home cloud where each one of the existing users can manage his own file directory 
remotely, also upload, download and navigate between all their uploaded files with a friendly and intuitive UI.


## Technologies
The language used for this project has been `TypeScript` due to its versatility and ability to be used both on the frontend and backend of the application.

On the backend, I have worked with `Express` to build the API, used `JWT` as the authentication system, and `MongoDB` as the database for storing application users. Additionally, I have utilized other development tools such as `Jest` for testing various functionalities and `Nodemon` for automatically reloading the development server.

For the frontend, I have employed `React` for the UI using the `Vite` framework. Styling was handled with `Tailwind CSS`. `Axios` served as the web client for all communication with the backend, and `Redux` was used for managing decentralized state containers in React.

In terms of DevOps, `Nginx` was used as the production server to host the `React` application, along with a reverse HTTP proxy configuration for redirecting requests to the backend. `Docker Compose` simplified the application deployment process, and `Git` was used as the version control management system.


| Field     | Technologies |
|:----------|:-------------|
| Languages | ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) |
| Frontend  | ![React](https://img.shields.io/badge/REACT-131842?style=for-the-badge&logo=react) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-purple?style=for-the-badge&logo=axios) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) |
| Backend   | ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) |
| DevOps    | ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) |


## Setup

1. Clone the repository and enter the cloned directory:

    ```sh
    git clone https://github.com/adriangargom/Project_ThunderstormCloud
    cd <downloaded_folder>
    ```

2. Configure the backend:

    2.1 Navigate to the backend directory and copy the contents of the `sample.env` file to a new file named `.env`:

    ```sh
    cd backend
    cp sample.env .env
    ```

    2.2 Modify the following fields in the `.env` file:

    - **MAIN_DIRECTORY_PATH**: Set the directory where user folders will be stored, e.g., `./user_dir` or another path in your system.

    - **SECRET_API_KEY**: Set a custom, secure password for the JWT authentication system. Ensure this key is kept secret to maintain the security of your application.

    - **DB_CONNECTION_STRING**: Set the MongoDB connection string, e.g., `mongodb://<ip_address>:<db_port>`.


3. Configure the frontend:

    3.1 Navigate to the frontend directory and create two new files: `.env` and `.env.production`:

    ```sh
    cd ../frontend
    touch .env .env.production
    ```

    3.2 Add the following environment variables:

    - **File `.env`**:

    ```env
    VITE_BACKEND_URL="http://localhost:3000/api"
    ```

    - **File `.env.production`**:

    ```env
    VITE_BACKEND_URL="http://<your_local_address>:8080/api"
    ```


### Development Setup

1. Install dependencies and start the backend service:

    ```sh
    cd backend
    npm install
    npm run dev
    ```

2. Install dependencies and start the frontend service:

    ```sh
    cd ../frontend
    npm install
    npm run dev
    ```


### Production Setup using Docker Compose

1. Edit the `docker-compose.yml` file in the project root directory:

    - Set the `MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_ROOT_PASSWORD` environment variables with the desired database credentials.

    - Set `DB_USERNAME` and `DB_PASSWORD` in the backend environment variables to match the database credentials from the previous step.

2. Start the Docker Compose deployment from the project root directory:

    ```sh
    docker-compose up
    ```