# UC-002 — User Login

**Actors:** Registered User  
**Goal:** Allow a verified user to access their personal dashboard and collection area.  
**Preconditions:**  
- The user has already registered and verified their email.  
- The system is online and accessible.  
**Trigger:** The user selects **“Login”** and submits their credentials.

---

### Main Flow

1. The user opens the **login form**.
2. The user enters **email** and **password**. 
3. The system validates:  
   - Both fields are filled. 
   - Email format is valid. 
4. The system checks credentials against the database. 
5. If credentials are valid and the account is active:  
   - The system generates a **JWT access token** and optional **refresh token**.
   - The system stores tokens securely (HTTP-only cookies or secure storage). 
   - The user is redirected to their **Dashboard** page. 
6. The system logs the login event for audit and security purposes. 

---

### Alternative Flows

- **A1 – Missing credentials:**  
  The system displays *“Please enter both email and password.”* 

- **A2 – Invalid credentials:**  
  The system displays *“Incorrect email or password.”*

- **A4 – Account locked after multiple failed attempts:**  
  The system displays *“Too many failed login attempts. Please try again later.”* 

---

### Exceptions

- **E1 – Network/server error:**  
  The system displays *“Unable to process login. Please try again later.”* 

- **E2 – Token generation error:**  
  The system displays *“Authentication failed. Please contact support.”*

---

### Postconditions

- A valid, active user session is established.  
- The user gains access to authorized features and pages according to their role.  
- The system logs the authentication event for audit. 

---

### Linked Requirements

- [REQ-AU-04 — User Login Form](./../../requirements/REQ-Auth.md#req-au-04--user-login-form)  
- [REQ-AU-05 — Input Validation (Login)](./../../requirements/REQ-Auth.md#req-au-05--input-validation-login)  
- [REQ-AU-06 — Session Generating](./../../requirements/REQ-Auth.md#req-au-06--session-generation)  
- [REQ-AU-07 — Logout](./../../requirements/REQ-Auth.md#req-au-07--logout)  
- [REQ-AU-10 — Authentication Logging](./../../requirements/REQ-Auth.md#req-au-10--authentication-logging) 
- [REQ-AU-11 — Account Lockout Policy](./../../requirements/REQ-Auth.md#req-au-11--account-Lockout-policy)

---

### Acceptance Criteria (Gherkin)

```gherkin
@REQ-AU-04 @REQ-AU-05 @REQ-AU-06 @REQ-AU-07 @REQ-AU-10
Scenario: Successful login
    Given I am on the login page
    When I enter a valid email and password
    And I click "Login"
    Then I see "Login successful"
    And I am redirected to my dashboard

@REQ-AU-05
Scenario: Missing credentials
    Given I am on the login page
    When I leave the email or password empty
    And I click "Login"
    Then I see "Please enter both email and password"

@REQ-AU-06 @REQ-AU-05
Scenario: Invalid credentials
    Given I am on the login page
    When I enter an incorrect email or password
    And I click "Login"
    Then I see "Incorrect email or password"

@REQ-AU-07
Scenario: Logout
    Given I am logged into my account
    When I click "Logout"
    Then my session is invalidated
    And I can no longer access protected pages

@REQ-AU-10
Scenario: The system logs all authentication-related events for audit and security
    Given the system is running and authentication logging is enabled
    And an administrator has access to the audit log viewer

    # Login success
    When a user enters valid credentials and successfully logs in
    Then a log entry is recorded containing:
        | eventType | login_success |
        | userId    | <user-id>     |
        | timestamp | <timestamp>   |
        | ipAddress | <ip-address>  |
    And the log entry is stored securely and protected from tampering

    # Login failure
    When the same user attempts to log in again with an incorrect password
    Then a log entry is recorded containing:
        | eventType | login_failure |
        | userId    | <email>       |
        | timestamp | <timestamp>   |
        | ipAddress | <ip-address>  |
    And failed and successful login events must be clearly distinguishable in the logs

    # Account lockout
    When the user reaches the maximum number of allowed failed login attempts
    Then the system locks the account
    And a log entry is recorded containing:
        | eventType | account_lockout |
        | userId    | <user-id>       |
        | timestamp | <timestamp>     |
        | ipAddress | <ip-address>    |

    # Logout
    When the user logs out of the system
    Then a log entry is recorded containing:
        | eventType | logout        |
        | userId    | <user-id>     |
        | timestamp | <timestamp>   |
        | ipAddress | <ip-address>  |

    # Admin audit
    And when the administrator reviews the audit log
    Then all recorded authentication events appear in chronological order
    And each entry contains valid metadata (eventType, userId, timestamp, IP)
    And the administrator can distinguish between login_success, login_failure, logout, and account_lockout events

@REQ-AU-11
Scenario: Too many failed login attempts
    Given I have failed to log in five times
    When I try again
    Then I see "Too many failed attempts. Your account has been temporarily locked"

