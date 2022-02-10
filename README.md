# Inventory Management System

## Pre-requisites

Make sure these tools are installed before proceeding

-   [Git](https://git-scm.com/) - our app is stored in a repository on github, we need this to be able to do fetch, and updates on the repository. It also has a lot of other uses and should be worth reading about.
-   [NodeJS and NPM](https://nodejs.org/en/) - a package manager for javascript packages/libraries like ReactJS, Styled Components, etc.
- [Docker & Docker Compose](https://docs.docker.com/) (optional) -used to contain our app to lessen issues caused by using different environments.

---

## Tech

These are some of the tech we'll be using.

-   [React JS](https://reactjs.org/docs/getting-started.html)
-   [Styled Components](https://styled-components.com/docs/basics#getting-started) - to replace .css files, already comes with scss syntax.
-   [Tailwind CSS](https://tailwindcss.com/docs/padding) - provides css utitlities like bootstrap

---

## Setup

Copy the repository from github to your local machine with

```bash
git clone https://github.com/jtjeruta/inventory-management-system.git
```

"cd" into the inventory-management-system directory

```bash
cd inventory-management-system
```

Create a `.env` file in the root folder and add the following

```bash
export REACT_APP_FIREBASE_API_KEY='{{FIREBASE_API_KEY}}'
export REACT_APP_FIREBASE_AUTH_DOMAIN='{{FIREBASE_AUTH_DOMAIN}}'
export REACT_APP_FIREBASE_PROJECT_ID='{{FIREBASE_PROJECT_ID}}'
export REACT_APP_FIREBASE_STORAGE_BUCKET='{{FIREBASE_STORAGE_BUCKET}}'
export REACT_APP_FIREBASE_MESSAGING_SENDER_ID='{{FIREBASE_MESSAGING_SENDER_ID}}'
export REACT_APP_FIREBASE_APP_ID='{{FIREBASE_APP_ID}}'
export REACT_APP_FIREBASE_MEASUREMENT_ID='{{FIREBASE_MEASUREMENT_ID}}'
```

---

## Installation with Docker (optional)

This requires docker and docker compose to be installed.

```bash
npm run dev
```

This command builds and starts the app for you.

---

## Installation without Docker

Install dependencies manually

```bash
npm install
```

Load the environment variables

```bash
source .env
```

Run the app

```bash
npm start
```
