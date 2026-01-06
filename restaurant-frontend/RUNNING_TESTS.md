# RestaurantSystem - Test Execution Guide

## ✅ Test Suite Status

All test files have been created and configured successfully!

### 📂 Project Structure

```
restaurant-frontend/
├── tests/
│   ├── contact.spec.ts        ✅ 8 tests (TC-CONTACT-001 to TC-CONTACT-008)
│   ├── menu.spec.ts           ✅ 5 tests (TC-MENU-001 to TC-MENU-005)
│   ├── order.spec.ts          ✅ 6 tests (TC-ORDER-001 to TC-ORDER-006)
│   ├── reservation.spec.ts    ✅ 6 tests (TC-RESERVATION-001 to TC-RESERVATION-006)
│   └── e2e.spec.ts            ✅ 6 tests (TC-E2E-001 to TC-E2E-006)
├── pages/
│   ├── ContactPage.ts         ✅ Complete Page Object Model
│   ├── MenuPage.ts            ✅ Complete Page Object Model
│   ├── OrderPage.ts           ✅ Complete Page Object Model
│   └── ReservationPage.ts     ✅ Complete Page Object Model
├── fixtures/
│   └── test-data.ts           ✅ All test data configured
├── utils/
│   └── helpers.ts             ✅ Helper functions ready
├── playwright.config.ts       ✅ Configured
├── tsconfig.json              ✅ Configured
└── package.json               ✅ All scripts ready
```

## 🎯 Total Test Coverage

- **31 Automated Tests** across 5 test suites
- **4 Page Object Models** for maintainability
- **Complete test data fixtures** for consistency
- **Helper utilities** for common operations

---

## 🚀 How to Run Tests

### Step 1: Prerequisites

Make sure you have:
- Node.js 18+ installed
- Docker and Docker Compose running
- All dependencies installed

```bash
cd restaurant-frontend
npm install
```

### Step 2: Install Playwright Browsers

```bash
npx playwright install chromium
```

### Step 3: Start the Application

**Terminal 1 - Start Backend Services:**
```bash
cd restaurant-backend
docker-compose up
```

Wait for all services to start:
- MongoDB
- API Gateway (port 4000)
- Menu Service (port 3001)
- Order Service (port 3002)
- Reservation Service (port 3003)
- Contact Service (port 3004)

**Terminal 2 - Start Frontend:**
```bash
cd restaurant-frontend
npm run dev
```

Application should be running at http://localhost:5173

### Step 4: Run the Tests

**Terminal 3 - Run Tests:**

```bash
cd restaurant-frontend

# Run all tests
npm test

# Run with headed browser (see test execution)
npm run test:headed

# Run in UI mode (interactive, recommended)
npm run test:ui

# Run specific test suite
npm run test:contact
npm run test:menu
npm run test:order
npm run test:reservation
npm run test:e2e

# Run single test file
npx playwright test tests/menu.spec.ts

# Run single test case
npx playwright test --grep "TC-MENU-001"

# Debug mode
npm run test:debug

# View test report
npm run test:report
```

---

## 📊 Test Suites Breakdown

### 1. Menu Service Tests (5 tests)

```bash
npm run test:menu
```

- **TC-MENU-001:** View all menu items (Critical)
- **TC-MENU-002:** Search menu items by name (High)
- **TC-MENU-003:** Filter menu by category (Medium)
- **TC-MENU-004:** View menu item details (Medium)
- **TC-MENU-005:** Verify menu item prices (High)

### 2. Order Service Tests (6 tests)

```bash
npm run test:order
```

- **TC-ORDER-001:** Place complete order with valid data (Critical)
- **TC-ORDER-002:** Update item quantity in cart (High)
- **TC-ORDER-003:** Edit order before checkout (High)
- **TC-ORDER-004:** Cancel order (Medium)
- **TC-ORDER-005:** Validate required fields (High)
- **TC-ORDER-006:** Complete checkout flow (Critical)

### 3. Reservation Service Tests (6 tests)

```bash
npm run test:reservation
```

- **TC-RESERVATION-001:** Create reservation with valid data (Critical)
- **TC-RESERVATION-002:** Validate past date rejection (High)
- **TC-RESERVATION-003:** Check guest count limits (Medium)
- **TC-RESERVATION-004:** Validate required fields (High)
- **TC-RESERVATION-005:** Test different time slots (Medium)
- **TC-RESERVATION-006:** Test email format validation (High)

