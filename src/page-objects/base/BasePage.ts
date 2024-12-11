import { Page, Locator } from "@playwright/test";
import { pageFixture } from "../../step-definitions/hooks/browserContextFixture";

import { config as loadEnv } from "dotenv";

const env = loadEnv({ path: "./env/.env" });
const config = {
  width: parseInt(env.parsed?.BROWSER_WIDTH || "1920"),
  height: parseInt(env.parsed?.BROWSER_HEIGHT || "1080"),
};

// Playwright wrapper???
export class BasePage {
  // here we will define common methods that can be used by other pages.

  get page(): Page {
    return pageFixture.page;
  }

  // Promise<void> in TS: when you're defining an async function
  // that doesn't explicitly return a value
  public async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  public async waitAndClickByRole(role: string, name: string): Promise<void> {
    const element = this.page.getByRole(role as any, { name: name });
    await element.click();
  }

  public async waitAndClick(locator: Locator): Promise<void> {
    await locator.isVisible();
    await locator.click();
  }

  public async waitAndClickBySelector(selector: string): Promise<void> {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  public async switchToNewTab(): Promise<void> {
    await this.page.context().waitForEvent("page");

    // Retrieve all current opened pages (tabs)
    const allPages = this.page.context().pages();

    // Assign the most recent tab to pageFixture.page
    pageFixture.page = allPages[allPages.length - 1];

    // Bring the new assigned page to the front
    await this.page.bringToFront();

    await this.page.setViewportSize({
      width: config.width,
      height: config.height,
    });
  }

  public async waitAndFillTextByPlaceholder(
    placeHolderTxt: string,
    value: string
  ): Promise<void> {
    await this.page.getByPlaceholder(placeHolderTxt).fill(value);
  }

  public async waitAndExtractInnerText(selector: string): Promise<string> {
    await this.page.waitForSelector(selector);
    return await this.page.innerText(selector);
  }

  public async waitAndExtractTextContent(selector: string): Promise<string> {
    await this.page.waitForSelector(selector);
    const element = this.page.locator(selector);
    return (await element.textContent()) ?? "";
  }
}
