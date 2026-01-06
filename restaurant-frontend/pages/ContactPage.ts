import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for Contact Page
 * Handles all interactions with the contact form
 */
export class ContactPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly messageTextarea: Locator;
  readonly submitButton: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('input[name="name"]');
    this.emailInput = page.locator('input[name="email"]');
    this.messageTextarea = page.locator('textarea[name="message"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.pageTitle = page.locator('h2.form-title');
  }

  async goto() {
    await this.page.goto('/contact');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPageLoaded() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toContainText('Contact');
  }

  async fillContactForm(name: string, email: string, message: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.messageTextarea.fill(message);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async sendMessage(contactDetails: { name: string; email: string; message: string }) {
    await this.fillContactForm(contactDetails.name, contactDetails.email, contactDetails.message);
    await this.submitForm();
  }

  async verifySuccessMessage() {
    // Wait for alert dialog
    this.page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('successfully');
      await dialog.accept();
    });
    await this.page.waitForTimeout(1000);
  }

  async verifyFormCleared() {
    await expect(this.nameInput).toHaveValue('');
    await expect(this.emailInput).toHaveValue('');
    await expect(this.messageTextarea).toHaveValue('');
  }

  async verifyAllFieldsRequired() {
    await expect(this.nameInput).toHaveAttribute('required', '');
    await expect(this.emailInput).toHaveAttribute('required', '');
    await expect(this.messageTextarea).toHaveAttribute('required', '');
  }

  async submitEmptyForm() {
    await this.submitButton.click();
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
      case 'message':
        field = this.messageTextarea;
        break;
      default:
        throw new Error(`Unknown field: ${fieldName}`);
    }

    return await field.evaluate((el: HTMLInputElement | HTMLTextAreaElement) => el.validationMessage);
  }

  async clearForm() {
    await this.nameInput.clear();
    await this.emailInput.clear();
    await this.messageTextarea.clear();
  }

  async getFormValues() {
    return {
      name: await this.nameInput.inputValue(),
      email: await this.emailInput.inputValue(),
      message: await this.messageTextarea.inputValue()
    };
  }
}

export default ContactPage;


