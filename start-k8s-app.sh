#!/bin/bash

echo "🚀 Starting port-forwarding for BookStore Kubernetes app..."
echo ""
echo "📡 Frontend will be available at: http://localhost:5173"
echo "📡 Backend will be available at: http://localhost:5555"
echo ""
echo "Press Ctrl+C to stop"
echo ""

# Start both port-forwards in the background
kubectl port-forward service/frontend-service 5173:80 &
PID1=$!

kubectl port-forward service/backend-service 5555:5555 &
PID2=$!

# Wait for both processes and handle Ctrl+C
trap "kill $PID1 $PID2 2>/dev/null; echo; echo 'Port forwarding stopped.'; exit" INT TERM

# Keep script running
wait
