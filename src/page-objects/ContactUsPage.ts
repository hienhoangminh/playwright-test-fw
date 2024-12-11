import { BasePage } from "./base/BasePage";

export class ContactUsPage extends BasePage {
  // Specific methods for the Contact Us page
  public async fillFirstName(firstName: string): Promise<void> {
    await this.waitAndFillTextByPlaceholder("First Name", firstName);
  }

  public async fillLastName(lastName: string): Promise<void> {
    await this.waitAndFillTextByPlaceholder("Last Name", lastName);
  }

  public async fillEmailAddress(emailAddress: string): Promise<void> {
    await this.waitAndFillTextByPlaceholder("Email Address", emailAddress);
  }

  public async fillComment(comment: string): Promise<void> {
    await this.waitAndFillTextByPlaceholder("Comments", comment);
  }

  public async clickOnSubmitButton(): Promise<void> {
    await this.waitAndClickBySelector("input[value='SUBMIT']");
  }

  public async getSucessfulMessage(): Promise<string> {
    return await this.waitAndExtractInnerText("#contact_reply h1");
  }

  public async getUnsucessfulMessage(): Promise<string> {
    return await this.waitAndExtractTextContent("body");
  }

  public async getHeaderText(): Promise<string> {
    return await this.waitAndExtractTextContent("body");
  }
}
