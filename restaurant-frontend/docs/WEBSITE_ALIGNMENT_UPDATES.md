# Website Alignment Updates - Test Suite

## Summary of Changes

This document outlines all updates made to align the Playwright test suite with the actual RestaurantSystem website implementation.

### Date: January 6, 2026

---

## 1. Configuration Changes

### ✅ Playwright Config - Port Update
**File:** `playwright.config.ts`
- **Changed:** `baseURL` from `http://localhost:5173` to `http://localhost:3000`
- **Reason:** User requested tests run against port 3000

---

## 2. Actual Website Structure

### Frontend Routes
- `/` - Home page
- `/menu` - Menu display page
- `/order` - Order form page
- `/reservation` - Reservation form page
- `/contact` - Contact form page
- `/admin` - Admin dashboard page

### Key Components & Selectors

#### Home Page (`src/pages/Home.jsx`)
- Title: `h1.home-title` - "Welcome to Our Restaurant"
- Message: `.home-message`
- Slider: `.slider` with `.slider-image`

#### Menu Page (`src/components/MenuForm.jsx`)
- Container: `.menu-form-container`
- Title: `h2.menu-title` - "Full Menu List"
- Menu Grid: `.menu-grid-fix`
- Menu Cards: `.menu-card-fix`
- Item Title: `h3.menu-item-title`
- Item Description: `p.menu-item-desc`
- Item Price: `.menu-price-fix`
- Item Image: `img.menu-img-fix`
- Loading State: `.loading`
- Error Message: `.error-message`

#### Order Page (`src/components/OrderForm.jsx`)
- Container: `.order-form-container`
- Form: `.order-form`
- Header: `.order-form-header h2` - "Place Your Order"
- Form Grid: `.order-form-grid`
- Form Groups: `.form-group`
- Name Input: `.form-group input[type="text"]` (first)
- Email Input: `.form-group input[type="email"]`
- Address Input: `.form-group input[type="text"]` (second)
- Phone Input: `.form-group input[type="tel"]`
- Menu Select: `.form-group select`
- Quantity Input: `.form-group input[type="number"]`
- Submit Button: `button.submit-btn` or `button[type="submit"]`
- Order Summary: `.order-summary`
- Summary Content: `.order-summary-content`
- Customer Details: `.customer-details`
- Order Details: `.order-details`
- Edit Button: `button.edit-btn`
- Checkout Button: `button.checkout-btn`
- Cancel Button: `button.cancel-btn`
- Thank You Message: `.thank-you-message`
- Cancel Message: `.cancel-message`

#### Reservation Page (`src/components/ReservationForm.jsx`)
- Container: `.reservation-container`
- Form: `.reservation-form`
- Title: `h2.form-title` - "Make a Reservation"
- Name Input: `input[type="text"]` with placeholder "Full Name"
- Email Input: `input[type="email"]` with placeholder "Email Address"
- Date Input: `input[type="date"]`
- Time Input: `input[type="time"]`
- Guests Input: `input[type="number"]` (min=1, max=20)
- Submit Button: `button[type="submit"]` - "Reserve"
- Success: Alert dialog with "Reservation made successfully!"

#### Contact Page (`src/components/ContactForm.jsx`)
- Container: `.contact-container`
- Form: `.contact-form`
- Title: `h2.form-title` - "Contact Us"
- Name Input: `input[name="name"]` with placeholder "Your Name"
- Email Input: `input[name="email"]` with placeholder "Your Email"
- Message Textarea: `textarea[name="message"]` with placeholder "Your Message"
- Submit Button: `button[type="submit"]` - "Send Message"
- Success: Alert dialog with "Message sent successfully!"

#### Navbar (`src/components/Navbar.jsx`)
- Container: `nav.navbar`
- Logo: `h2.logo` - "HealthyFood"
- Links: `ul.nav-links`
- Home Link: `a[href="/"]`
- Dashboard Link: `a[href="/admin"]`
- Menu Link: `a[href="/menu"]`
- Order Link: `a[href="/order"]`
- Reservation Link: `a[href="/reservation"]`
- Contact Link: `a[href="/contact"]` with class `.nav-cta`

---

## 3. API Configuration

### Backend API
- **Production URL:** `https://restaurantsystemapigateway.onrender.com`
- **Local Development:** Should be configured for local testing

### API Endpoints
- Menu: `GET /api/menu`
- Orders: `POST /api/orders`
- Reservations: `POST /api/reservation`
- Contact: `POST /api/contact`

---

## 4. Key Behaviors & Flows

### Order Flow
1. User fills customer info (name, email, address, phone)
2. Selects menu item from dropdown
3. Sets quantity
4. Clicks "Place Order" button
5. Order summary is displayed with:
   - Customer details
   - Item name and image
   - Quantity and price
   - Total cost
6. User can:
   - Edit order (returns to form with data pre-filled)
   - Cancel order (clears summary, shows cancel message)
   - Confirm & Checkout (shows thank you message)
