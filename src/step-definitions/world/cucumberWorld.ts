import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { PageManager } from "../../page-objects/base/PageManager";
import { BasePage } from "../../page-objects/base/BasePage";
import { HomePage } from "../../page-objects/HomePage";
import { ContactUsPage } from "../../page-objects/ContactUsPage";
import { LoginPage } from "../../page-objects/LoginPage";

export class CucumberWorld extends World {
  // url:
  private url?: string;

  // person info:
  private firstName?: string;
  private lastName?: string;
  private emailAddress?: string;

  public pageManager: PageManager; // can be accessible from outside of the class
  public basePage: BasePage; // can be accessible from outside of the class
  public homePage: HomePage; // can be accessible from outside of the class
  public contactUsPage: ContactUsPage;
  public loginPage: LoginPage;

  // {attach, log, parameters}: IWorlOptions are required in the constructor of CucumberWorld class
  // to inherit functionalities from base World class and to initialize PageManager and BasePage.
  constructor({ attach, log, parameters, link }: IWorldOptions) {
    super({ attach, log, parameters, link }); // Pass options to the World constructor
    this.pageManager = new PageManager();
    this.basePage = this.pageManager.createBasePage();
    this.homePage = this.pageManager.createHomePage();
    this.contactUsPage = this.pageManager.createContactUsPage();
    this.loginPage = this.pageManager.createLoginPage();
  }

  setUrl(url: string) {
    this.url = url;
  }

  setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  setLastName(lastName: string) {
    this.lastName = lastName;
  }

  setEmailAddress(emailAddress: string) {
    this.emailAddress = emailAddress;
  }

  getUrl() {
    return this.url;
  }

  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }

  getEmailAddress() {
    return this.emailAddress;
  }
}

// Share the state of page:

// Tells Cucumber World to use custom CucumberWorld
setWorldConstructor(CucumberWorld);
