# Kubernetes Quick Reference for BookStore App

## 🚀 Access Your Application

**Frontend URL:** http://localhost:5173

> Note: Make sure port forwarding is running (see commands below)

## 📋 Essential Commands

### Access the Application
```bash
# Start port forwarding for frontend (run in background)
kubectl port-forward service/frontend-service 5173:80

# Access backend API directly (optional)
kubectl port-forward service/backend-service 5555:5555
```

### Check Status
```bash
# View all pods
kubectl get pods

# View all services
kubectl get services

# View all deployments
kubectl get deployments

# View everything
kubectl get all
```

### View Logs
```bash
# Backend logs
kubectl logs -l app=backend --tail=50

# Frontend logs
kubectl logs -l app=frontend --tail=50

# Follow logs in real-time
kubectl logs -l app=backend -f
```

### Scale Application
```bash
# Scale backend
kubectl scale deployment backend-deployment --replicas=3

# Scale frontend
kubectl scale deployment frontend-deployment --replicas=3
```

### Update After Code Changes
```bash
# 1. Configure Docker to use Minikube's daemon
eval $(minikube docker-env)

# 2. Rebuild the image
docker build -t bookstore-project-backend:latest ./backend
# OR
docker build -t bookstore-project-frontend:latest ./frontend

# 3. Restart the deployment
kubectl rollout restart deployment backend-deployment
# OR
kubectl rollout restart deployment frontend-deployment

# 4. Check rollout status
kubectl rollout status deployment backend-deployment
```

### Troubleshooting
```bash
# Describe a pod to see events
kubectl describe pod <pod-name>

# Get pod name
kubectl get pods -l app=backend

# Execute commands inside a pod
kubectl exec -it <pod-name> -- sh

# Check service endpoints
kubectl get endpoints
```

### Cleanup
```bash
# Delete all resources
kubectl delete -f k8s/backend-deployment.yaml
kubectl delete -f k8s/frontend-deployment.yaml

# Stop Minikube
minikube stop

# Delete Minikube cluster (removes all data)
minikube delete
```

## 🔧 Current Configuration

- **Backend**: 2 replicas, port 5555, ClusterIP service
- **Frontend**: 2 replicas, port 5173, LoadBalancer service
- **Database**: MongoDB Atlas (external)
- **DNS**: Custom DNS (8.8.8.8, 8.8.4.4) for MongoDB Atlas connectivity

## 🐛 Common Issues

### Port forwarding stopped
```bash
# Restart port forwarding
kubectl port-forward service/frontend-service 5173:80
```

### Backend can't connect to MongoDB
```bash
# Check backend logs
kubectl logs -l app=backend --tail=30

# The deployment is configured with Google DNS to resolve MongoDB Atlas
```

### Pods not starting
```bash
# Check pod status
kubectl get pods

# Describe problematic pod
kubectl describe pod <pod-name>

# Check logs
kubectl logs <pod-name>
```

### Need to rebuild images
```bash
# IMPORTANT: Use Minikube's Docker daemon
eval $(minikube docker-env)

# Then build
docker build -t bookstore-project-backend:latest ./backend
docker build -t bookstore-project-frontend:latest ./frontend

# Restart deployments
kubectl rollout restart deployment backend-deployment
kubectl rollout restart deployment frontend-deployment
```

## 📊 Monitoring

```bash
# Watch pods in real-time
kubectl get pods -w

# Top nodes (resource usage)
kubectl top nodes

# Top pods (requires metrics-server)
kubectl top pods
```

## 🌐 Alternative Access Methods

### Using Minikube Service (alternative to port-forward)
```bash
# Get service URL
minikube service frontend-service --url

# Open in browser directly
minikube service frontend-service
```

### Using NodePort
```bash
# Get Minikube IP
minikube ip

# Get NodePort
kubectl get service frontend-service

# Access at: http://<minikube-ip>:<node-port>
```

---

For detailed deployment guide, see [KUBERNETES_DEPLOYMENT.md](KUBERNETES_DEPLOYMENT.md)
