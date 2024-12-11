import { Given, Then, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { logger } from "../logger/logger";
import { CucumberWorld } from "./world/cucumberWorld";

const URL = "https://webdriveruniversity.com/";

// To Cucumber world object, we need to edit the test function as following
Given(
  "I navigate to webdriveruniversity homepage",
  async function (this: CucumberWorld) {
    try {
      logger.info(`Navigating to url ${URL}....`);
      await this.basePage.navigate(URL);
      this.setUrl(URL);
    } catch (error: any) {
      logger.error("An error has occurred: ", error.message);
    }
  }
);

When("I click on the contact us button", async function (this: CucumberWorld) {
  try {
    logger.info("Clicking on Contact Us button....");
    await this.homePage.clickOnContactUsButton();
  } catch (error: any) {
    logger.error("An error has occurred: ", error.message);
  }
});

When(
  "I click on the login portal button",
  async function (this: CucumberWorld) {
    try {
      logger.info("Clicking on the Login Portal button....");
      await this.homePage.clickOnLoginPortalButton();
    } catch (error: any) {
      logger.error("An error has occurred: ", error.message);
    }
  }
);
