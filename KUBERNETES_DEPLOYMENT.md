# Kubernetes Deployment Guide for BookStore App

This guide will help you deploy the BookStore application to a Kubernetes cluster.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Docker** - For building container images
2. **kubectl** - Kubernetes command-line tool
3. **Minikube** (for local development) OR access to a Kubernetes cluster

### Installing Prerequisites (Ubuntu/WSL2)

```bash
# Install Docker (if using WSL2, enable Docker Desktop WSL integration)
# Follow: https://docs.docker.com/desktop/wsl/

# Install kubectl
sudo snap install kubectl --classic
# OR
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Install Minikube (for local Kubernetes cluster)
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

## Step 1: Start Minikube (for local deployment)

```bash
# Start Minikube with Docker driver
minikube start --driver=docker

# Enable the ingress addon (optional, for easier access)
minikube addons enable ingress

# Configure your shell to use Minikube's Docker daemon
# This allows Kubernetes to use locally built images
eval $(minikube docker-env)
```

## Step 2: Build Docker Images

Build the Docker images inside Minikube's Docker environment:

```bash
# Navigate to project root
cd /home/tomer/bookstore-project

# Build backend image
docker build -t bookstore-project-backend:latest ./backend

# Build frontend image
docker build -t bookstore-project-frontend:latest ./frontend

# Verify images are built
docker images | grep bookstore-project
```

## Step 3: Deploy to Kubernetes

Apply the Kubernetes configurations:

```bash
# Deploy backend (includes Deployment and Service)
kubectl apply -f k8s/backend-deployment.yaml

# Deploy frontend (includes Deployment and Service)
kubectl apply -f k8s/frontend-deployment.yaml
```

## Step 4: Verify Deployment

Check that all resources are running:

```bash
# Check deployments
kubectl get deployments

# Check pods
kubectl get pods

# Check services
kubectl get services

# View detailed pod information
kubectl get pods -o wide

# Check logs if needed
kubectl logs -l app=backend
kubectl logs -l app=frontend
```

Expected output:
- 2 backend pods running
- 2 frontend pods running
- backend-service (ClusterIP)
- frontend-service (LoadBalancer)

## Step 5: Access the Application

### Option 1: Using Minikube (Local Development)

```bash
# Get the frontend service URL
minikube service frontend-service --url

# This will return a URL like: http://192.168.49.2:30000
# Open this URL in your browser
```

### Option 2: Port Forwarding

```bash
# Forward frontend service to localhost
kubectl port-forward service/frontend-service 5173:80

# Access the app at: http://localhost:5173
```

### Option 3: LoadBalancer (Cloud Kubernetes)

If you're using a cloud provider (GKE, EKS, AKS):

```bash
# Get the external IP
kubectl get service frontend-service

# Wait for EXTERNAL-IP to be assigned
# Access the app using the external IP
```

## Step 6: Access Backend API

The backend is accessible within the cluster at `backend-service:5555`.

To test the backend from outside:

```bash
# Port forward the backend service
kubectl port-forward service/backend-service 5555:5555

# Test the API
curl http://localhost:5555/books
```

## Scaling Your Application

```bash
# Scale backend
kubectl scale deployment backend-deployment --replicas=3

# Scale frontend
kubectl scale deployment frontend-deployment --replicas=3

# Check the new replica count
kubectl get deployments
```

## Updating Your Application

After making code changes:

```bash
# Rebuild the Docker image (make sure you're using Minikube's Docker daemon)
eval $(minikube docker-env)
docker build -t bookstore-project-backend:latest ./backend

# Restart the deployment to use the new image
kubectl rollout restart deployment backend-deployment

# Check rollout status
kubectl rollout status deployment backend-deployment
```

## Troubleshooting

### Pods not starting

```bash
# Describe pod to see events
kubectl describe pod <pod-name>

# Check logs
kubectl logs <pod-name>
```

### ImagePullBackOff error

This means Kubernetes can't find the image. Make sure:
1. You've built the images using Minikube's Docker daemon: `eval $(minikube docker-env)`
2. The `imagePullPolicy: Never` is set in the deployment files (already configured)

### Services not accessible

```bash
# Check service endpoints
kubectl get endpoints

# Verify service selectors match pod labels
kubectl describe service frontend-service
kubectl describe service backend-service
```

## Cleanup

To remove all resources:

```bash
# Delete deployments and services
kubectl delete -f k8s/backend-deployment.yaml
kubectl delete -f k8s/frontend-deployment.yaml

# Stop Minikube
minikube stop

# Delete Minikube cluster
minikube delete
```

## Environment Variables

The backend uses MongoDB connection string from `backend/config.js`. 
The current configuration uses MongoDB Atlas (cloud database), so no local MongoDB is needed.

If you need to change environment variables:

```bash
# Edit the deployment file or create a ConfigMap/Secret
kubectl create configmap backend-config --from-literal=NODE_ENV=production
kubectl create secret generic mongodb-secret --from-literal=MONGODB_URL=your-mongodb-url
```

Then update `k8s/backend-deployment.yaml` to use these resources.

## Production Considerations

For production deployment:

1. **Push images to a container registry** (Docker Hub, GCR, ECR, ACR)
2. **Use secrets for sensitive data** (MongoDB connection strings)
3. **Configure Ingress** for better routing
4. **Set resource limits** in deployment files
5. **Enable monitoring** with Prometheus/Grafana
6. **Configure persistent volumes** if needed
7. **Set up CI/CD pipeline** for automated deployments

## Quick Start Commands

```bash
# Complete deployment in one go
eval $(minikube docker-env)
docker build -t bookstore-project-backend:latest ./backend
docker build -t bookstore-project-frontend:latest ./frontend
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
minikube service frontend-service
```

---

For more information, check the main [README.md](README.md) file.
