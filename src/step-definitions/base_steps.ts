import { When } from "@cucumber/cucumber";
import { logger } from "../logger/logger";
import { CucumberWorld } from "./world/cucumberWorld";

When("I switch to the new browser tab", async function (this: CucumberWorld) {
  try {
    logger.info("Switching to new browser tab....");
    await this.basePage.switchToNewTab();
  } catch (error: any) {
    logger.error("An error has occurred: ", error.message);
  }
});
