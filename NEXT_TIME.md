# 🎯 NEXT TIME - How to Start Your BookStore App

## The Easiest Way (Recommended) 🚀

Just run this single command:

```bash
cd ~/bookstore-project && ./start-bookstore.sh
```

Then open **http://localhost:5173** in your browser!

---

## Manual Method (Step by Step) 📝

### 1. Start Minikube
```bash
minikube start
```

### 2. Start Port Forwarding

**Option A - Using background processes:**
```bash
cd ~/bookstore-project
nohup kubectl port-forward service/backend-service 5555:5555 > /tmp/backend-pf.log 2>&1 &
nohup kubectl port-forward service/frontend-service 5173:80 > /tmp/frontend-pf.log 2>&1 &
```

**Option B - Using the script:**
```bash
cd ~/bookstore-project
./start-k8s-app.sh
```
*(Keep this terminal open, press Ctrl+C to stop)*

### 3. Open Your Browser
Navigate to: **http://localhost:5173**

---

## Stopping the App 🛑

```bash
# Stop port forwarding
pkill -f "kubectl port-forward"

# Stop Minikube (optional)
minikube stop
```

---

## Quick Troubleshooting 🔧

### App not loading?
```bash
# Check if pods are running
kubectl get pods

# All should show "Running" - if not, wait a minute and check again
```

### Port already in use?
```bash
# Kill existing port-forwards
pkill -f "kubectl port-forward"

# Try again
./start-bookstore.sh
```

### Minikube issues?
```bash
# Restart Minikube
minikube stop
minikube start
```

---

## That's It! 🎉

The easiest command to remember:
```bash
cd ~/bookstore-project && ./start-bookstore.sh
```

For more details, check [START_APP.md](START_APP.md)
