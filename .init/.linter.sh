#!/bin/bash
cd /home/kavia/workspace/code-generation/learning-management-platform-185834-185843/react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

