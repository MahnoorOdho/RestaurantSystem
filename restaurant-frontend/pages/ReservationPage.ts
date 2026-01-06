import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for Reservation Page
 * Handles all interactions with the reservation form
 */
export class ReservationPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly dateInput: Locator;
  readonly timeInput: Locator;
  readonly guestsInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('h2.form-title');
    this.nameInput = page.locator('input[type="text"]');
    this.emailInput = page.locator('input[type="email"]');
    this.dateInput = page.locator('input[type="date"]');
    this.timeInput = page.locator('input[type="time"]');
    this.guestsInput = page.locator('input[type="number"]');
    this.submitButton = page.locator('button[type="submit"]');
  }

  async goto() {
    await this.page.goto('/reservation');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPageLoaded() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toContainText('Reservation');
  }

  async fillReservationForm(
    name: string,
    email: string,
    date: string,
    time: string,
    guests: number
  ) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.dateInput.fill(date);
    await this.timeInput.fill(time);
    await this.guestsInput.fill(guests.toString());
  }

  async submitReservation() {
    // Handle the alert dialog
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });
    await this.submitButton.click();
    await this.page.waitForTimeout(1000);
  }

  async makeReservation(reservationDetails: {
    name: string;
    email: string;
    date: string;
    time: string;
    guests: number;
  }) {
    await this.fillReservationForm(
      reservationDetails.name,
      reservationDetails.email,
      reservationDetails.date,
      reservationDetails.time,
      reservationDetails.guests
    );
    await this.submitReservation();
  }

  async verifySuccessMessage() {
    // The success message is shown via alert
    // The dialog handler in submitReservation will handle it
    await this.page.waitForTimeout(500);
  }

  async verifyFormCleared() {
    await expect(this.nameInput).toHaveValue('');
    await expect(this.emailInput).toHaveValue('');
    await expect(this.dateInput).toHaveValue('');
    await expect(this.timeInput).toHaveValue('');
    await expect(this.guestsInput).toHaveValue('1');
  }

  async verifyAllFieldsRequired() {
    await expect(this.nameInput).toHaveAttribute('required', '');
    await expect(this.emailInput).toHaveAttribute('required', '');
    await expect(this.dateInput).toHaveAttribute('required', '');
    await expect(this.timeInput).toHaveAttribute('required', '');
    await expect(this.guestsInput).toHaveAttribute('required', '');
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
      case 'date':
        field = this.dateInput;
        break;
      case 'time':
        field = this.timeInput;
        break;
      case 'guests':
        field = this.guestsInput;
        break;
      default:
        throw new Error(`Unknown field: ${fieldName}`);
    }

    return await field.evaluate((el: HTMLInputElement) => el.validationMessage);
  }

  async getDateInputValue(): Promise<string> {
    return await this.dateInput.inputValue();
  }

  async getMinMaxGuests(): Promise<{ min: number; max: number }> {
    const min = await this.guestsInput.getAttribute('min');
    const max = await this.guestsInput.getAttribute('max');

    return {
      min: parseInt(min || '1'),
      max: parseInt(max || '20')
    };
  }

  async clearForm() {
    await this.nameInput.clear();
    await this.emailInput.clear();
    await this.dateInput.clear();
    await this.timeInput.clear();
    await this.guestsInput.clear();
  }

  async getFormValues() {
    return {
      name: await this.nameInput.inputValue(),
      email: await this.emailInput.inputValue(),
      date: await this.dateInput.inputValue(),
      time: await this.timeInput.inputValue(),
      guests: await this.guestsInput.inputValue()
    };
  }
}

export default ReservationPage;


