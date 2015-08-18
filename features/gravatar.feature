# features/myFeature.feature

Feature: Gravatar

Given I am a user of Minitwit
  I want to easily establish a profile image
  So that other users know who I am

  Scenario: I am signing up for the site
    Given I am on the registration page
    When I put my email address in
    Then I should see a message about Gravatar being used

  Scenario: I am logged into the site
    Given I am on any page
    When I look at the top right of the page
    Then I should see my Gravatar next to my name

  Scenario: Feed interaction
    Given I am logged into the site
    When I see posted tweets
    Then I should see Gravatars next to usernames

  Scenario: Feed interaction
    Given I am looking at a post
    When I click on a user's Gravatar
    Then I should be taken to their profile page

  Scenario: Offensive Gravatar
    Given I am logged in to the site
    When I see an offensive Gravatar
    Then I should be able to report it to the admins

Given I am an administrator of Minitwit
  I want to be able to block offensive Gravatars
  So that the site is family-friendly

  Scenario: Offensive Gravatar removal
    Given I am logged in to the admin page
    When I see a user report of an offensive Gravatar
    Then I should be able to remove the image and/or the request


