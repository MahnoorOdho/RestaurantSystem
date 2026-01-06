#!/bin/bash

# RestaurantSystem Test Setup Verification Script
# This script checks if all prerequisites are met for running tests

echo "=========================================="
echo "RestaurantSystem Test Setup Verification"
echo "=========================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check counter
CHECKS_PASSED=0
TOTAL_CHECKS=0

check_command() {
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✓${NC} $1 is installed"
        CHECKS_PASSED=$((CHECKS_PASSED + 1))
        return 0
    else
        echo -e "${RED}✗${NC} $1 is NOT installed"
        return 1
    fi
}

check_port() {
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    if lsof -i:$1 &> /dev/null; then
        echo -e "${GREEN}✓${NC} Port $1 is in use ($2)"
        CHECKS_PASSED=$((CHECKS_PASSED + 1))
        return 0
    else
        echo -e "${YELLOW}⚠${NC} Port $1 is NOT in use ($2)"
        return 1
    fi
}

check_file() {
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} File exists: $2"
        CHECKS_PASSED=$((CHECKS_PASSED + 1))
        return 0
    else
        echo -e "${RED}✗${NC} File missing: $2"
        return 1
    fi
}

check_dir() {
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} Directory exists: $2"
        CHECKS_PASSED=$((CHECKS_PASSED + 1))
        return 0
    else
        echo -e "${RED}✗${NC} Directory missing: $2"
        return 1
    fi
}

echo "1. Checking System Requirements"
echo "--------------------------------"
check_command node
check_command npm
check_command docker
check_command docker-compose
echo ""

echo "2. Checking Project Structure"
echo "------------------------------"
check_dir "tests" "Test directory"
check_dir "pages" "Page Objects directory"
check_dir "fixtures" "Fixtures directory"
check_dir "utils" "Utils directory"
check_file "playwright.config.ts" "Playwright config"
check_file "tsconfig.json" "TypeScript config"
check_file "package.json" "Package config"
echo ""

echo "3. Checking Test Files"
echo "----------------------"
check_file "tests/contact.spec.ts" "Contact tests"
check_file "tests/menu.spec.ts" "Menu tests"
check_file "tests/order.spec.ts" "Order tests"
check_file "tests/reservation.spec.ts" "Reservation tests"
check_file "tests/e2e.spec.ts" "E2E tests"
echo ""

echo "4. Checking Page Object Models"
echo "-------------------------------"
check_file "pages/ContactPage.ts" "ContactPage POM"
check_file "pages/MenuPage.ts" "MenuPage POM"
check_file "pages/OrderPage.ts" "OrderPage POM"
check_file "pages/ReservationPage.ts" "ReservationPage POM"
echo ""

echo "5. Checking Configuration Files"
echo "--------------------------------"
check_file "fixtures/test-data.ts" "Test data fixtures"
check_file "utils/helpers.ts" "Helper utilities"
echo ""

echo "6. Checking Services (Optional - may be down)"
echo "----------------------------------------------"
check_port 5173 "Frontend (Vite)"
check_port 4000 "API Gateway"
check_port 3001 "Menu Service"
check_port 3002 "Order Service"
check_port 3003 "Reservation Service"
check_port 3004 "Contact Service"
echo ""

echo "7. Checking Node Modules"
echo "------------------------"
if [ -d "node_modules/@playwright" ]; then
    echo -e "${GREEN}✓${NC} Playwright is installed"
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
else
    echo -e "${RED}✗${NC} Playwright is NOT installed"
    echo "   Run: npm install"
fi
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))

if [ -d "node_modules/typescript" ]; then
    echo -e "${GREEN}✓${NC} TypeScript is installed"
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
else
    echo -e "${RED}✗${NC} TypeScript is NOT installed"
    echo "   Run: npm install"
fi
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
echo ""

# Summary
echo "=========================================="
echo "Summary: $CHECKS_PASSED/$TOTAL_CHECKS checks passed"
echo "=========================================="
echo ""

if [ $CHECKS_PASSED -eq $TOTAL_CHECKS ]; then
    echo -e "${GREEN}✓ All checks passed! You're ready to run tests.${NC}"
    echo ""
    echo "To run tests:"
    echo "  npm test              # Run all tests"
    echo "  npm run test:ui       # Run in UI mode"
    echo "  npm run test:headed   # Run with visible browser"
    exit 0
elif [ $CHECKS_PASSED -ge $((TOTAL_CHECKS * 2 / 3)) ]; then
    echo -e "${YELLOW}⚠ Most checks passed. Review warnings above.${NC}"
    echo ""
    echo "Missing services? Start them with:"
    echo "  Terminal 1: cd restaurant-backend && docker-compose up"
    echo "  Terminal 2: cd restaurant-frontend && npm run dev"
    echo "  Terminal 3: npm test"
    exit 0
else
    echo -e "${RED}✗ Several checks failed. Please review errors above.${NC}"
    echo ""
    echo "Common fixes:"
    echo "  1. Install dependencies: npm install"
    echo "  2. Install Playwright browsers: npx playwright install"
    echo "  3. Start backend: cd restaurant-backend && docker-compose up"
    echo "  4. Start frontend: npm run dev"
    exit 1
fi

