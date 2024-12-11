import { BasePage } from "./base/BasePage";

export class LoginPage extends BasePage {
  public async fillUserName(userName: string): Promise<void> {
    await this.waitAndFillTextByPlaceholder("Username", userName);
  }

  public async fillPassword(password: string): Promise<void> {
    await this.waitAndFillTextByPlaceholder("Password", password);
  }

  public async clickOnLoginButton(): Promise<void> {
    await this.waitAndClickBySelector("#login-button");
  }
}
