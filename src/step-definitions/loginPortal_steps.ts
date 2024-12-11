import { Then, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { expect } from "@playwright/test";
import { logger } from "../logger/logger";
import { CucumberWorld } from "./world/cucumberWorld";
let alertText: string;

When(
  "I enter a username {string}",
  async function (this: CucumberWorld, username: string) {
    try {
      logger.info(`Typing ${username} to user name field...`);
      await this.loginPage.fillUserName(username);
    } catch (error: any) {
      logger.error("An error has occurred: ", error.message);
    }
  }
);

When(
  "I enter a password {string}",
  async function (this: CucumberWorld, password: string) {
    try {
      logger.info(`Typing ${password} to password field...`);
      await this.loginPage.fillPassword(password);
    } catch (error: any) {
      logger.error("An error has occurred: ", error.message);
    }
  }
);

When("I click on Login button", async function (this: CucumberWorld) {
  try {
    logger.info("Clicking on Login button...");
    this.loginPage.page.on("dialog", async (dialog) => {
      alertText = dialog.message();
      await dialog.accept();
    });
    await this.loginPage.clickOnLoginButton();
  } catch (error: any) {
    logger.error("An error has occurred: ", error.message);
  }
});

Then("I should be presented with alert text {string}", async (msg: string) => {
  try {
    logger.info(`Assert that text in alert is ${msg}...`);
    // Write code here that turns the phrase above into concrete actions
    expect(alertText).toEqual(msg);
  } catch (error: any) {
    logger.error("An error has occurred: ", error.message);
  }
});
