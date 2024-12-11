@regression @contact-us
Feature: WebDriverUniversity.com - Contact Us Page

  Background: Pre-conditions:
    Given I navigate to webdriveruniversity homepage
    When I click on the contact us button
    And I switch to the new browser tab

  Scenario: Valid Contact Us Form Submission
    And I type a first name
    And I type a last name
    And I enter an email address
    And I type a comment
    And I click on the submit button
    Then I should be presented with a sucessful contact us submission message

  Scenario: Valid Contact Us Form Submission
    Given I navigate to webdriveruniversity homepage
    When I click on the contact us button
    And I switch to the new browser tab
    And I type a first name
    And I type a last name
    # And I enter an email address
    And I type a comment
    And I click on the submit button
    Then I should be presented with an unsucessful contact us message

  Scenario: Valid Contact Us Form Submission - Using specific data
    And I type a first name "Sarah"
    And I type a last name "Woods"
    And I enter an email address "sarah_woods@example.com"
    And I type specific text "Hello world" and a number 2 within the comment input field
    And I click on the submit button
    Then I should be presented with a sucessful contact us submission message

  Scenario: Valid Contact Us Form Submission - Using random data
    And I type a random first name
    And I type a random last name
    And I enter a random email address
    And I enter a random comment
    And I click on the submit button
    Then I should be presented with a sucessful contact us submission message

  @smoke
  Scenario Outline: Valid Contact Us Page
    And I type a first name <firstName> and a last name <lastName>
    And I enter a email address '<emailAddress>' and a comment '<comment>'
    And I click on the submit button
    Then I should be presented with header text '<message>'

    Examples:
      | firstName | lastName   | emailAddress            | comment                                                                         | message                    |
      | Ribeiro   | Elias      | r.elias@example.com     | I have decided to stick with love. Hate is too great a burden to bear.          | Thank You for your Message |
      | Slawomira | Przybylska | s.przybylska@example.io | Success is not about the accolades; it is about the impact you have on others.  | Thank You for your Message |
      | Hiromi    | Ogura      | h.ogura                 | The greatest thing you will ever learn is just to love, and be loved in return. | Invalid email address      |
