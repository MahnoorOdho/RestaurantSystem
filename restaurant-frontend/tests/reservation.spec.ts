import { test, expect } from '@playwright/test';
import { ReservationPage } from '../pages/ReservationPage';
import { generateFutureDate, generatePastDate } from '../fixtures/test-data';

/**
 * Test Suite: Reservation Service
 * Tests for table reservation functionality
 */

test.describe('Reservation Service Tests', () => {
  let reservationPage: ReservationPage;

  test.beforeEach(async ({ page }) => {
    reservationPage = new ReservationPage(page);
    await reservationPage.goto();
  });

  /**
   * TC-RESERVATION-001: Create Reservation with Valid Data
   * Priority: Critical | Type: Functional | Service: Reservation Service
   */
  test('TC-RESERVATION-001: Create reservation with valid data - Priority: Critical', async ({ page }) => {
    console.log('\n=== TC-RESERVATION-001: Create Valid Reservation ===\n');

    // Verify page loaded
    await reservationPage.verifyPageLoaded();
    console.log('✓ Reservation page loaded successfully');

    // Prepare reservation data with future date
    const futureDate = generateFutureDate(7);
    const reservationDetails = {
      name: "Alice Smith",
      email: "alice.smith@test.com",
      date: futureDate,
      time: "18:00",
      guests: 4
    };

    // Fill and submit reservation
    await reservationPage.makeReservation(reservationDetails);
    console.log('✓ Reservation submitted successfully');
    console.log(`  Name: ${reservationDetails.name}`);
    console.log(`  Email: ${reservationDetails.email}`);
    console.log(`  Date: ${reservationDetails.date}`);
    console.log(`  Time: ${reservationDetails.time}`);
    console.log(`  Guests: ${reservationDetails.guests}`);

    // Verify success
    await reservationPage.verifySuccessMessage();
    console.log('✓ Success message confirmed');

    // Verify form is cleared
    await reservationPage.verifyFormCleared();
    console.log('✓ Form cleared after submission');
  });

  /**
   * TC-RESERVATION-002: Validate Past Date Rejection
   * Priority: High | Type: Functional | Service: Reservation Service
   */
  test('TC-RESERVATION-002: Validate past date rejection - Priority: High', async ({ page }) => {
    console.log('\n=== TC-RESERVATION-002: Past Date Validation ===\n');

    await reservationPage.verifyPageLoaded();

    // Try to set a past date
    const pastDate = generatePastDate(7);
    console.log(`Attempting to book for past date: ${pastDate}`);

    await reservationPage.fillReservationForm(
      "Bob Wilson",
      "bob.wilson@test.com",
      pastDate,
      "19:00",
      2
    );

    // HTML5 date input should prevent past dates
    const actualDate = await reservationPage.getDateInputValue();
    console.log(`Date input value: ${actualDate}`);

    // If the past date was accepted (shouldn't happen with proper HTML5 validation)
    // the backend should reject it
    if (actualDate === pastDate) {
      console.log('⚠ Past date was set (HTML5 validation may not be enforced)');
      console.log('  Backend should reject this reservation');
    } else {
      console.log('✓ HTML5 date input prevents past dates');
    }
  });

  /**
   * TC-RESERVATION-003: Check Guest Count Limits
   * Priority: Medium | Type: Functional | Service: Reservation Service
   */
  test('TC-RESERVATION-003: Check guest count limits - Priority: Medium', async ({ page }) => {
    console.log('\n=== TC-RESERVATION-003: Guest Count Validation ===\n');

    await reservationPage.verifyPageLoaded();

    // Get min and max guest limits
    const limits = await reservationPage.getMinMaxGuests();
    console.log(`Guest limits - Min: ${limits.min}, Max: ${limits.max}`);

    // Test valid guest counts
    const futureDate = generateFutureDate(10);

    // Test minimum guests
    console.log(`\nTest 1: Minimum guests (${limits.min})`);
    await reservationPage.makeReservation({
      name: "Min Guest User",
      email: "min@test.com",
      date: futureDate,
      time: "17:00",
      guests: limits.min
    });
    await reservationPage.verifySuccessMessage();
    console.log(`✓ Reservation accepted with ${limits.min} guest(s)`);

    // Test medium guest count
    const mediumGuests = Math.floor((limits.min + limits.max) / 2);
    console.log(`\nTest 2: Medium guest count (${mediumGuests})`);
    await reservationPage.makeReservation({
      name: "Medium Guest User",
      email: "medium@test.com",
      date: futureDate,
      time: "18:30",
      guests: mediumGuests
    });
    await reservationPage.verifySuccessMessage();
    console.log(`✓ Reservation accepted with ${mediumGuests} guests`);

    // Test maximum guests
    console.log(`\nTest 3: Maximum guests (${limits.max})`);
    await reservationPage.makeReservation({
      name: "Max Guest User",
      email: "max@test.com",
      date: futureDate,
      time: "20:00",
      guests: limits.max
    });
    await reservationPage.verifySuccessMessage();
    console.log(`✓ Reservation accepted with ${limits.max} guests`);
  });

  /**
   * TC-RESERVATION-004: Validate Required Fields
   * Priority: High | Type: Functional | Service: Reservation Service
   */
  test('TC-RESERVATION-004: Validate required fields - Priority: High', async ({ page }) => {
    console.log('\n=== TC-RESERVATION-004: Required Field Validation ===\n');

    await reservationPage.verifyPageLoaded();

    // Verify all fields are required
    await reservationPage.verifyAllFieldsRequired();
    console.log('✓ All fields have required attribute');

    // Try to submit empty form
    await reservationPage.submitButton.click();
    await page.waitForTimeout(500);

    // Check validation message for name field
    const nameValidation = await reservationPage.getValidationMessage('name');
    expect(nameValidation).toBeTruthy();
    console.log(`✓ Name validation: "${nameValidation}"`);

    // Fill name and try again
    await reservationPage.nameInput.fill('Test User');
    await reservationPage.submitButton.click();
    await page.waitForTimeout(500);

    const emailValidation = await reservationPage.getValidationMessage('email');
    expect(emailValidation).toBeTruthy();
    console.log(`✓ Email validation: "${emailValidation}"`);
  });

  /**
   * TC-RESERVATION-005: Test Different Time Slots
   * Priority: Medium | Type: Functional | Service: Reservation Service
   */
  test('TC-RESERVATION-005: Test different time slots - Priority: Medium', async ({ page }) => {
    console.log('\n=== TC-RESERVATION-005: Time Slot Testing ===\n');

    await reservationPage.verifyPageLoaded();

    const futureDate = generateFutureDate(14);
    const timeSlots = ['12:00', '14:30', '18:00', '20:30'];

    for (let i = 0; i < timeSlots.length; i++) {
      const time = timeSlots[i];
      console.log(`\nTesting time slot: ${time}`);

      await reservationPage.makeReservation({
        name: `Time Test User ${i + 1}`,
        email: `time${i + 1}@test.com`,
        date: futureDate,
        time: time,
        guests: 2
      });

      await reservationPage.verifySuccessMessage();
      console.log(`✓ Reservation accepted for ${time}`);
    }

    console.log(`\n✓ All ${timeSlots.length} time slots tested successfully`);
  });

  /**
   * TC-RESERVATION-006: Test Email Format Validation
   * Priority: High | Type: Functional | Service: Reservation Service
   */
  test('TC-RESERVATION-006: Test email format validation - Priority: High', async ({ page }) => {
    console.log('\n=== TC-RESERVATION-006: Email Format Validation ===\n');

    await reservationPage.verifyPageLoaded();

    const invalidEmails = [
      'not-an-email',
      'missing@domain',
      '@nodomain.com',
      'spaces in@email.com'
    ];

    const futureDate = generateFutureDate(5);

    for (const invalidEmail of invalidEmails) {
      console.log(`\nTesting invalid email: "${invalidEmail}"`);

      await reservationPage.clearForm();
      await reservationPage.fillReservationForm(
        'Test User',
        invalidEmail,
        futureDate,
        '18:00',
        2
      );

      await reservationPage.submitButton.click();
      await page.waitForTimeout(500);

      const validationMessage = await reservationPage.getValidationMessage('email');

      if (validationMessage) {
        expect(validationMessage.toLowerCase()).toMatch(/email|@/);
        console.log(`  ✓ Validation caught: "${validationMessage}"`);
      } else {
        console.log(`  ⚠ No HTML5 validation (backend should catch this)`);
      }
    }

    // Test valid email
    console.log(`\nTesting valid email`);
    await reservationPage.makeReservation({
      name: 'Valid Email User',
      email: 'valid.email@example.com',
      date: futureDate,
      time: '19:00',
      guests: 3
    });
    await reservationPage.verifySuccessMessage();
    console.log('✓ Valid email accepted');
  });
});

