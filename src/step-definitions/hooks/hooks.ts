import { After, Before, BeforeAll, Status } from "@cucumber/cucumber";
import {
  Browser,
  BrowserType,
  chromium,
  firefox,
  webkit,
} from "@playwright/test";
import { pageFixture } from "./browserContextFixture";
import { config as loadEnv } from "dotenv";
import { PageManager } from "../../page-objects/base/PageManager";

const env = loadEnv({ path: "./env/.env" });
const config = {
  headless: env.parsed?.HEADLESS === "true",
  browser: env.parsed?.BROWSER || "chromium",
  width: parseInt(env.parsed?.BROWSER_WIDTH || "1920"),
  height: parseInt(env.parsed?.BROWSER_HEIGHT || "1080"),
};

// Create dictionary mapping browser names to their launch functions
const browsers: { [key: string]: BrowserType } = {
  chromium: chromium,
  firefox: firefox,
  webkit: webkit,
};

let browserInstance: Browser | null = null;

// Create a function

async function initBrowserContext(selectedBrowser: string): Promise<Browser> {
  const launchBrowser = browsers[selectedBrowser];
  if (!launchBrowser) {
    throw new Error(`Invalid browser selected : ${selectedBrowser}`);
  }
  return await launchBrowser.launch({ headless: config.headless });
}

async function initPage(): Promise<void> {
  if (!browserInstance) {
    throw new Error("Browser instance is null");
  }
  pageFixture.context = await browserInstance?.newContext({
    ignoreHTTPSErrors: true,
  });
  pageFixture.page = await pageFixture.context.newPage();
  await pageFixture.page.setViewportSize({
    width: config.width,
    height: config.height,
  });
}

async function closeBrowser(): Promise<void> {
  if (!browserInstance) {
    console.log("Browser instance is null, so maybe it is close");
  } else {
    await browserInstance.close();
  }
}

//BeforeAll: Run once before all scenarios
BeforeAll(async function () {
  console.log("Executing test suite...");
});

//AfterAll: Run once after all scenarios
BeforeAll(async function () {
  console.log("Finishing test suite...");
});

//Before: Run before each scenario
Before(async function () {
  try {
    browserInstance = await initBrowserContext(config.browser);
    console.log(`Browser context initialized for: ${config.browser}`);
    await initPage();
    this.pageManager = new PageManager();
    this.basePage = this.pageManager.createBasePage();
    this.homePage = this.pageManager.createHomePage();
    this.contactUsPage = this.pageManager.creteContactUsPage();
  } catch (error) {
    console.error("Browser context initialization failed: ", error);
  }
});

//Before: Run before each scenario
After(async function ({ pickle, result }) {
  if (result?.status === Status.FAILED) {
    // attach the screenshot
    if (pageFixture.page) {
      const screenshotPath = `./reports/screenshots/${
        pickle.name
      }-${Date.now()}.png`;
      const image = await pageFixture.page.screenshot({
        path: screenshotPath,
        type: "png",
        //timeout: 60000
      });
      this.attach(image, "image/png");
    } else {
      console.error("pageFixture.page is undefined! Please check");
    }
  }
  if (browserInstance) {
    await pageFixture.page.close();
    await pageFixture.context.close();
    await closeBrowser();
  }
});
