Feature: Login to Application

    Scenario: Visiting mudbath page
        Given I visit the "https://www.mudbath.com.au/" url
        Then wait for mudbath page to load
        Then I should see element "img"