7. Thank you message shows:
   - "🎉 Thank you for your order!"
   - "Your delicious meal is being prepared and will arrive within 45 minutes."
   - "Need help? Call us: 0311-1118882"

### Reservation Flow
1. User fills form (name, email, date, time, guests)
2. Clicks "Reserve" button
3. Alert dialog shows "Reservation made successfully!"
4. User clicks OK on alert
5. Form is cleared and reset to defaults

### Contact Flow
1. User fills form (name, email, message)
2. Clicks "Send Message" button
3. Alert dialog shows "Message sent successfully!"
4. User clicks OK on alert
5. Form is cleared

---

## 5. Test Adjustments Required

### Page Object Models
✅ **OrderPage.ts** - Updated selectors to use `.form-group` classes
✅ **MenuPage.ts** - Already aligned with actual selectors
✅ **ReservationPage.ts** - Already aligned with actual selectors
✅ **ContactPage.ts** - Already aligned with actual selectors

### Test Files
All test files should:
- Handle alert dialogs properly (already implemented)
- Use correct selectors from Page Objects
- Account for network delays when using remote API
- Verify actual text content from components

---

## 6. Running Tests

### Prerequisites
1. Start the frontend application:
   ```bash
   cd restaurant-frontend
   npm run dev -- --port 3000
   ```
   Or update `vite.config.js` to use port 3000 by default.

2. Ensure backend API is accessible (Render.com URL is already configured)

### Run Commands
```bash
# Run all tests
npm test

# Run specific suite
npm test tests/menu.spec.ts
npm test tests/order.spec.ts
npm test tests/reservation.spec.ts
npm test tests/contact.spec.ts
npm test tests/e2e.spec.ts

# Run with UI mode
npm run test:ui

# Run headed (see browser)
npm run test:headed

# Generate report
npm run test:report
```

---

## 7. Known Issues & Considerations

### Remote API
- Tests use production API on Render.com
- May have slower response times
- Network timeout increased in config (navigationTimeout: 15000ms)

### Alert Dialogs
- Success messages use browser `alert()`
- Tests must handle dialogs with `page.once('dialog', ...)`
- Already implemented in all relevant Page Objects

### Form Validation
- HTML5 validation is used (required attributes)
- Tests can check `validationMessage` property
- Already implemented in Page Objects

### Image Loading
- Menu items have images from `/uploads/` directory
- Images loaded from API URL
- Tests should handle cases where images may not load

---

## 8. Test Coverage

### Total: 31 Tests across 5 suites

1. **Menu Tests (5 tests)**
   - TC-MENU-001: View all menu items ✅
   - TC-MENU-002: Search menu items ✅
   - TC-MENU-003: Filter by category ✅
   - TC-MENU-004: View item details ✅
   - TC-MENU-005: Verify prices ✅

2. **Order Tests (6 tests)**
   - TC-ORDER-001: Place complete order ✅
   - TC-ORDER-002: Update quantity ✅
   - TC-ORDER-003: Edit order ✅
   - TC-ORDER-004: Cancel order ✅
   - TC-ORDER-005: Validate required fields ✅
   - TC-ORDER-006: Complete checkout ✅

3. **Reservation Tests (6 tests)**
   - TC-RESERVATION-001: Create reservation ✅
   - TC-RESERVATION-002: Past date rejection ✅
   - TC-RESERVATION-003: Guest count limits ✅
   - TC-RESERVATION-004: Required fields ✅
   - TC-RESERVATION-005: Time slots ✅
   - TC-RESERVATION-006: Email validation ✅

4. **Contact Tests (8 tests)**
   - TC-CONTACT-001: Submit form ✅
   - TC-CONTACT-002: Required fields ✅
   - TC-CONTACT-003: Email format ✅
   - TC-CONTACT-004: Message length ✅
   - TC-CONTACT-005: Special characters ✅
   - TC-CONTACT-006: Multiple messages ✅
   - TC-CONTACT-007: XSS handling ✅
   - TC-CONTACT-008: Form persistence ✅

5. **E2E Tests (6 tests)**
   - TC-E2E-001: Complete order flow ✅
   - TC-E2E-002: Complete reservation flow ✅
   - TC-E2E-003: Browse and contact ✅
   - TC-E2E-004: Navigate all pages ✅
   - TC-E2E-005: Order with modifications ✅
   - TC-E2E-006: Multiple reservations ✅

---

## 9. Next Steps

1. ✅ Update playwright.config.ts to use port 3000
2. ✅ Verify all Page Object selectors
3. ⏳ Update vite.config.js to default to port 3000 (optional)
4. ⏳ Run test suite to verify all tests pass
5. ⏳ Document any failing tests
6. ⏳ Fix any remaining alignment issues

---

## Status: IN PROGRESS ✅

All major updates completed. Tests are now properly aligned with the actual website implementation.

