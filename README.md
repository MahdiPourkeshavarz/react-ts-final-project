# GadgetHub

A React final project for Maktab Sharif bootcamp 113. This project is a shopping
website with Admin panel which users can browse through products and order
whatever they wish. also the shop manager can controle the products (details,
price, quantity), and also view the orders list and submit them

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

4. **Run the project**

```bash
npm run dev
```

5. **Clone the back-end repository**

```bash
git clone https://github.com/MahdiPourkeshavarz/react-ts-final-project-backend.git
```

6. **Navigate to the project directory**

```bash
cd react-ts-final-project-backend
```

7. **Install dependencies**

```bash
npm install
```

8. **Run the back-end project**

```bash
npm run dev
```

9. **Clone the payment link repository**

```bash
git clone https://github.com/MahdiPourkeshavarz/maktab-final-react-paymentLink.git
```

10. **Navigate to the payment project directory**

```bash
cd maktab-final-react-paymentLink
```

11. **Install dependencies**

```bash
npm install
```

12. **Run the payment project**

```bash
npm run dev
```

## Usage

1. **Run the development server for the backend project**

```bash
cd react-ts-final-project-backend
npm run dev
```

**Notice** : the server setup requires to connect it to a mongo db server before
running it. you can make the required modification in the config.env file >
DATABASE_URL variable

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
  - **Category**: Mui module for adding new category to the list of categories.
  - **SubCategory**: Mui module for adding new subcategory based on selected
    category to the list of subcategories.
  - **Product**: Mui module for adding new product based on selected category
    and subcategory to the list.
  - **Pages**: based on adminLayout there are three virtual pages that will
    render in the middle of screen.
    - **Products**: data table that just shows all the products and admin can
      check the detail of them and change them.
    - **Inventory**: data table for only showing quantities and prices for each
      product. admin can edit these two information.
    - **Orders**: data table for only showing submitted orders and check the
      detail of each order and change the delivery status to delivered manually.
- **AuthenticationPage**: Access page to the shopping website and admin panel.
  - **AuthForm** : Handle the entered data and after validating it sends the
    requests to backend for authorization.
- **HomePage**: the landing page of the website. user or admin can browse the
  browse the products or navigate through the categories.
- **CategoryPage and SubCategoryPage** : these two pages are basically the same
  because of the system of shopLayout. user can use the sidebar to navigate to
  the categories and subcategories.
- **ErrorPage**: this page will appear only if the url doesn't matches with any
  specified routes and helps user get back to the home page.
- **ProductPage**: this the page for each product that shows information about
  them.user also can add the product to cart here.
- **ShoppingCartPage**: the selected product by user will appear in this page
  and user can edit the quantity of each product.
- **OrderPage**: user can finalize the order and fill the necessary delivery
  information. after this page user will navigate to payment link on the other
  project.
- **OrderStatusPage**: after user pay the price will navigate to this page that
  show the status of the payment. and depending on the status user will navigate
  to home or order page again.
- **Header** : it is fixed to the top of the screen and handles changing theme
  and some routing
- **AppRoute** : Main component for displaying the pages with routing logic
  behind it

## Technologies

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain
  JavaScript.
- **Vite**: A fast build tool and development server for modern web projects.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **TanStack Query**: Powerful asynchronous state management for data fetching.
- **Axios**: Promise-based HTTP client for making requests.
- **React-Hook-Form** : A reusable for component and helpful logic for handling
  submitted data.
- **Zustand**: A fast and easy to use context management tool.
- **Mui**: A complete Ui toolkit for using through the whole application
- **Yup**: A dependency like package for react-hook-form input data validation.
- **React Hot Toast**: a clean and easy to use toaster for notification.
- **Tailwind Scrollbar Hide**: a helpful package that removes scrollbar from
  element with overflow.
- **React Multi Date Picker**: a calendar for submitting the selected date for
  delivery.
- **Ck Editor**: a powerful text editor with a lot of option for styling the
  text.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file
for more details.
