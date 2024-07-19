# Siemens SDET Technical Task

## Getting Started

First, clone this repository:

```sh
git clone https://github.com/Heba2h/siemens-SDET
```
## Prerequisites
Install NVM (Node Version Manager) to manage different versions of Node.js.

## Installing Node.js Versions
For the Nightwatch task, run:
```sh
nvm install 20
```
For the mock-user-auth task, run:
```sh
nvm install 11
```
## Repository Structure

This repository contains two tasks:

1. **UI Testing**
2. **API Testing**

# UI Testing
## Follow these steps to run the UI tests:

1. **Open Command Prompt (CMD).**
2. **Navigate to the UI tests directory:** 
```sh
cd siemens-SDET/UI_tests/
```
3. **Use Node.js version 20:**
```sh
nvm use 20
```
4. **Install the required packages:**
```sh
npm install
```
5. **Run the test cases in Chrome using Nightwatch.js:**
```sh
npx nightwatch -e chrome
```
6. **The test HTML report can be found at:**

```siemens-SDET/UI_tests/tests_output/nightwatch-html-report/index.html```

# API Testing
## Follow these steps to run the UI tests:

1. **Open PowerShell.**
2. **Navigate to the `mock-user-auth` directory:**

```sh
   cd siemens-SDET/mock-user-auth/
```

3. **Use Node.js version 20:**
```sh
nvm use 11
```
4. **Install the required packages:**
```sh
npm install
npm install mocha-multi-reporters
```
5.0 **Open another Windows PowerShell to run the server using:**
```sh
npm run dev
```
5.1 **Run the test cases in Windows PowerShell:**
```sh
$env:NODE_ENV="test"; .\node_modules\.bin\mocha --require @babel/register --require babel-polyfill --reporter mocha-multi-reporters --reporter-options configFile=reporter-config.json .\test\**\*.spec.js
```
 6. **The test HTML report can be found at:**
  ```siemens-SDET/mock-user-auth/reports/mochawesome.html```
