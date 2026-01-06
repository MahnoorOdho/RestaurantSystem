# RestaurantSystem - Frontend

A modern restaurant management system built with React, Vite, and Playwright for E2E testing.

## 🚀 Features

- **Menu Display** - Browse restaurant menu with images and prices
- **Order Management** - Place orders with real-time order summary
- **Reservation System** - Book tables with date/time selection
- **Contact Form** - Send inquiries and feedback
- **Admin Dashboard** - Manage menu items, orders, and reservations
- **Responsive Design** - Mobile-friendly interface

## 🛠 Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Testing:** Playwright
- **Styling:** CSS3 with custom animations

## 📦 Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers (for testing)
npx playwright install
```

## 🏃 Running the Application

### Development Mode
```bash
# Start dev server on port 3000
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧪 Testing

### Test Suite
- **31 comprehensive test cases** across 5 test suites
- **Page Object Model** pattern for maintainability
- **E2E, Integration, and Functional** tests

### Run Tests
```bash
# Run all tests
npm test

# Run specific test suite
npm test tests/menu.spec.ts
npm test tests/order.spec.ts
npm test tests/reservation.spec.ts
npm test tests/contact.spec.ts
npm test tests/e2e.spec.ts

# Run with UI mode (interactive)
npm run test:ui

# Run in headed mode (see browser)
npm run test:headed

# Run specific test by name
npm test -- --grep "TC-MENU-001"

# View test report
npm run test:report
```

### Test Coverage
- ✅ Menu Service: 5 tests
- ✅ Order Service: 6 tests
- ✅ Reservation Service: 6 tests
- ✅ Contact Service: 8 tests
- ✅ End-to-End Flows: 6 tests

## 📁 Project Structure

```
restaurant-frontend/
├── src/
│   ├── components/         # React components
│   │   ├── MenuForm.jsx
│   │   ├── OrderForm.jsx
│   │   ├── ReservationForm.jsx
│   │   ├── ContactForm.jsx
│   │   └── ...
│   ├── pages/              # Page components
│   │   └── Home.jsx
│   ├── config.js           # API configuration
│   └── main.jsx            # Application entry point
├── tests/                  # Playwright test specs
│   ├── menu.spec.ts
│   ├── order.spec.ts
│   ├── reservation.spec.ts
│   ├── contact.spec.ts
│   └── e2e.spec.ts
├── pages/                  # Page Object Models
│   ├── MenuPage.ts
│   ├── OrderPage.ts
│   ├── ReservationPage.ts
│   └── ContactPage.ts
├── fixtures/               # Test data
│   └── test-data.ts
├── docs/                   # Documentation
│   ├── TEST_CASES.md
│   └── WEBSITE_ALIGNMENT_UPDATES.md
└── playwright.config.ts    # Playwright configuration
```

## 🔗 API Configuration

The application connects to a backend API hosted on Render.com:
- **API URL:** `https://restaurantsystemapigateway.onrender.com`
- **Endpoints:**
  - `GET /api/menu` - Fetch menu items
  - `POST /api/orders` - Place an order
  - `POST /api/reservation` - Create reservation
  - `POST /api/contact` - Send contact message

## 🌐 Routes

- `/` - Home page with image slider
- `/menu` - View full menu
- `/order` - Place an order
- `/reservation` - Make a reservation
- `/contact` - Contact form
- `/admin` - Admin dashboard

## 📝 Environment Setup

### Port Configuration
The application runs on **port 3000** by default. This is configured in:
- `vite.config.js` - Development server port
- `playwright.config.ts` - Test base URL

### Changing Port
To use a different port, update both files:

**vite.config.js:**
```javascript
server: {
  port: YOUR_PORT,
  // ...
}
```

**playwright.config.ts:**
```typescript
use: {
  baseURL: 'http://localhost:YOUR_PORT',
  // ...
}
```

## 🐛 Troubleshooting

### Tests Failing?
1. **Check if dev server is running:** `npm run dev`
2. **Verify port 3000 is available**
3. **Check API connectivity** - Tests use production API
4. **Clear browser cache:** `npx playwright cache clear`
5. **Reinstall browsers:** `npx playwright install --force`

### Application Not Loading?
1. **Check console for errors**
2. **Verify API URL in** `src/config.js`
3. **Check network tab** - API calls should return 200
4. **Try clearing npm cache:** `npm cache clean --force`

## 📚 Documentation

- [Test Cases Documentation](./docs/TEST_CASES.md)
- [Website Alignment Updates](./docs/WEBSITE_ALIGNMENT_UPDATES.md)
- [Running Tests Guide](./RUNNING_TESTS.md)
- [Test Setup Complete](./TEST_SETUP_COMPLETE.md)
- [Errors Fixed](./ERRORS_FIXED.md)

## 🎯 Key Commands

```bash
# Development
npm run dev              # Start dev server (port 3000)
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm test                 # Run all tests
npm run test:ui          # Interactive test UI
npm run test:headed      # Run with visible browser
npm run test:report      # View HTML report

# Utilities
npm run lint             # Run ESLint
npx playwright codegen   # Generate test code
npx playwright test --debug  # Debug mode
```

## 📞 Support

For issues or questions:
- **Phone:** 0311-1118882
- **Email:** Contact through the application
- **GitHub Issues:** [Create an issue](https://github.com/yourusername/RestaurantSystem/issues)

## 📄 License

This project is part of a restaurant management system portfolio project.

---

**Built with ❤️ using React + Vite + Playwright**
```
