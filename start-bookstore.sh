#!/bin/bash

# BookStore App - Kubernetes Startup Script
# This script checks if everything is ready and starts the application

echo "🔍 Checking Kubernetes status..."

# Check if Minikube is running
if ! minikube status | grep -q "Running"; then
    echo "⚠️  Minikube is not running. Starting Minikube..."
    minikube start
    if [ $? -ne 0 ]; then
        echo "❌ Failed to start Minikube"
        exit 1
    fi
    echo "✅ Minikube started"
else
    echo "✅ Minikube is already running"
fi

# Check if pods are running
echo "🔍 Checking if pods are running..."
BACKEND_READY=$(kubectl get pods -l app=backend -o jsonpath='{.items[*].status.containerStatuses[0].ready}' | grep -o "true" | wc -l)
FRONTEND_READY=$(kubectl get pods -l app=frontend -o jsonpath='{.items[*].status.containerStatuses[0].ready}' | grep -o "true" | wc -l)

if [ "$BACKEND_READY" -lt 1 ] || [ "$FRONTEND_READY" -lt 1 ]; then
    echo "⚠️  Some pods are not ready yet. Waiting..."
    kubectl wait --for=condition=ready pod -l app=backend --timeout=60s
    kubectl wait --for=condition=ready pod -l app=frontend --timeout=60s
fi

echo "✅ All pods are ready"

# Kill any existing port-forwards
echo "🧹 Cleaning up old port-forwards..."
pkill -f "kubectl port-forward" 2>/dev/null

# Start port-forwarding
echo "🌐 Starting port-forwarding..."
nohup kubectl port-forward service/backend-service 5555:5555 > /tmp/backend-pf.log 2>&1 &
BACKEND_PF_PID=$!

nohup kubectl port-forward service/frontend-service 5173:80 > /tmp/frontend-pf.log 2>&1 &
FRONTEND_PF_PID=$!

# Wait a moment for port-forwards to establish
sleep 3

# Test if services are accessible
echo "🧪 Testing services..."
if curl -s http://localhost:5555/ > /dev/null 2>&1; then
    echo "✅ Backend is accessible at http://localhost:5555"
else
    echo "⚠️  Backend might not be ready yet, but port-forward is running"
fi

if curl -s http://localhost:5173/ > /dev/null 2>&1; then
    echo "✅ Frontend is accessible at http://localhost:5173"
else
    echo "⚠️  Frontend might not be ready yet, but port-forward is running"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 BookStore App is ready!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📱 Open your browser and navigate to:"
echo "   👉 http://localhost:5173"
echo ""
echo "📊 Kubernetes Dashboard:"
echo "   Backend pods:  $BACKEND_READY running"
echo "   Frontend pods: $FRONTEND_READY running"
echo ""
echo "🛑 To stop the app:"
echo "   pkill -f 'kubectl port-forward'"
echo ""
echo "📝 Logs:"
echo "   Backend:  tail -f /tmp/backend-pf.log"
echo "   Frontend: tail -f /tmp/frontend-pf.log"
echo ""
echo "Port-forward PIDs: Backend=$BACKEND_PF_PID Frontend=$FRONTEND_PF_PID"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
