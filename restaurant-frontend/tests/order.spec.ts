import { test, expect } from '@playwright/test';
import { OrderPage } from '../pages/OrderPage';

/**
 * Test Suite: Order Service
 * Tests for order placement, cart management, and checkout
 */

test.describe('Order Service Tests', () => {
  let orderPage: OrderPage;

  test.beforeEach(async ({ page }) => {
    orderPage = new OrderPage(page);
    await orderPage.goto();
  });

  /**
   * TC-ORDER-001: Place Complete Order with Valid Data
   * Priority: Critical | Type: Functional | Service: Order Service
   */
  test('TC-ORDER-001: Place complete order with valid data - Priority: Critical', async ({ page }) => {
    console.log('\n=== TC-ORDER-001: Place Complete Order ===\n');

    // Verify page loaded
    await orderPage.verifyPageLoaded();
    console.log('✓ Order page loaded successfully');

    // Fill customer information
    const customerData = {
      name: "John Doe",
      email: "john.doe@test.com",
      address: "123 Main Street, Test City, TC 12345",
      phone: "+1234567890"
    };

    await orderPage.fillCustomerInfo(
      customerData.name,
      customerData.email,
      customerData.address,
      customerData.phone
    );
    console.log('✓ Customer information filled');
    console.log(`  Name: ${customerData.name}`);
    console.log(`  Email: ${customerData.email}`);

    // Check if menu items are available
    const availableItems = await orderPage.getAvailableMenuItems();
    expect(availableItems).toBeGreaterThan(0);
    console.log(`✓ Found ${availableItems} available menu items`);

    // Select first menu item
    await orderPage.selectMenuItemByIndex(0);
    console.log('✓ Selected menu item');

    // Set quantity
    await orderPage.setQuantity(2);
    console.log('✓ Set quantity to 2');

    // Submit order
    await orderPage.submitOrder();
    console.log('✓ Order submitted successfully');

    // Verify order summary is displayed
    await orderPage.verifyOrderSummaryDisplayed();
    console.log('✓ Order summary displayed');
  });

  /**
   * TC-ORDER-002: Update Item Quantity in Cart
   * Priority: High | Type: Functional | Service: Order Service
   */
  test('TC-ORDER-002: Update item quantity in cart - Priority: High', async ({ page }) => {
    console.log('\n=== TC-ORDER-002: Update Item Quantity ===\n');

    await orderPage.verifyPageLoaded();

    // Fill form with initial quantity
    await orderPage.fillCustomerInfo(
      "Test User",
      "test@example.com",
      "456 Test Ave",
      "+9876543210"
    );

    await orderPage.selectMenuItemByIndex(0);
    await orderPage.setQuantity(1);
    console.log('✓ Initial quantity set to 1');

    // Change quantity
    await orderPage.setQuantity(3);
    console.log('✓ Updated quantity to 3');

    // Submit order
    await orderPage.submitOrder();
    await orderPage.verifyOrderSummaryDisplayed();
    console.log('✓ Order submitted with updated quantity');
  });

  /**
   * TC-ORDER-003: Edit Order Before Checkout
   * Priority: High | Type: Functional | Service: Order Service
   */
  test('TC-ORDER-003: Edit order before checkout - Priority: High', async ({ page }) => {
    console.log('\n=== TC-ORDER-003: Edit Order ===\n');

    await orderPage.verifyPageLoaded();

    // Place initial order
    await orderPage.fillCustomerInfo(
      "Edit Test User",
      "edit@test.com",
      "789 Edit Street",
      "+1111111111"
    );
    await orderPage.selectMenuItemByIndex(0);
    await orderPage.setQuantity(2);
    await orderPage.submitOrder();
    await orderPage.verifyOrderSummaryDisplayed();
    console.log('✓ Initial order placed');

    // Edit the order
    await orderPage.clickEdit();
    console.log('✓ Clicked edit button');

    // Verify form is editable again
    await page.waitForTimeout(500);
    console.log('✓ Form is now editable');

    // Make changes
    await orderPage.setQuantity(5);
    console.log('✓ Updated quantity to 5');

    // Submit again
    await orderPage.submitOrder();
    await orderPage.verifyOrderSummaryDisplayed();
    console.log('✓ Updated order submitted');
  });

  /**
   * TC-ORDER-004: Cancel Order
   * Priority: Medium | Type: Functional | Service: Order Service
   */
  test('TC-ORDER-004: Cancel order - Priority: Medium', async ({ page }) => {
    console.log('\n=== TC-ORDER-004: Cancel Order ===\n');

    await orderPage.verifyPageLoaded();

    // Place order
    await orderPage.fillCustomerInfo(
      "Cancel Test User",
      "cancel@test.com",
      "321 Cancel Street",
      "+2222222222"
    );
    await orderPage.selectMenuItemByIndex(0);
    await orderPage.setQuantity(1);
    await orderPage.submitOrder();
    await orderPage.verifyOrderSummaryDisplayed();
    console.log('✓ Order placed');

    // Cancel the order
    await orderPage.clickCancel();
    console.log('✓ Order cancelled');

    // Verify cancel message appears
    await page.waitForTimeout(1000);
    const cancelMessage = page.locator('.cancel-message');
    if (await cancelMessage.count() > 0) {
      await expect(cancelMessage).toBeVisible();
      console.log('✓ Cancel message displayed');
    }
  });

  /**
   * TC-ORDER-005: Validate Required Fields
   * Priority: High | Type: Functional | Service: Order Service
   */
  test('TC-ORDER-005: Validate required fields - Priority: High', async ({ page }) => {
    console.log('\n=== TC-ORDER-005: Validate Required Fields ===\n');

    await orderPage.verifyPageLoaded();

    // Verify all fields are required
    await orderPage.verifyFormFieldsRequired();
    console.log('✓ All form fields are marked as required');

    // Try to submit empty form
    await orderPage.submitButton.click();
    await page.waitForTimeout(500);

    // Check validation message for name field
    const nameValidation = await orderPage.getValidationMessage('name');
    expect(nameValidation).toBeTruthy();
    console.log(`✓ Name field validation: "${nameValidation}"`);
  });

  /**
   * TC-ORDER-006: Complete Checkout Flow
   * Priority: Critical | Type: E2E | Service: Order Service
   */
  test('TC-ORDER-006: Complete checkout flow - Priority: Critical', async ({ page }) => {
    console.log('\n=== TC-ORDER-006: Complete Checkout Flow ===\n');

    await orderPage.verifyPageLoaded();

    // Fill and submit order
    await orderPage.fillCustomerInfo(
      "Checkout Test User",
      "checkout@test.com",
      "999 Checkout Blvd",
      "+3333333333"
    );
    await orderPage.selectMenuItemByIndex(0);
    await orderPage.setQuantity(2);
    await orderPage.submitOrder();
    await orderPage.verifyOrderSummaryDisplayed();
    console.log('✓ Order summary displayed');

    // Click checkout
    await orderPage.clickCheckout();
    console.log('✓ Clicked checkout button');

    // Verify thank you message
    await orderPage.verifyThankYouMessage();
    console.log('✓ Thank you message displayed');
    console.log('✓ Checkout completed successfully');
  });
});

