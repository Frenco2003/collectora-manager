# UC-001 — User Registration

**Actors:** New User  
**Goal:** Allow a new user to create a personal account to access the Collection Storage system.  
**Preconditions:** The system is online and accessible.  
**Trigger:** The user selects “Register” from the login page.

### Main Flow
1. The user opens the registration form.  
2. The user enters **name**, **email**, **password**, and **password confirmation**. 
3. The system validates all inputs:
   - Email format is valid and **unique**. 
   - Password meets security criteria. 
   - GDPR terms are accepted. 
   - CAPTCHA verification is successfully completed. 
4. The system sends an email to confirm successful registration.

### Alternative Flows
- **A1 – Email already registered:**  
  The system shows *“This email is already in use.”*

- **A2 – Passwords do not match:**  
  The system requests correction. 

- **A3 – Invalid password strength:**  
  The system displays password policy requirements.

- **A4 – GDPR not accepted:**  
  The system blocks registration and requests consent. 

- **A5 – CAPTCHA not completed or invalid:**  
  The system shows *“Verification failed. Please complete the CAPTCHA.”* 

### Exceptions
- **E1 – Network/server error:**  
  The system shows an error message and allows retry.

### Postconditions
- The user account is created and stored in the system.

### Linked Requirements
- [REQ-AU-01 — User Registration](./../../requirements/REQ-Auth.md#req-au-01--user-registration)
- [REQ-AU-02 — Email Uniqueness Validation](./../../requirements/REQ-Auth.md#req-au-02--email-uniqueness-validation)
- [REQ-AU-03 — Password Strength Validation](./../../requirements/REQ-Auth.md#req-au-03--password-strength-validation)
- [REQ-AU-08 — GDPR Consent](./../../requirements/REQ-Auth.md#req-au-08--gdpr-consent)
- [REQ-AU-09 — CAPTCHA Verification](./../../requirements/REQ-Auth.md#req-au-09--captcha-verification)

### Acceptance Criteria (Gherkin)

@REQ-AU-01 @REQ-AU-02 @REQ-AU-03 @REQ-AU-08 @REQ-AU-10
Scenario: Successful registration
    Given I am on the registration page
    When I enter a valid name, email, and a strong password and confirm it
    And I accept the GDPR terms
    And I complete the CAPTCHA verification
    And I click "Register"
    Then I see "Account created successfully"
    And I receive a confirmation email

@REQ-AU-02
Scenario: Duplicate email
    Given I am on the registration page
    When I enter an email already registered
    And I click "Register"
    Then I see "This email address is already in use"

@REQ-AU-03
Scenario: Weak password
    Given I am on the registration page
    When I enter a password that does not meet the security policy
    And I click "Register"
    Then I see "Your password does not meet the security requirements"

@REQ-AU-08
Scenario: GDPR not accepted
    Given I am on the registration page
    When I fill in all required fields but do not accept the GDPR terms
    And I click "Register"
    Then I see "You must accept the privacy policy before continuing"

@REQ-AU-09
Scenario: CAPTCHA not passed
    Given I am on the registration page
    When I fill in all required fields
    And I do not complete the CAPTCHA verification
    And I click "Register"
    Then I see "Verification failed. Please complete the CAPTCHA"
