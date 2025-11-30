# Use Case — Field Definitions

This document describes the meaning, purpose and possible values of every field used in the Use Case Overview table.

---

## ID
**What it is:**  
A unique identifier assigned to each Use Case.

**Format:**  
`UC-XXX` where `XXX` is a progressive number (e.g., `UC-001`).

---

## Title
**What it is:**  
A short, descriptive name that summarizes the Use Case.

**Characteristics:**  
- Must be concise (3–6 words).  
- Describes the user goal.

---

## Main Actors
**What they are:**  
The user roles or external systems that initiate or interact with the Use Case.

**Types of actors:**
- **Primary Actor:** The one that triggers the use case.
- **Secondary Actors:** Support by providing data or interacting indirectly.

---

## Short Goal
**What it is:**  
A one-sentence description of the user’s actual objective.

---

## Scope
**What it is:**  
Defines whether the use case is about the **system’s behavior** or **business logic**.

**Possible values:**
- **System:** The use case describes functionalities implemented by the software.  
- **Business:** Higher-level domain processes, not necessarily technical.

---

## Level
Indicates the **abstraction level** of the Use Case.

### Possible values:

### **User-Goal**
- Represents a complete and meaningful goal for the user.
- The most important category.

---

### **Subfunction**
- A lower-level use case that supports a larger one.
- Not a standalone user goal.

---

##  Priority
Defines how important a use case is for the system.

### Possible values:

### **High**
- Core functionalities.
- System cannot operate without them.
- Often linked to critical requirements.

### **Medium**
- Important but not mandatory for MVP.
- May be implemented after core features.

### **Low**
- Enhancements or optional behaviors.
- Often postponed if time is limited.

---

##  Linked Requirements
**What it is:**  
A reference to the requirement(s) that the Use Case satisfies.

**Format:**  
`REQ-XXX`

---

#   Summary Table of Fields

| Field | Meaning | Notes |
|-------|---------|--------|
| **ID** | Unique code (UC-XXX) | Required |
| **Title** | Short name of the UC | Required |
| **Main Actors** | Who performs the UC | At least one actor |
| **Short Goal** | One-line description of the objective | Required |
| **Scope** | System or Business | Usually System |
| **Level** | User-Goal / Subfunction / Summary | Required |
| **Priority** | High / Medium / Low | Recommended |
| **Linked Requirements** | REQ codes associated with the UC | Recommended |

---

