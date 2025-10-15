# 🚀 Quick Start Guide - BookStore Kubernetes App

## Starting Your BookStore App (Next Time)

### Step 1: Start Minikube
```bash
minikube start
```

### Step 2: Start Port Forwarding
Run the convenient script:
```bash
cd ~/bookstore-project
./start-k8s-app.sh
```

**OR** manually run both port-forwards:
```bash
# In terminal 1 - Frontend
kubectl port-forward service/frontend-service 5173:80

# In terminal 2 - Backend  
kubectl port-forward service/backend-service 5555:5555
```

**OR** run them in background:
```bash
nohup kubectl port-forward service/backend-service 5555:5555 > /tmp/backend-pf.log 2>&1 &
nohup kubectl port-forward service/frontend-service 5173:80 > /tmp/frontend-pf.log 2>&1 &
```

### Step 3: Open Your Browser
Navigate to: **http://localhost:5173**

That's it! Your app is now running! 🎉

---

## Stopping the Application

### Stop Port Forwarding
```bash
# If using the script, press Ctrl+C

# If running in background, kill the processes:
pkill -f "kubectl port-forward"
```

### Stop Minikube (Optional)
```bash
minikube stop
```

---

## Checking Status

### Verify Everything is Running
```bash
# Check Minikube status
minikube status

# Check all pods
kubectl get pods

# Check services
kubectl get services
```

### View Logs
```bash
# Backend logs
kubectl logs -l app=backend --tail=50

# Frontend logs  
kubectl logs -l app=frontend --tail=50
```

---

## Troubleshooting

### Issue: Port forwarding not working
**Solution:**
```bash
# Kill existing port-forwards
pkill -f "kubectl port-forward"

# Restart them
nohup kubectl port-forward service/backend-service 5555:5555 > /tmp/backend-pf.log 2>&1 &
nohup kubectl port-forward service/frontend-service 5173:80 > /tmp/frontend-pf.log 2>&1 &
```

### Issue: Pods not running
**Solution:**
```bash
# Check pod status
kubectl get pods

# If pods are not ready, check logs
kubectl logs <pod-name>

# Restart deployments if needed
kubectl rollout restart deployment backend-deployment
kubectl rollout restart deployment frontend-deployment
```

### Issue: Minikube is stopped
**Solution:**
```bash
minikube start
```

### Issue: Need to rebuild after code changes
**Solution:**
```bash
# 1. Use Minikube's Docker
eval $(minikube docker-env)

# 2. Rebuild images
docker build -t bookstore-project-backend:latest ./backend
docker build -t bookstore-project-frontend:latest ./frontend

# 3. Restart deployments
kubectl rollout restart deployment backend-deployment
kubectl rollout restart deployment frontend-deployment
```

---

## Complete One-Liner (if Minikube is already running)

```bash
cd ~/bookstore-project && nohup kubectl port-forward service/backend-service 5555:5555 > /tmp/backend-pf.log 2>&1 & nohup kubectl port-forward service/frontend-service 5173:80 > /tmp/frontend-pf.log 2>&1 & echo "✅ App started! Open http://localhost:5173"
```

---

## Full Restart (if Minikube was stopped)

```bash
# Start everything
minikube start && cd ~/bookstore-project && nohup kubectl port-forward service/backend-service 5555:5555 > /tmp/backend-pf.log 2>&1 & nohup kubectl port-forward service/frontend-service 5173:80 > /tmp/frontend-pf.log 2>&1 & echo "✅ App started! Open http://localhost:5173"
```

---

For more detailed information, see:
- [KUBERNETES_DEPLOYMENT.md](KUBERNETES_DEPLOYMENT.md) - Full deployment guide
- [K8S_QUICK_REFERENCE.md](K8S_QUICK_REFERENCE.md) - Kubernetes commands reference
