# Contributing to MLA Fitness App

Thank you for your interest in contributing to the MLA Fitness App! This document outlines the guidelines and best practices for contributing to the project.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Style Guides](#style-guides)
   - [JavaScript Style Guide](#javascript-style-guide)
   - [Java Style Guide](#java-style-guide)
   - [Python Style Guide](#python-style-guide)
   - [General Style Guide](#general-style-guide)
   - [Best Practices](#best-practices)
3. [Commit Messages](#commit-messages)
4. [Pull Requests](#pull-requests)
5. [Bug Reporting](#bug-reporting)

---

## Getting Started

### Prerequisites

Ensure the development environment is set up as described in the [README](README.md), including the installation of required tools like Node.js, Python, Java, and Docker.

### Development Workflow

1. Fork the repository and clone your fork.
2. Create a new branch for your feature or bugfix.
3. Follow the style guides outlined below while making changes.
4. Commit your changes with clear and descriptive messages.
5. Push your branch and create a pull request (PR) against the `main` branch.

---

## Style Guides

### JavaScript Style Guide

- **Linting:** Use Prettier for all JavaScript code.
- **Variable Declarations:**
  - Use `let` or `const` and declare variables only once.
  - Declare variables at the start of the function, one per line.
  - Each variable should be declared on a separate line - including variables that are only declared but do not get a value assigned
- **Indentation:** Use 2 spaces for indentation.
- **Camel Casing:** Use `lowerCamelCase` for variables and methods, except constants which should be `UPPER_SNAKE_CASE`.
- **Object Operations:** Prefer the spread operator (`{...obj}`) over `Object.assign()`.
- **Exports:** Inline exports with expressions whenever possible:
  ```javascript
  export default class ClassName {
    // ...
  }
  ```
- **Comments:** Comment sections of code that are complex or non-obvious. Explain _why_, not _what_.

### Java Style Guide

- Return values must start on the same line as the return keyword.
- **Variable Declarations:**
  - All variables must be declared with a type before they are used and should be initialised immediately if possible.
  - Variables should be declared close to where they are first used.
  - Each variable should be declared on a separate line.
  - Use meaningful, descriptive names for variables.
- **Indentation:**
  - Use 4 spaces for indentation.
  - Avoid trailing whitespace at the end of any line.
- **Naming Conventions:**
  - Classes and interfaces: `PascalCase`.

```java
public class MyClass {}
public interface MyInterface {}
```

- Variables and methods: `camelCase`.
- Constants: `UPPER_SNAKE_CASE`.
- **Class Structure:**
  - Order: static variables → instance variables → constructors → methods.
- **Formatting:**
  - Place opening `{` on the same line as the declaration.
  - Align closing `}` with the start of the declaration.
- **Comments:** Use Javadoc (`/** */`) for methods and classes. Focus on explaining _why_ rather than _what_.

### Python Style Guide

- **PEP 8 Compliance:** All Python code must adhere to the [PEP 8 Style Guide](https://peps.python.org/pep-0008/).
- **Indentation:** Use 4 spaces, no tabs.
- **Naming Conventions:**
  - Functions and variables: `snake_case`.
  - Constants: `UPPER_SNAKE_CASE`.
  - Classes: `PascalCase`.
- **Type Hints:** Use Python's type annotations for function signatures.
- **Line Length:** Limit lines to 79 characters.
- **Imports:**
  - Use absolute imports wherever possible.
  - Don't import using \* if you can help it.
  - Group imports: standard library → third-party → local.

#### Documenting Code

#### Docstrings

- **Should be used to document:**
  - Modules
  - Classes
  - Functions
- **New documentation should include:**
  1. **A summary**
  2. **(Optional) Description:** Expand or add extra information if needed.
  3. **Args (for functions):** Detail any arguments and their purpose.
  4. **Return information:** Describe what the function returns (if applicable).
  5. **Raises:** Outline any exceptions raised by the function (if applicable).
- Additional information may also be appropriate based on context.

#### Comments

- **Purpose:** Explain the logic of the code and why it has been written.
- Use comments especially to clarify tricky sections of the code.
- **Formatting:**
  - Leave a blank line before comments.
  - Comments should start on their own line.
- **Special tags:**
  - **TODO:** Mark sections requiring future attention or updates.
    ```python
    # TODO: Refactor this function to improve performance.
    ```
  - **NOTE:** Provide important context or explanations about specific code sections.
    ```python
    # NOTE: This is a workaround for a known issue in the third-party library.
    ```
  - **XXX:** Highlight problematic or risky areas of code that need urgent attention.
    ```python
    # XXX: This section should be re-implemented to prevent future bugs.
    ```
- When used, align text for readability:
  ```python
  # NOTE: Each line here should properly align after the prefix, so
  #       that the "NOTE" clearly stands out and isn't buried in the
  #       comment.
  ```

#### Naming Conventions

- **Functions, Variables, and Modules:** Use all lowercase with underscores separating words (`snake_case`).
- **Class Names:** Use CamelCase format (`PascalCase`).
- **Booleans:** Use "is" or "has" prefixes to clearly indicate intent.
  ```python
  is_active = True
  has_permissions = False
  ```

#### Constants

- Use all caps with underscores:
  ```python
  MAX_SIZE = 100
  CONNECTION_TIMEOUT = 50
  ```

#### Strings

- **Single Quotes:** Prefer single quotes (`'`) over double quotes (`"`) unless the string contains a quote inside.
- **Multi-line Strings:** For strings containing newline characters (`\n`), continue the string on the next line:
  ```python
  str1 = 'This is a simple string.'
  str2 = "This one's got a single quote."
  str3 = ('This one is more complicated.\n\n'
          'There are multiple lines involved.')
  str4 = (
      'This is a long line that might take up much of the line width '
      'so we will go ahead and indent it four spaces in so we have a '
      'lot more room to work with without worrying about making '
      'strings feel a bit crowded and hard to edit.'
  )
  ```

#### Testing

- **Key Guidelines:**
  - Key methods and functions should be covered by unit tests.
  - After making code changes, ensure all tests still pass.
    - If a test fails due to a change in outputs, update the tests as needed.
  - Any significant changes or additions to the codebase should include corresponding new tests.

---

### General Style Guide

**File Structure:**

1. Keep files small and focused on a single responsibility.
2. Organize files into directories by feature or functionality.

**Functions and Methods:**

1. Each function or method should do one thing and do it well.
2. Limit function length to maintain readability and maintainability.

**Avoid Magic Numbers and Strings:**

- Use constants for numbers or strings that have significant meaning:

  ```python
  # Instead of:
  ex_ample = "example"

  # Use:
  EX_AMPLE = "example"
  ```

**Variables**

**Naming:**

1. Use meaningful and descriptive names.
2. Use consistent naming conventions:
   - `snake_case` for Python.
   - `camelCase` for JavaScript.
   - Use both appropriately for Java.

**Declaration:**

1. Declare variables as close to their first use as possible.
2. Avoid reusing variables for multiple purposes.

---

**Indentation and Formatting**

1. Use spaces, not tabs, for indentation.
2. Use a consistent number of spaces (commonly **2** or **4**).
   **Line Length:**
3. Limit lines to **80-100 characters** for readability.
   **Blank Lines:**
4. Use blank lines to separate logical sections of code for clarity.

---

**Inline Comments**

- Write comments sparingly to explain **why**, not **what**, the code does.

---

### Best Practices

1. Keep It Simple, Stupid (KISS):

- Write simple and straightforward code. Avoid overengineering.

2. Don't Repeat Yourself (DRY):\*\*

- Abstract repeated code into functions or reusable components.

3. Consistency is Key:\*\*

- Follow a consistent style across the entire codebase.
- Adhere to established guidelines like:
  - PEP 8 for Python.
  - Prettier for JavaScript.

4. Test Your Code:

- Write unit tests to ensure functionality.
- Use automated testing tools to check edge cases and prevent regressions.

---

## Commit Messages

- Use present tense (e.g., "Add feature" not "Added feature").
- Keep messages concise but descriptive.
- Format:

  ```
  <Type>: <Short Description>
  [Optional Body with more details about the change]
  ```

  Examples:

  - `feat: Add new activity tracking endpoint`
  - `fix: Resolve issue with MongoDB connection`

---

## Pull Requests

1. Ensure your branch is up-to-date with `main`.
2. Run all tests and linters to verify code quality.
3. Provide a detailed description of your changes in the PR.
4. Link any relevant issues or tickets in the description.

---

## Bug Reporting

We appreciate your help in identifying and resolving bugs! To report a bug:

1. **Search Existing Issues**:
   - Before submitting, search the [Issues](https://github.com/NicolaWard-SBG/MLA-app/issues) section to check if the bug has already been reported.
2. **Submit a New Issue**:
   - If no existing issue covers your bug, create a new issue with the following details:
     - **Title**: A clear and concise title for the bug.
     - **Description**: Provide a detailed description of the issue.
     - **Steps to Reproduce**: List the steps needed to reproduce the bug.
     - **Expected Behavior**: Describe what you expected to happen.
     - **Actual Behavior**: Describe what actually happened.
     - **Environment**:
       - Browser and version (if applicable).
       - Operating system.
       - Any other relevant context.
3. **Attach Screenshots or Logs**:
   - Include screenshots, error logs, or other supporting materials to help us understand the issue.

Thank you for contributing and helping us improve the MLA Fitness App!
