@regression @login
Feature: WebDriverUniversity.com - Login portal

  Background: Pre-conditions:
    Given I navigate to webdriveruniversity homepage

  Scenario Outline: Login Portal validation
    When I click on the login portal button
    And I switch to the new browser tab
    And I enter a username '<userName>'
    And I enter a password '<password>'
    And I click on Login button
    Then I should be presented with alert text '<message>'

    @smoke
    Examples:
      | userName  | password     | message              |
      | webdriver | webdriver123 | validation succeeded |

    Examples:
      | userName  | password     | message              |
      | webdriver | webdriver123 | validation succeeded |
      | webdriver | abc123       | validation failed    |