### 4. Contact Service Tests (8 tests)

```bash
npm run test:contact
```

- **TC-CONTACT-001:** Submit contact form successfully (Critical)
- **TC-CONTACT-002:** Validate required field errors (High)
- **TC-CONTACT-003:** Validate email format (High)
- **TC-CONTACT-004:** Test message length variations (Medium)
- **TC-CONTACT-005:** Handle special characters (Low)
- **TC-CONTACT-006:** Submit multiple messages (Low)
- **TC-CONTACT-007:** Test XSS input handling (Low)
- **TC-CONTACT-008:** Verify form data not persisted (Low)

### 5. End-to-End Tests (6 tests)

```bash
npm run test:e2e
```

- **TC-E2E-001:** Complete order flow (Critical)
- **TC-E2E-002:** Complete reservation flow (Critical)
- **TC-E2E-003:** Browse menu and contact restaurant (High)
- **TC-E2E-004:** Navigate through all main pages (Medium)
- **TC-E2E-005:** Order with modifications (Medium)
- **TC-E2E-006:** Make multiple reservations (Low)

---

## 🐛 Troubleshooting

### Issue: Tests fail with connection errors

**Solution:** Make sure all services are running:
```bash
# Check Docker containers
docker ps

# Check frontend
curl http://localhost:5173

# Check API Gateway
curl http://localhost:4000/api/menu
```

### Issue: "Cannot find module" errors

**Solution:** Reinstall dependencies:
```bash
npm install
npx playwright install
```

### Issue: Tests are slow or timing out

**Solution:** Increase timeouts in playwright.config.ts:
```typescript
timeout: 60000,  // 60 seconds
```

### Issue: Browsers not found

**Solution:** Install Playwright browsers:
```bash
npx playwright install --with-deps chromium
```

---

## 📈 Test Execution Tips

### Best Practices

1. **Run tests in sequence:** Use `workers: 1` in playwright.config.ts
2. **Start fresh:** Clear browser data between test runs
3. **Check logs:** Enable verbose logging for debugging
4. **Use UI mode:** Great for debugging failing tests

### Debugging Failed Tests

```bash
# Run with trace
npx playwright test --trace on

# Show trace viewer
npx playwright show-trace trace.zip

# Run with screenshot on failure (default)
npm test

# Open last HTML report
npx playwright show-report
```

---

## 📝 Test Data

Test data is centralized in `fixtures/test-data.ts`:

- **Menu data:** Sample menu items for testing
- **Order data:** Customer information templates
- **Reservation data:** Valid/invalid reservation scenarios
- **Contact data:** Message templates

You can modify test data in this file to test different scenarios.

---

## 🔧 Configuration Files

### playwright.config.ts
- Browser settings
- Timeouts
- Reporters
- Base URL
- Screenshot/video settings

### tsconfig.json
- TypeScript compilation settings
- Module resolution
- Target ES version

### package.json
- Test scripts
- Dependencies
- Project metadata

---

## 📖 Additional Documentation

For detailed test case documentation, see:
- `docs/TEST_CASES.md` - Complete test case specifications
- `docs/ANALYSIS_SUMMARY.md` - Project analysis and architecture
- `TEST_README.md` - Extended testing guide

---

## ✅ Verification Checklist

Before running tests, verify:

- [ ] All Docker containers are running
- [ ] Frontend is accessible at http://localhost:5173
- [ ] API Gateway responds at http://localhost:4000
- [ ] Playwright browsers are installed
- [ ] No port conflicts (5173, 4000, 3001-3004)

---

## 🎉 Success!

If everything is set up correctly, you should see output like:

```
Running 31 tests using 1 worker

  ✓  1 [chromium] › menu.spec.ts:22:3 › Menu Service Tests › TC-MENU-001 (3.2s)
  ✓  2 [chromium] › menu.spec.ts:52:3 › Menu Service Tests › TC-MENU-002 (2.1s)
  ...
  
  31 passed (2.5m)
```

---

## 📧 Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Review test execution logs
3. Verify all prerequisites are met
4. Check Docker logs: `docker-compose logs`
5. Check frontend logs in the browser console

---

**Happy Testing! 🚀**

