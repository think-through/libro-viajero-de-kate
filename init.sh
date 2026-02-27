#!/bin/bash

# ==========================================
# RALPH PROTOCOL - INITIALIZATION SCRIPT
# ==========================================
# Purpose:  Sanitize the environment, verify Ralph state files,
#           and ensure the codebase is build-ready for the Agent.
# Usage:    ./init.sh
# ==========================================

set -e

echo "🤖 [RALPH] Initializing Agent Environment..."

# ------------------------------------------
# 2. FILE SYSTEM & RALPH STATE CHECKS
# ------------------------------------------
echo "🔍 [RALPH] Checking Protocol State Files..."

if [ ! -d ".prompts" ]; then
    echo "   + Creating .prompts/ directory (Hidden Workspace)..."
    mkdir .prompts
fi

if [ ! -f "progress.md" ]; then
    echo "   + Creating empty progress.md..."
    echo "# RALPH AGENT LOG" > progress.md
    echo "No history yet." >> progress.md
fi

if [ ! -f "feature_list.json" ]; then
    echo "   + Creating empty feature_list.json..."
    echo '{ "features": [], "current_status": "idle" }' > feature_list.json
fi

echo "   ✅ Ralph State Files: OK"

# ------------------------------------------
# 3. NODE ENVIRONMENT CHECKS
# ------------------------------------------
#
echo "📦 [RALPH] Checking Node Dependencies..."

if [ ! -d "node_modules" ]; then
    echo "   ! node_modules missing. Installing dependencies..."
    npm install
else
    
    if ! npm ls --depth=0 > /dev/null 2>&1; then
        echo "   ! Dependencies out of sync. Running npm install..."
        npm install
    fi
    set -e # Re-enable fail-fast
fi

echo "   ✅ Node Environment: OK"

# ------------------------------------------
# 4. TYPE SAFETY & BUILD CHECK
# ------------------------------------------
#
echo "🛡️ [RALPH] Verifying TypeScript Integrity..."

if npm run type-check; then
    echo "   ✅ TypeScript Check: PASSED"
else
    echo "   ❌ TypeScript Check: FAILED"
    echo "      (Agent Note: Please fix type errors before starting new features)"
    # We do NOT exit here because the Agent's job might be to FIX these errors.
    # We just warn loudly.
fi

# ------------------------------------------
# 5. ENVIRONMENT VARIABLES (Optional but Recommended)
# ------------------------------------------
#
if [ ! -f ".env" ] && [ ! -f ".env.local" ]; then
    echo "⚠️ [RALPH] Warning: No .env file found. Ensure Mapbox tokens are set."
fi

echo "🚀 [RALPH] Initialization Complete. Ready for instructions."
