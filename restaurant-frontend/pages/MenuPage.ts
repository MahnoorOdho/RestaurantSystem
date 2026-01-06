import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for Menu Page
 * Handles all interactions with the menu display
 */
export class MenuPage {
  readonly page: Page;
  readonly menuTitle: Locator;
  readonly menuItems: Locator;
  readonly menuCards: Locator;
  readonly loadingIndicator: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuTitle = page.locator('h2.menu-title');
    this.menuCards = page.locator('.menu-card-fix');
    this.menuItems = page.locator('.menu-card-fix');
    this.loadingIndicator = page.locator('.loading');
    this.errorMessage = page.locator('.error-message');
  }

  async goto() {
    await this.page.goto('/menu');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPageLoaded() {
    await expect(this.menuTitle).toBeVisible();
    await expect(this.menuTitle).toContainText('Menu');
  }

  async waitForMenuItems() {
    await this.page.waitForSelector('.menu-card-fix', { timeout: 10000 });
  }

  async getMenuItemCount(): Promise<number> {
    return await this.menuItems.count();
  }

  async getMenuItemDetails(index: number) {
    const item = this.menuItems.nth(index);

    const name = await item.locator('h3.menu-item-title').textContent();
    const description = await item.locator('p.menu-item-desc').textContent();
    const priceText = await item.locator('.menu-price-fix').textContent();

    return {
      name: name?.trim() || '',
      description: description?.trim() || '',
      price: priceText?.trim() || ''
    };
  }

  async searchMenuItem(searchTerm: string) {
    // If there's a search input on the menu page
    const searchInput = this.page.locator('input[type="search"], input[placeholder*="Search"]');
    if (await searchInput.count() > 0) {
      await searchInput.fill(searchTerm);
      await this.page.waitForTimeout(500);
    }
  }

  async verifyMenuItemVisible(itemName: string) {
    const item = this.page.locator('.menu-card-fix', { hasText: itemName });
    await expect(item).toBeVisible();
  }

  async getAllMenuItemNames(): Promise<string[]> {
    const count = await this.getMenuItemCount();
    const names: string[] = [];

    for (let i = 0; i < count; i++) {
      const details = await this.getMenuItemDetails(i);
      names.push(details.name);
    }

    return names;
  }

  async verifyMenuItemHasImage(index: number): Promise<boolean> {
    const item = this.menuItems.nth(index);
    const img = item.locator('img.menu-img-fix');

    if (await img.count() > 0) {
      return await img.isVisible();
    }

    return false;
  }

  async getMenuItemPrice(index: number): Promise<string> {
    const item = this.menuItems.nth(index);
    const priceText = await item.locator('.menu-price-fix').textContent();
    return priceText?.trim() || '';
  }
}

export default MenuPage;


