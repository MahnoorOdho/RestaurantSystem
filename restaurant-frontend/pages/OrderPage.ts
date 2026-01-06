import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for Order Page
 * Handles all interactions with the order form
 */
export class OrderPage {
  readonly page: Page;
  readonly pageHeader: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly addressInput: Locator;
  readonly phoneInput: Locator;
  readonly menuItemSelect: Locator;
  readonly quantityInput: Locator;
  readonly submitButton: Locator;
  readonly orderSummary: Locator;
  readonly editButton: Locator;
  readonly checkoutButton: Locator;
  readonly cancelButton: Locator;
  readonly thankYouMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeader = page.locator('.order-form-header h2');
    this.nameInput = page.locator('.form-group input[type="text"]').first();
    this.emailInput = page.locator('.form-group input[type="email"]');
    this.addressInput = page.locator('.form-group input[type="text"]').nth(1);
    this.phoneInput = page.locator('.form-group input[type="tel"]');
    this.menuItemSelect = page.locator('.form-group select');
    this.quantityInput = page.locator('.form-group input[type="number"]');
    this.submitButton = page.locator('button.submit-btn, button[type="submit"]');
    this.orderSummary = page.locator('.order-summary');
    this.editButton = page.locator('button.edit-btn');
    this.checkoutButton = page.locator('button.checkout-btn');
    this.cancelButton = page.locator('button.cancel-btn');
    this.thankYouMessage = page.locator('.thank-you-message');
  }

  async goto() {
    await this.page.goto('/order');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPageLoaded() {
    await expect(this.pageHeader).toBeVisible();
  }

  async fillCustomerInfo(name: string, email: string, address: string, phone: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.addressInput.fill(address);
    await this.phoneInput.fill(phone);
  }

  async selectMenuItemByIndex(index: number) {
    await this.menuItemSelect.selectOption({ index: index + 1 }); // +1 because of placeholder option
  }

  async selectMenuItemByValue(itemId: string) {
    await this.menuItemSelect.selectOption(itemId);
  }

  async setQuantity(quantity: number) {
    await this.quantityInput.fill(quantity.toString());
  }

  async submitOrder() {
    // Handle the alert dialog that appears on success
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });
    await this.submitButton.click();
    await this.page.waitForTimeout(1000);
  }

  async verifyOrderSummaryDisplayed() {
    await expect(this.orderSummary).toBeVisible({ timeout: 5000 });
  }

  async getOrderSummaryDetails() {
    const summaryText = await this.orderSummary.textContent();

    return {
      name: summaryText || '',
      email: summaryText || '',
      address: summaryText || '',
      item: summaryText || '',
      quantity: summaryText || '',
      total: summaryText || ''
    };
  }

  async clickEdit() {
    await this.editButton.click();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async verifyThankYouMessage() {
    await expect(this.thankYouMessage).toBeVisible();
    await expect(this.thankYouMessage).toContainText('Thank you');
  }

  async getAvailableMenuItems(): Promise<number> {
    await this.page.waitForSelector('select option', { timeout: 5000 });
    const options = await this.menuItemSelect.locator('option').count();
    return options - 1; // Subtract placeholder option
  }

  async verifyFormFieldsRequired() {
    await expect(this.nameInput).toHaveAttribute('required', '');
    await expect(this.emailInput).toHaveAttribute('required', '');
    await expect(this.addressInput).toHaveAttribute('required', '');
    await expect(this.phoneInput).toHaveAttribute('required', '');
  }

  async getValidationMessage(fieldName: string): Promise<string> {
    let field: Locator;

    switch (fieldName) {
      case 'name':
        field = this.nameInput;
        break;
      case 'email':
        field = this.emailInput;
        break;
      case 'address':
        field = this.addressInput;
        break;
      case 'phone':
        field = this.phoneInput;
        break;
      default:
        throw new Error(`Unknown field: ${fieldName}`);
    }

    return await field.evaluate((el: HTMLInputElement) => el.validationMessage);
  }

  async clearForm() {
    await this.nameInput.clear();
    await this.emailInput.clear();
    await this.addressInput.clear();
    await this.phoneInput.clear();
  }
}

export default OrderPage;


