# cute-eve

[![Build Status](https://app.travis-ci.com/KabakiAntony/cute-eve.svg?branch=main)](https://app.travis-ci.com/KabakiAntony/cute-eve) 

This is simple point of sale system for a small outlet, this however is the frontend for the system. It is done in Vue js, it communicates with an api to carryout various functionalities like user managemgent, stock management, sales and reporting.

### Features that will be available
- The system has three modules or features for now
    1. Admin 
    2. Procurement
    3. sales

- The admin feature which is only accessible to the admin user is for user management, that is user creation, roles elevation, user suspension and removal eventually. The admin has access to stock reports and historical sales report in that they can generate sales report for any particular date or a duration.

- The procurement feature is stock management , that is adding new stock into the system, updating stock items and eventually removal of items from stock, it also has access to stock balances reports and cumulative dated sales reports.

- The sales feature is meant for making sales and accessing the sellers sales report for the day, a seller can only access their sales report for the day in question.


### Installation Instructions

This projects requires the following to be setup for you to be able to run it locally or make any changes to it

* Node (Javascript runtime engine)
* npm (Node Package Manager)
    - this will be installed with the node installation
* Vue Js
    - npm init vue@latest or npm init vue@3

### Working with the cute-eve app

Running the cute-eve app locally on your local machine will be as easy as the following instructions

**On Windows or Linux or Mac**

```
git clone  https://github.com/KabakiAntony/cute-eve.git
cd cute-eve
npm install
```

### Running the app

Compiling and hot-reloads for development

```
npm run dev
```

Running unit tests

```
npm run test
```

<details open>

Incase of a bug or anything else use any on the below channels to reach me

[Find me on twitter](https://twitter.com/kabakiantony) OR  drop me an email at kabaki.antony@gmail.com.