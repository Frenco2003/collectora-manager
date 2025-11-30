# Use Cases — Overview

**Scope:** Instrument Management System • **Version:** 1.0  
**Conventions:** UC-###-Description

| ID | Title | Main Actors | Short Goal | Scope | Level | Priority | Linked Requirements |
|----|--------|--------------|------------|--------|--------|----------|----------------------|
| [UC-001](./../usecase/UC-001-UserRegistration.md) | User Registration | *New User* | Create a valid account in the system | System | User-Goal | High | [REQ-AU-01](./../../requirements/REQ-Auth.md#req-au-01--user-registration), [REQ-AU-02](./../../requirements/REQ-Auth.md#req-au-02--email-uniqueness-validation), [REQ-AU-03](./../../requirements/REQ-Auth.md#req-au-03--password-strength-validation), [REQ-AU-08](./../../requirements/REQ-Auth.md#req-au-08--gdpr-consent), [REQ-AU-09](./../../requirements/REQ-Auth.md#req-au-09--captcha-verification) | 
| [UC-002](./../usecase/UC-002-UserLogin.md) | User Login | *Registered User* | Access the system with valid credentials | System | User-Goal | High | [REQ-AU-04](./../../requirements/REQ-Auth.md#req-au-04--user-login), [REQ-AU-05](./../../requirements/REQ-Auth.md#req-au-05--credential-validation),[REQ-AU-06](./../../requirements/REQ-Auth.md#req-au-06--session-generation),[REQ-AU-07](./../../requirements/REQ-Auth.md#req-au-07--logout),[REQ-AU-10](./../../requirements/REQ-Auth.md#req-au-10--authentication-logging), [REQ-AU-11](./../../requirements/REQ-Auth.md#req-au-11--account-lockout-policy)

