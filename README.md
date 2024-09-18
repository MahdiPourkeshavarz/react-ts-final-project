# GadgetHub

A React final for Maktab Sharif bootcamp 113
This project is a shopping website with Admin panel which users can browse through products and order whatever they wish. also the shop manager can controle the products (details, price, quantity), and also view the orders list and submit them

## Table of Contents

- [Installation](#Installation)
- [Usage](#Usage)
- [Scripts](#Scripts)
- [Components](#Components)
- [Technologies](#Technologies)
- [License](#License)

## Installation

1. **Clone the front-end repository**

```bash
git clone https://github.com/MahdiPourkeshavarz/react-ts-final-project.git
```

2. **Navigate to the project directory**

```bash
cd react-ts-final-project
```

3. **Install dependencies**

```bash
npm install
```

4. **Clone the back-end repository**

```bash
git clone https://github.com/MahdiPourkeshavarz/react-ts-final-project-backend.git
```

5. **Navigate to the project directory**

```bash
cd react-ts-final-project-backend
```

6. **Install dependencies**

```bash
npm install
```

## Usage

1. **Run the development server for the backend project**

```bash
cd react-ts-final-project-backend
npm run dev
```

**Notice** : the server setup requires to connect it to a mongo db server before running it. you can make the required modification in the config.env file > DATABASE_URL variable

2. **Run the development server for the front project**

```bash
cd react-ts-final-project
npm run dev
```

3. **Open the browser and navigate to**

```
http://localhost:5173
```

## Scripts

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the app for production.
- **`npm run preview`**: Previews the production build.
- **`npm run lint`**: Runs the linter.

## Components

- **AdminPage**: Main admin panel component.
  - **ButtonGroup**: Handles selection between different data views.
  - **DataTable**: Displays data in a table format with optional inline editing.
- **AuthenticationPage**: Access page to the shopping website and admin panel
  - **AuthForm** : Handle the entered data and after validating it sends the requests to backend for authorization
- **Header** : it is fixed to the top of the screen and handles changing theme and some routing
- **AppRoute** : Main component for displaying the pages with routing logic behind it

## Technologies

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite**: A fast build tool and development server for modern web projects.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **TanStack Query**: Powerful asynchronous state management for data fetching.
- **Axios**: Promise-based HTTP client for making requests.
- **React-Hook-Form** : A reusable for component and helpful logic for handling submited data.
- **Zustand**: A fast and easy to use context management tool.
- **Mui**: A complete Ui toolkit for using through the whole appilcation
- **Yup**: A dependenciy like package for react-hook-form input data validation.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
