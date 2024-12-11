import { Then, When } from "@cucumber/cucumber";
import { pageFixture } from "./hooks/browserContextFixture";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { logger } from "../logger/logger";
import { CucumberWorld } from "./world/cucumberWorld";

When("I type a first name", async function (this: CucumberWorld) {
  try {
    logger.info("Entering value into First Name field...");
    logger.info(`Base url stored in Cucumber work: ${this.getUrl()}`);
    await this.contactUsPage.fillFirstName("Hien");
  } catch (error: any) {
    logger.error("An error has occurred: ", error.message);
  }
});

When("I click on the submit button", async function (this: CucumberWorld) {
  try {
    // Write code here that turns the phrase above into concrete actions
    logger.info("Clicking on Submit button...");
    await this.contactUsPage.clickOnSubmitButton();
  } catch (error: any) {
    logger.error("An error has occurred: ", error.message);
  }
});

When("I type a comment", async function (this: CucumberWorld) {
  try {
    logger.info("Entering comment to comment field...");
    await this.contactUsPage.fillComment("Hello World!");
  } catch (error: any) {
    logger.error("An error has occurred: ", error.message);
  }
});

When("I enter an email address", async function (this: CucumberWorld) {
  try {
    logger.info("Entering email to email address field...");
    await this.contactUsPage.fillEmailAddress("qa-automation@yopmail.com");
  } catch (error: any) {
    logger.error("An error has occurred: ", error.message);
  }
});

When("I type a last name", async function (this: CucumberWorld) {
  try {
    logger.info("Entering last name to last name field...");
    await this.contactUsPage.fillLastName("Hoang");
  } catch (error: any) {
    logger.error("An error has occurred: ", error.message);
  }
});

Then(
  "I should be presented with a sucessful contact us submission message",
  async function (this: CucumberWorld) {
    try {
      logger.info("Assert that successful message is shown...");
      const text = await this.contactUsPage.getSucessfulMessage();
      expect(text).toContain("Thank You for your Message");
    } catch (error: any) {
      logger.error("An error has occurred: ", error.message);
    }
  }
);

Then(
  "I should be presented with an unsucessful contact us message",
  async function (this: CucumberWorld) {
    try {
      logger.info("Assert that unsuccessful message is shown...");
      const bodyText = await this.contactUsPage.getUnsucessfulMessage();
      expect(bodyText).toMatch(
        /Error: (all fields are required|Invalid email address)/
      );
    } catch (error: any) {
      logger.error("An error has occurred: ", error.message);
    }
  }
);

// Cucumber expression:
When(
  "I type a first name {string}",
  async function (this: CucumberWorld, firstName: string) {
    // Write code here that turns the phrase above into concrete actions
    try {
      logger.info(`Typing ${firstName} to First Name field...`);
      await this.contactUsPage.fillFirstName(firstName);
    } catch (error: any) {
      logger.error("An error has occurred: ", error.message);
    }
  }
);

When(
  "I type a last name {string}",
  async function (this: CucumberWorld, lastName: string) {
    try {
      logger.info(`Typing ${lastName} to last name field...`);
      await this.contactUsPage.fillLastName(lastName);
    } catch (error: any) {
      logger.error("An error has occurred: ", error.message);
    }
  }
);

When(
  "I enter an email address {string}",
  async function (this: CucumberWorld, email: string) {
    try {
      logger.info(`Typing ${email} to email address field...`);
      await this.contactUsPage.fillEmailAddress(email);
    } catch (error: any) {
      logger.error("An error has occurred: ", error.message);
    }
  }
);

When(
  "I type specific text {string} and a number {int} within the comment input field",
  async function (this: CucumberWorld, text: string, no: number) {
    try {
      let comment = `${text} ${no}`;
      logger.info(`Typing ${comment} to comment field...`);
      await this.contactUsPage.fillComment(comment);
    } catch (error: any) {
      logger.error("An error has occurred: ", error.message);
    }
  }
);

// Cucumber steps - Random data
When("I type a random first name", async function (this: CucumberWorld) {
  try {
    logger.info("Typing random text to first name field...");
    const randomFirstName = faker.person.firstName();
    await this.contactUsPage.fillFirstName(randomFirstName);
    this.setFirstName(randomFirstName);
  } catch (error: any) {
    logger.error("An error has occurred: ", error.message);
  }
});

When("I type a random last name", async function (this: CucumberWorld) {
  try {
    logger.info("Typing random text to last name field...");
    const randomLastName = faker.person.lastName();
    await this.contactUsPage.fillLastName(randomLastName);
    this.setLastName(randomLastName);
  } catch (error: any) {
    logger.error("An error has occurred: ", error.message);
  }
});

When("I enter a random email address", async function (this: CucumberWorld) {
  try {
    logger.info("Typing random text to email address field...");
    const randomEmailAddress = faker.internet.email();
    await this.contactUsPage.fillEmailAddress(randomEmailAddress);
    this.setEmailAddress(randomEmailAddress);
  } catch (error: any) {
    logger.error("An error has occurred: ", error.message);
  }
});

When("I enter a random comment", async function (this: CucumberWorld) {
  try {
    const randomPhoneNo = faker.phone.number({ style: "international" });
    const randomComment = `What if you want contact me? Please email me to ${this.getEmailAddress()} or contact me via: 
      ${this.getFirstName()} ${this.getLastName()} - Phone number: ${randomPhoneNo}`;
    logger.info(`Typing ${randomComment} to comment field...`);
    await this.contactUsPage.fillComment(randomComment);
  } catch (error: any) {
    logger.error("An error has occurred: ", error.message);
  }
});

//Scenario Outline:
When(
  "I type a first name {word} and a last name {word}",
  async function (this: CucumberWorld, firstName: string, lastName: string) {
    try {
      logger.info(
        `Typing ${firstName} to First Name field and ${lastName} to last name field...`
      );
      await this.contactUsPage.fillFirstName(firstName);
      await this.contactUsPage.fillLastName(lastName);
    } catch (error: any) {
      logger.error("An error has occurred: ", error.message);
    }
  }
);

When(
  "I enter a email address {string} and a comment {string}",
  async function (this: CucumberWorld, email: string, comment: string) {
    try {
      logger.info(
        `Typing ${email} to email address field and ${comment} to comment field...`
      );
      await this.contactUsPage.fillEmailAddress(email);
      await this.contactUsPage.fillComment(comment);
    } catch (error: any) {
      logger.error("An error has occurred: ", error.message);
    }
  }
);

Then(
  "I should be presented with header text {string}",
  async function (this: CucumberWorld, msg: string) {
    try {
      logger.info(`Assert that message with text ${msg} is shown...`);
      const bodyText = await this.contactUsPage.getHeaderText();
      expect(bodyText).toContain(msg);
    } catch (error: any) {
      logger.error("An error has occurred: ", error.message);
    }
  }
);
