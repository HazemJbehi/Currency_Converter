# Currency Converter

A web-based currency converter application that demonstrates fundamental web development concepts including DOM manipulation, JavaScript for dynamic content, AJAX requests, and local data storage.

## Features

- Convert between different currencies using real-time exchange rates
- Swap currencies with a single click
- View conversion history
- Persistent storage of user preferences and conversion history
- Responsive design for mobile and desktop

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API for AJAX requests
- localStorage for data persistence

## Project Structure

- `index.html` - Main HTML structure
- `css/style.css` - Styling for the application
- `js/app.js` - Main application logic
- `js/api.js` - Functions for API communication
- `js/storage.js` - Functions for local storage management

## API Used

This project uses the [ExchangeRate-API](https://www.exchangerate-api.com/) to fetch current exchange rates.

## How to Use

1. Enter the amount you want to convert
2. Select the source currency from the dropdown
3. Select the target currency from the dropdown
4. Click "Convert" to see the result
5. View your conversion history below
6. Use the "Clear History" button to remove all history items

## Educational Objectives

This project demonstrates:

1. DOM manipulation in a web page
2. Using JavaScript to dynamically modify content and styles
3. Implementing AJAX requests to communicate with external services
4. Managing local data using localStorage and sessionStorage