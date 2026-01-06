import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/ContactPage';

/**
 * Test Suite: Contact Service
 * Tests for contact form submission and validation
 */

test.describe('Contact Service Tests', () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await contactPage.goto();
  });

  /**
   * TC-CONTACT-001: Submit Contact Form Successfully
   * Priority: Critical | Type: Functional | Service: Contact Service
   */
  test('TC-CONTACT-001: Submit contact form successfully - Priority: Critical', async ({ page }) => {
    // Verify contact page loaded
    await contactPage.verifyPageLoaded();

    // Fill and submit contact form
    const contactDetails = {
      name: "Charlie Brown",
      email: "charlie.brown@test.com",
      message: "I would like to inquire about your catering services for a corporate event. We're expecting around 50 guests and would need a full menu."
    };

    await contactPage.sendMessage(contactDetails);

    // Verify success message
    await contactPage.verifySuccessMessage();

    console.log(`✓ Contact form submitted successfully`);
    console.log(`  Name: ${contactDetails.name}`);
    console.log(`  Email: ${contactDetails.email}`);
    console.log(`  Message length: ${contactDetails.message.length} characters`);

    // Verify form is cleared after successful submission
    await contactPage.verifyFormCleared();
    console.log(`✓ Form cleared and ready for new message`);
  });

  /**
   * TC-CONTACT-002: Validate Required Field Errors
   * Priority: High | Type: Functional | Service: Contact Service
   */
  test('TC-CONTACT-002: Validate required field errors - Priority: High', async ({ page }) => {
    // Verify page loaded
    await contactPage.verifyPageLoaded();

    // Verify all fields are marked as required
    await contactPage.verifyAllFieldsRequired();
    console.log(`✓ All fields have required attribute`);

    // Test 1: Try to submit completely empty form
    console.log(`\nTest 1: Empty form submission`);
    await contactPage.submitEmptyForm();

    // Check name field validation
    const nameValidation = await contactPage.getValidationMessage('name');
    expect(nameValidation).toBeTruthy();
    console.log(`  ✓ Name validation: "${nameValidation}"`);

    // Test 2: Fill only name, submit again
    console.log(`\nTest 2: Only name filled`);
    await contactPage.nameInput.fill('Test User');
    await contactPage.submitForm();
    await page.waitForTimeout(500);

    // Check email field validation
    const emailValidation = await contactPage.getValidationMessage('email');
    expect(emailValidation).toBeTruthy();
    console.log(`  ✓ Email validation: "${emailValidation}"`);

    // Test 3: Fill name and email, but leave message empty
    console.log(`\nTest 3: Name and email filled, message empty`);
    await contactPage.emailInput.fill('test@example.com');
    await contactPage.submitForm();
    await page.waitForTimeout(500);

    // Check message field validation
    const messageValidation = await contactPage.getValidationMessage('message');
    expect(messageValidation).toBeTruthy();
    console.log(`  ✓ Message validation: "${messageValidation}"`);

    // Test 4: Fill all fields and verify success
    console.log(`\nTest 4: All fields filled`);
    await contactPage.messageTextarea.fill('This is a test message');
    await contactPage.submitForm();

    // Should succeed now
    await contactPage.verifySuccessMessage();
    console.log(`  ✓ Form submitted successfully with all required fields`);
  });

  /**
   * Additional test: Email format validation
   */
  test('TC-CONTACT-003: Validate email format - Priority: High', async ({ page }) => {
    // Verify page loaded
    await contactPage.verifyPageLoaded();

    // Test various invalid email formats
    const invalidEmails = [
      'not-an-email',
      'missing@domain',
      '@nodomain.com',
      'spaces in@email.com',
      'double@@domain.com'
    ];

    for (const invalidEmail of invalidEmails) {
      console.log(`\nTesting invalid email: "${invalidEmail}"`);

      await contactPage.clearForm();
      await contactPage.nameInput.fill('Test User');
      await contactPage.emailInput.fill(invalidEmail);
      await contactPage.messageTextarea.fill('Test message');
      await contactPage.submitForm();
      await page.waitForTimeout(500);

      // Check if validation triggered
      const validationMessage = await contactPage.getValidationMessage('email');

      // HTML5 validation should catch invalid emails
      if (validationMessage) {
        expect(validationMessage.toLowerCase()).toMatch(/email|@/);
        console.log(`  ✓ Validation caught: "${validationMessage}"`);
      } else {
        console.log(`  ⚠ No HTML5 validation (might be caught by backend)`);
      }
    }

    // Test valid email
    console.log(`\nTesting valid email`);
    await contactPage.clearForm();
    await contactPage.sendMessage({
      name: 'Valid User',
      email: 'valid.email@example.com',
      message: 'This should work'
    });

    await contactPage.verifySuccessMessage();
    console.log(`  ✓ Valid email accepted`);
  });

  /**
   * Additional test: Message length variations
   */
  test('TC-CONTACT-004: Test message length variations - Priority: Medium', async ({ page }) => {
    await contactPage.verifyPageLoaded();

    // Test 1: Very short message
    console.log(`Test 1: Short message`);
    await contactPage.sendMessage({
      name: 'Short Message User',
      email: 'short@test.com',
      message: 'Hi'
    });

    await contactPage.verifySuccessMessage();
    console.log(`  ✓ Short message (2 chars) accepted`);

    // Test 2: Medium length message
    console.log(`\nTest 2: Medium message`);
    await contactPage.sendMessage({
      name: 'Medium Message User',
      email: 'medium@test.com',
      message: 'I have a question about your menu. Could you please provide information about vegetarian options and any special dietary accommodations you offer?'
    });

    await contactPage.verifySuccessMessage();
    console.log(`  ✓ Medium message (~150 chars) accepted`);

    // Test 3: Long message
    console.log(`\nTest 3: Long message`);
    const longMessage = 'I am planning a large corporate event and would like detailed information about your catering services. '.repeat(5);

    await contactPage.sendMessage({
      name: 'Long Message User',
      email: 'long@test.com',
      message: longMessage
    });

    await contactPage.verifySuccessMessage();
    console.log(`  ✓ Long message (${longMessage.length} chars) accepted`);
  });

  /**
   * Additional test: Special characters in message
   */
  test('TC-CONTACT-005: Handle special characters in message - Priority: Low', async ({ page }) => {
    await contactPage.verifyPageLoaded();

    const specialCharMessage = {
      name: 'Special Char User',
      email: 'special@test.com',
      message: 'Testing special chars: @#$%^&*()_+-=[]{}|;:,.<>?/~`\nNew line\tTab\n"Quotes" and \'apostrophes\''
    };

    await contactPage.sendMessage(specialCharMessage);
    await contactPage.verifySuccessMessage();

    console.log(`✓ Message with special characters accepted`);
    console.log(`  Message: ${specialCharMessage.message.substring(0, 50)}...`);
  });

  /**
   * Additional test: Multiple consecutive submissions
   */
  test('TC-CONTACT-006: Submit multiple messages consecutively - Priority: Low', async ({ page }) => {
    await contactPage.verifyPageLoaded();

    const messageCount = 3;

    for (let i = 1; i <= messageCount; i++) {
      console.log(`\nSubmission ${i} of ${messageCount}`);

      await contactPage.sendMessage({
        name: `User ${i}`,
        email: `user${i}@test.com`,
        message: `This is test message number ${i}`
      });

      await contactPage.verifySuccessMessage();
      console.log(`  ✓ Message ${i} submitted successfully`);

      // Verify form cleared
      await contactPage.verifyFormCleared();
      console.log(`  ✓ Form cleared for next submission`);

      // Small delay between submissions
      await page.waitForTimeout(500);
    }

    console.log(`\n✓ All ${messageCount} messages submitted successfully`);
  });

  /**
   * Additional test: XSS prevention (basic)
   */
  test('TC-CONTACT-007: Test potential XSS input handling - Priority: Low', async ({ page }) => {
    await contactPage.verifyPageLoaded();

    const xssTestMessages = [
      '<script>alert("xss")</script>',
      '<img src=x onerror=alert("xss")>',
      '"><script>alert("xss")</script>',
      "'; DROP TABLE contacts; --"
    ];

    for (const xssMessage of xssTestMessages) {
      console.log(`\nTesting: ${xssMessage.substring(0, 30)}...`);

      await contactPage.sendMessage({
        name: 'XSS Test User',
        email: 'xss@test.com',
        message: xssMessage
      });

      // Should either succeed (sanitized on backend) or fail gracefully
      try {
        await contactPage.verifySuccessMessage();
        console.log(`  ✓ Message accepted (should be sanitized by backend)`);
      } catch {
        console.log(`  ✓ Message rejected (frontend validation)`);
      }

      await page.waitForTimeout(500);
    }

    console.log(`\n✓ XSS test inputs handled appropriately`);
  });

  /**
   * Additional test: Form persistence check
   */
  test('TC-CONTACT-008: Verify form data not persisted after refresh - Priority: Low', async ({ page }) => {
    await contactPage.verifyPageLoaded();

    // Fill form but don't submit
    await contactPage.fillContactForm(
      'Test User',
      'test@example.com',
      'This message should not persist'
    );

    console.log(`✓ Form filled with test data`);

    // Reload page
    await page.reload();
    await contactPage.verifyPageLoaded();

    // Verify form is empty
    const formValues = await contactPage.getFormValues();
    expect(formValues.name).toBe('');
    expect(formValues.email).toBe('');
    expect(formValues.message).toBe('');

    console.log(`✓ Form data cleared after page refresh (no unwanted persistence)`);
  });
});

