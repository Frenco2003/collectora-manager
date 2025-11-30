# Authentication Requirements

## REQ-AU-01 — User Registration
**Type:** Functional Requirement  
**Category:** Authentication  

**Description:**  
The system must allow a new user to create an account by providing the required personal information (e.g., email, name, password).

**Acceptance Criteria:**  
- The registration form must be accessible to unauthenticated users.
- The user must receive feedback in case of missing or invalid fields.

**Linked Use Cases:**  
- UC-001 — User Registration

---

## REQ-AU-02 — Email Uniqueness Validation
**Type:** Functional Requirement  
**Category:** Authentication  

**Description:**  
The system must verify that the email provided during registration does not already exist in the database.

**Acceptance Criteria:**  
- If the email is already used, registration must be blocked.
- The system must display an appropriate error message.

**Linked Use Cases:**  
- UC-001 — User Registration

---

## REQ-AU-03 — Password Strength Validation
**Type:** Functional Requirement  
**Category:** Authentication  

**Description:**  
The system must validate the user's password according to the system rules.

**Acceptance Criteria:**  
- The system must give clear instructions on password requirements.

**Linked Use Cases:**  
- UC-001 — User Registration

---

## REQ-AU-04 — User Login
**Type:** Functional Requirement  
**Category:** Authentication  

**Description:**  
The system must allow registered users to log in using a valid email and password.

**Acceptance Criteria:**  
- Login must succeed only if the user provides correct credentials.
- The system must return clear error messages in case of invalid login.

**Linked Use Cases:**  
- UC-002 — User Login

---

## REQ-AU-05 — Credential Validation
**Type:** Functional Requirement  
**Category:** Authentication  

**Description:**  
The system must validate user credentials by checking email existence and password correctness.

**Acceptance Criteria:**  
- If the email does not exist, access is denied.
- If the password is incorrect, access is denied.
- Error messages must not reveal which part of the credentials is wrong (security best practice).

**Linked Use Cases:**  
- UC-002 — User Login

---

## REQ-AU-06 — Session Generation
**Type:** Functional Requirement  
**Category:** Authentication  

**Description:**  
Upon successful login, the system must create a secure session or JWT token that identifies the authenticated user.

**Acceptance Criteria:**  
- The token/session must expire after a predefined timeout.
- Only authenticated users must be able to access protected endpoints.

**Linked Use Cases:**  
- UC-002 — User Login

---

## REQ-AU-07 — Logout
**Type:** Functional Requirement  
**Category:** Authentication  

**Description:**  
The system must allow authenticated users to log out, invalidating their session or token.

**Acceptance Criteria:**  
- After logout, protected actions must not be accessible.
- The logout must destroy or invalidate au

---

## REQ-AU-08 — GDPR Consent
**Type:** Functional Requirement  
**Category:** Authentication  

**Description:**  
The system must require users to explicitly accept the GDPR Privacy Policy during registration, and must store the timestamp and version of the accepted policy.

**Acceptance Criteria:**  
- Registration cannot be completed unless the user has accepted the GDPR terms.
- The system must store the date, time, and version of the accepted privacy policy.
- The user must be informed that consent is required to proceed.
- The system must display a clear message if the user attempts to register without providing consent.

## REQ-AU-09 — CAPTCHA Verification
**Type:** Functional Requirement  
**Category:** Authentication  

**Description:**  
The system must require users to successfully complete a CAPTCHA challenge during the registration process to prevent automated or bot-driven account creation.

**Acceptance Criteria:**  
- Registration cannot be completed unless the CAPTCHA challenge is successfully solved.
- If the CAPTCHA is missing or invalid, the system must block the registration and display an appropriate error message.
- The CAPTCHA component must be visible and accessible on the registration form.
- CAPTCHA validation must occur server-side to prevent tampering.

---

## REQ-AU-10 — Authentication Logging
**Type:** Functional Requirement  
**Category:** Security / Audit  

**Description:**  
The system must log all authentication-related events for auditing and security monitoring.  
This includes login successes, login failures, logouts, and account lockouts.

**Acceptance Criteria:**  
- Each log entry must include:
  - User identifier (e.g., ID or email)
  - Timestamp
  - IP address
  - Event type (e.g., login success, login failure, logout, lockout)
- Logs must be stored securely and protected against tampering.
- Logs must be retrievable by administrators for audit and analysis.
- Failed and successful login events must be clearly distinguishable.

**Linked Use Cases:**  
- UC-002 — User Login

---

## REQ-AU-11 — Account Lockout Policy
**Type:** Functional Requirement  
**Category:** Security / Authentication  

**Description:**  
The system must temporarily lock a user’s account after a predefined number of consecutive failed login attempts (e.g., five).  
This lockout mechanism protects against brute-force and password guessing attacks.

**Acceptance Criteria:**  
- After reaching the maximum number of failed login attempts, the account must be locked.
- The lockout duration must be configurable (e.g., 15 minutes).
- The user must be notified that their account has been locked and informed when it will unlock.
- While the account is locked:
  - Login attempts must be rejected.
  - The system must log all additional failed attempts.
- An administrator must be able to manually unlock the account if necessary.

**Linked Use Cases:**  
- UC-002 — User Login