import { test, expect } from '@playwright/test';
import { MenuPage } from '../pages/MenuPage';
import { OrderPage } from '../pages/OrderPage';
import { ReservationPage } from '../pages/ReservationPage';
import { orderData, generateFutureDate } from '../fixtures/test-data';

/**
 * Test Suite: End-to-End User Flows
 * Tests complete user journeys through the application
 */

test.describe('End-to-End Tests', () => {

  /**
   * TC-E2E-001: Complete Order Flow
   * Priority: Critical | Type: E2E
   * Flow: Home -> Menu -> Order -> Checkout -> Confirmation
   */
  test('TC-E2E-001: Complete order flow - Browse to Checkout - Priority: Critical', async ({ page }) => {
    console.log(`\n=== Starting Complete Order Flow E2E Test ===\n`);

    // Step 1: Visit homepage
    console.log(`Step 1: Navigate to homepage`);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify homepage elements
    const homeTitle = page.locator('h1.home-title');
    await expect(homeTitle).toBeVisible();
    await expect(homeTitle).toContainText('Welcome');
    console.log(`  ✓ Homepage loaded successfully`);

    // Step 2: Navigate to menu via navbar
    console.log(`\nStep 2: Navigate to menu page`);
    const menuLink = page.locator('nav a[href="/menu"]');
    await menuLink.click();
    await page.waitForLoadState('networkidle');

    // Verify menu page
    const menuPage = new MenuPage(page);
    await menuPage.verifyPageLoaded();
    await menuPage.waitForMenuItems();

    const menuItemCount = await menuPage.getMenuItemCount();
    expect(menuItemCount).toBeGreaterThan(0);
    console.log(`  ✓ Menu page loaded with ${menuItemCount} items`);

    // Step 3: Browse menu items
    console.log(`\nStep 3: Browse menu items`);
    const firstItem = await menuPage.getMenuItemDetails(0);
    console.log(`  ✓ Viewing item: ${firstItem.name}`);
    console.log(`    Price: ${firstItem.price}`);
    console.log(`    Description: ${firstItem.description}`);

    // Step 4: Navigate to order page
    console.log(`\nStep 4: Navigate to order page`);
    const orderLink = page.locator('nav a[href="/order"]');
    await orderLink.click();
    await page.waitForLoadState('networkidle');

    // Step 5: Fill order form
    console.log(`\nStep 5: Fill order form`);
    const orderPage = new OrderPage(page);
    await orderPage.verifyPageLoaded();

    const customerData = {
      name: "E2E Test Customer",
      email: "e2e.test@example.com",
      address: "789 Test Street, E2E City, TC 12345",
      phone: "+1234567890"
    };

    await orderPage.fillCustomerInfo(
      customerData.name,
      customerData.email,
      customerData.address,
      customerData.phone
    );
    console.log(`  ✓ Customer information filled`);

    // Step 6: Select menu item and quantity
    console.log(`\nStep 6: Select menu item and set quantity`);
    await orderPage.selectMenuItemByIndex(0);
    await orderPage.setQuantity(2);
    console.log(`  ✓ Selected item with quantity: 2`);

    // Step 7: Submit order
    console.log(`\nStep 7: Submit order`);
    await orderPage.submitOrder();
    await orderPage.verifyOrderSummaryDisplayed();
    console.log(`  ✓ Order submitted, summary displayed`);

    // Step 8: Review order summary
    console.log(`\nStep 8: Review order summary`);
    const summaryDetails = await orderPage.getOrderSummaryDetails();
    expect(summaryDetails.name).toContain(customerData.name);
    expect(summaryDetails.email).toContain(customerData.email);
    expect(summaryDetails.quantity).toContain('2');
    console.log(`  ✓ Order summary verified:`);
    console.log(`    Customer: ${summaryDetails.name}`);
    console.log(`    Item: ${summaryDetails.item}`);
    console.log(`    Quantity: ${summaryDetails.quantity}`);
    console.log(`    Total: ${summaryDetails.total}`);

    // Step 9: Complete checkout
    console.log(`\nStep 9: Complete checkout`);
    await orderPage.clickCheckout();
    await orderPage.verifyThankYouMessage();
    console.log(`  ✓ Order confirmed successfully`);

    // Step 10: Verify confirmation message
    console.log(`\nStep 10: Verify confirmation details`);
    const thankYouText = await orderPage.thankYouMessage.textContent();
    expect(thankYouText).toContain('Thank you');
    expect(thankYouText).toMatch(/45 minutes/i);
    console.log(`  ✓ Confirmation message displayed with delivery time`);

    console.log(`\n=== Complete Order Flow E2E Test Passed ===\n`);
  });

  /**
   * TC-E2E-002: Complete Reservation Flow
   * Priority: Critical | Type: E2E
   * Flow: Home -> Reservation -> Submit -> Confirmation
   */
  test('TC-E2E-002: Complete reservation flow - Priority: Critical', async ({ page }) => {
    console.log(`\n=== Starting Complete Reservation Flow E2E Test ===\n`);

    // Step 1: Visit homepage
    console.log(`Step 1: Navigate to homepage`);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const homeTitle = page.locator('h1.home-title');
    await expect(homeTitle).toBeVisible();
    console.log(`  ✓ Homepage loaded successfully`);

    // Step 2: Navigate to reservation page via navbar
    console.log(`\nStep 2: Navigate to reservation page`);
    const reservationLink = page.locator('nav a[href="/reservation"]');
    await reservationLink.click();
    await page.waitForLoadState('networkidle');

    // Verify reservation page
    const reservationPage = new ReservationPage(page);
    await reservationPage.verifyPageLoaded();
    console.log(`  ✓ Reservation page loaded`);

    // Step 3: Fill reservation form
    console.log(`\nStep 3: Fill reservation details`);
    const futureDate = generateFutureDate(30);
    const reservationDetails = {
      name: "E2E Test Diner",
      email: "e2e.diner@example.com",
      date: futureDate,
      time: "19:00",
      guests: 4
    };

    await reservationPage.fillReservationForm(
      reservationDetails.name,
      reservationDetails.email,
      reservationDetails.date,
      reservationDetails.time,
      reservationDetails.guests
    );

    console.log(`  ✓ Reservation details filled:`);
    console.log(`    Name: ${reservationDetails.name}`);
    console.log(`    Email: ${reservationDetails.email}`);
    console.log(`    Date: ${reservationDetails.date}`);
    console.log(`    Time: ${reservationDetails.time}`);
    console.log(`    Guests: ${reservationDetails.guests}`);

    // Step 4: Submit reservation
    console.log(`\nStep 4: Submit reservation`);
    await reservationPage.submitReservation();

    // Step 5: Verify success message
    console.log(`\nStep 5: Verify confirmation`);
    await reservationPage.verifySuccessMessage();
    console.log(`  ✓ Reservation confirmed successfully`);

    // Step 6: Verify form is reset
    console.log(`\nStep 6: Verify form reset`);
    await reservationPage.verifyFormCleared();
    console.log(`  ✓ Form cleared, ready for new reservation`);

    console.log(`\n=== Complete Reservation Flow E2E Test Passed ===\n`);
  });

  /**
   * Additional E2E Test: Browse Menu -> Contact Restaurant
   */
  test('TC-E2E-003: Browse menu and contact restaurant - Priority: High', async ({ page }) => {
    console.log(`\n=== Starting Browse and Contact Flow ===\n`);

    // Navigate to menu
    console.log(`Step 1: Browse menu`);
    await page.goto('/menu');
    await page.waitForLoadState('networkidle');

    const menuPage = new MenuPage(page);
    await menuPage.waitForMenuItems();

    const itemCount = await menuPage.getMenuItemCount();
    console.log(`  ✓ Browsed ${itemCount} menu items`);

    // Navigate to contact page
    console.log(`\nStep 2: Navigate to contact page`);
    const contactLink = page.locator('nav a[href="/contact"]');
    await contactLink.click();
    await page.waitForLoadState('networkidle');

    // Fill contact form with inquiry
    console.log(`\nStep 3: Send inquiry about menu`);
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const messageInput = page.locator('textarea[name="message"]');
    const submitButton = page.locator('button[type="submit"]');

    await nameInput.fill('Curious Customer');
    await emailInput.fill('curious@customer.com');
    await messageInput.fill('I saw your menu and have questions about allergen information for the dishes.');
    await submitButton.click();

    // Verify success
    const dialog = await page.waitForEvent('dialog');
    expect(dialog.message()).toContain('successfully');
    await dialog.accept();

    console.log(`  ✓ Contact inquiry sent successfully`);
    console.log(`\n=== Browse and Contact Flow Passed ===\n`);
  });

  /**
   * Additional E2E Test: Navigation flow through all pages
   */
  test('TC-E2E-004: Navigate through all main pages - Priority: Medium', async ({ page }) => {
    console.log(`\n=== Starting Full Navigation Flow ===\n`);

    const pages = [
      { name: 'Home', path: '/', expectedText: 'Welcome' },
      { name: 'Menu', path: '/menu', expectedText: 'Menu' },
      { name: 'Order', path: '/order', expectedText: 'Place Your Order' },
      { name: 'Reservation', path: '/reservation', expectedText: 'Reservation' },
      { name: 'Contact', path: '/contact', expectedText: 'Contact' }
    ];

    for (const pageInfo of pages) {
      console.log(`\nNavigating to ${pageInfo.name} page`);

      // Navigate via link
      if (pageInfo.path === '/') {
        const homeLink = page.locator('nav a[href="/"]');
        await homeLink.click();
      } else {
        const link = page.locator(`nav a[href="${pageInfo.path}"]`);
        await link.click();
      }

      await page.waitForLoadState('networkidle');

      // Verify page content
      const pageContent = await page.textContent('body');
      expect(pageContent).toContain(pageInfo.expectedText);

      console.log(`  ✓ ${pageInfo.name} page loaded successfully`);

      // Verify URL
      expect(page.url()).toContain(pageInfo.path);
      console.log(`  ✓ URL verified: ${pageInfo.path}`);
    }

    console.log(`\n✓ Successfully navigated through all ${pages.length} pages`);
    console.log(`\n=== Full Navigation Flow Passed ===\n`);
  });

  /**
   * Additional E2E Test: Order modification flow
   */
  test('TC-E2E-005: Order with modifications - Priority: Medium', async ({ page }) => {
    console.log(`\n=== Starting Order Modification Flow ===\n`);

    // Navigate to order page
    await page.goto('/order');
    await page.waitForLoadState('networkidle');

    const orderPage = new OrderPage(page);

    // Place initial order
    console.log(`Step 1: Place initial order`);
    await orderPage.fillCustomerInfo(
      orderData.customer.name,
      orderData.customer.email,
      orderData.customer.address,
      orderData.customer.phone
    );
    await orderPage.selectMenuItemByIndex(0);
    await orderPage.setQuantity(1);
    await orderPage.submitOrder();
    await orderPage.verifyOrderSummaryDisplayed();
    console.log(`  ✓ Initial order placed with quantity: 1`);

    // Edit order - change quantity
    console.log(`\nStep 2: Edit order (increase quantity)`);
    await orderPage.clickEdit();
    await orderPage.setQuantity(3);
    await orderPage.submitOrder();

    let summary = await orderPage.getOrderSummaryDetails();
    expect(summary.quantity).toContain('3');
    console.log(`  ✓ Quantity updated to: ${summary.quantity}`);

    // Edit again - change to different item
    console.log(`\nStep 3: Edit order (change menu item)`);
    await orderPage.clickEdit();
    await orderPage.selectMenuItemByIndex(1); // Select different item
    await orderPage.submitOrder();
    await orderPage.verifyOrderSummaryDisplayed();
    console.log(`  ✓ Menu item changed successfully`);

    // Final checkout
    console.log(`\nStep 4: Complete checkout`);
    await orderPage.clickCheckout();
    await orderPage.verifyThankYouMessage();
    console.log(`  ✓ Order confirmed after modifications`);

    console.log(`\n=== Order Modification Flow Passed ===\n`);
  });

  /**
   * Additional E2E Test: Multiple reservations
   */
  test('TC-E2E-006: Make multiple reservations - Priority: Low', async ({ page }) => {
    console.log(`\n=== Starting Multiple Reservations Flow ===\n`);

    await page.goto('/reservation');
    await page.waitForLoadState('networkidle');

    const reservationPage = new ReservationPage(page);
    const futureDate = generateFutureDate(20);

    // Make first reservation (lunch)
    console.log(`Step 1: Make lunch reservation`);
    await reservationPage.makeReservation({
      name: 'Lunch Party',
      email: 'lunch@test.com',
      date: futureDate,
      time: '13:00',
      guests: 2
    });
    await reservationPage.verifySuccessMessage();
    console.log(`  ✓ Lunch reservation confirmed (13:00)`);

    // Make second reservation (dinner)
    console.log(`\nStep 2: Make dinner reservation`);
    await reservationPage.makeReservation({
      name: 'Dinner Party',
      email: 'dinner@test.com',
      date: futureDate,
      time: '20:00',
      guests: 6
    });
    await reservationPage.verifySuccessMessage();
    console.log(`  ✓ Dinner reservation confirmed (20:00)`);

    console.log(`\n✓ Multiple reservations completed successfully`);
    console.log(`\n=== Multiple Reservations Flow Passed ===\n`);
  });
});

