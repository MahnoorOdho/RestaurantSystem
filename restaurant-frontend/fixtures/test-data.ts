/**
 * Test Data Fixtures for RestaurantSystem
 * Centralized test data for all test suites
 */

// Menu Test Data
export const menuData = {
  validItem: {
    name: "Pizza",
    category: "Main Course",
    price: 12.99,
    description: "Delicious cheese pizza"
  },
  searchQuery: "pizza",
  categories: ["Main Course", "Appetizers", "Desserts", "Beverages"]
};

// Order Test Data
export const orderData = {
  customer: {
    name: "John Doe",
    email: "john.doe@test.com",
    address: "123 Main Street, Test City, TC 12345",
    phone: "+1234567890"
  },
  validOrder: {
    name: "Test Customer",
    email: "test@example.com",
    address: "456 Test Avenue",
    phone: "+9876543210",
    quantity: 2
  }
};

// Reservation Test Data
export const reservationData = {
  valid: {
    name: "Alice Smith",
    email: "alice.smith@test.com",
    date: "2026-02-15",
    time: "18:00",
    guests: 4
  },
  pastDate: {
    name: "Bob Wilson",
    email: "bob.wilson@test.com",
    date: "2020-01-01",
    time: "19:00",
    guests: 2
  }
};

// Contact Test Data
export const contactData = {
  valid: {
    name: "Charlie Brown",
    email: "charlie.brown@test.com",
    message: "I would like to inquire about your catering services."
  },
  withSpecialChars: {
    name: "Special User",
    email: "special@test.com",
    message: "Testing special chars: @#$%^&*()_+-=[]{}|;:,.<>?/"
  }
};

// Helper function to generate future dates
export const generateFutureDate = (daysFromNow: number = 7): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
};

// Helper function to generate past dates
export const generatePastDate = (daysAgo: number = 7): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

// API Endpoints
export const apiEndpoints = {
  menu: '/api/menu',
  orders: '/api/orders',
  reservations: '/api/reservation',
  contact: '/api/contact'
};

