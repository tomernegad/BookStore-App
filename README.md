Welcome to my BookStore App!
A comprehensive MERN stack application for managing a bookstore. This project allows users to add, edit, delete, and view books with a responsive design , using MongoDB as the database.

 ![image](https://github.com/user-attachments/assets/12654c93-9500-4aae-83cf-0f76cded1484) ![image](https://github.com/user-attachments/assets/eb8c2e24-9577-44d2-ac67-98938f295fe1)

## Features

- **Add Books**: Easily add new books to the collection.
![image](https://github.com/user-attachments/assets/fa9d5358-a06a-4e42-a8e6-d6cb81f9642b)


- **Edit Books**: Update book details with ease.
- ![image](https://github.com/user-attachments/assets/5b83f96d-3b30-4994-b115-1709803d7f67)

- **Delete Books**: Remove books from the collection.
- ![image](https://github.com/user-attachments/assets/63067854-cdea-4cf3-a18d-5e53394b1666)
![image](https://github.com/user-attachments/assets/21ea5d8e-ffaa-4cd7-8024-f87acb6d59e9)

- **View Books**: Browse through the list of books.
- ![image](https://github.com/user-attachments/assets/d73f01c3-421e-4993-a0d3-2cec624c9a22)

## 🚀 Running the Application

### Option 1: Kubernetes (Recommended for Production)

**Quick Start:**
```bash
# Start Minikube
minikube start

# Start the application
cd ~/bookstore-project
nohup kubectl port-forward service/backend-service 5555:5555 > /tmp/backend-pf.log 2>&1 &
nohup kubectl port-forward service/frontend-service 5173:80 > /tmp/frontend-pf.log 2>&1 &

# Open http://localhost:5173 in your browser
```

📖 **Detailed guides:**
- [START_APP.md](START_APP.md) - Quick start guide for next time
- [KUBERNETES_DEPLOYMENT.md](KUBERNETES_DEPLOYMENT.md) - Full Kubernetes deployment guide
- [K8S_QUICK_REFERENCE.md](K8S_QUICK_REFERENCE.md) - Command reference

### Option 2: Docker Compose

```bash
docker-compose up
```

### Option 3: Local Development

**Backend:**
```bash
cd backend
npm install
npm start
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

