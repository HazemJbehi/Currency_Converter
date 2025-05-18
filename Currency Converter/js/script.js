// Wait for the page to fully load before running our code
document.addEventListener('DOMContentLoaded', function() {
    // Get all the elements we need to work with
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const amountInput = document.getElementById('amount');
    const convertBtn = document.getElementById('convert-btn');
    const swapBtn = document.getElementById('swap-btn');
    const resultDiv = document.getElementById('result');
    
    // API endpoint for currency conversion
    const API_URL = 'https://api.exchangerate-api.com/v4/latest/';
    
    // Common currencies to use in our converter
    const commonCurrencies = [
        'USD', 'EUR', 'GBP', 'JPY', 'CAD', 
        'AUD', 'CHF', 'CNY', 'INR', 'MXN'
    ];
    
    // Start the app
    init();
    
    // Set everything up when the page loads
    function init() {
        // Fill the dropdown menus with currencies
        populateCurrencySelects();
        
        // Set default values
        fromCurrencySelect.value = 'USD';
        toCurrencySelect.value = 'EUR';
        
        // Set up button click handlers
        convertBtn.addEventListener('click', handleConversion);
        swapBtn.addEventListener('click', swapCurrencies);
    }
    
    // Fill the dropdown menus with currency options
    function populateCurrencySelects() {
        // Add each currency as an option
        commonCurrencies.forEach(currency => {
            const fromOption = document.createElement('option');
            fromOption.value = currency;
            fromOption.textContent = currency;
            
            const toOption = document.createElement('option');
            toOption.value = currency;
            toOption.textContent = currency;
            
            fromCurrencySelect.appendChild(fromOption);
            toCurrencySelect.appendChild(toOption);
        });
    }
    
    // Convert the currency when user clicks the button
    async function handleConversion() {
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        const amount = parseFloat(amountInput.value);
        
        // Make sure amount is valid
        if (isNaN(amount) || amount <= 0) {
            resultDiv.innerHTML = '<div style="color: red;">Please enter a valid amount</div>';
            return;
        }
        
        try {
            // Let user know we're working on it
            resultDiv.textContent = 'Converting...';
            
            // Get the conversion data
            const result = await convertCurrency(fromCurrency, toCurrency, amount);
            
            // Show the result
            resultDiv.innerHTML = `
                <strong>${amount} ${fromCurrency} = ${result.convertedAmount} ${toCurrency}</strong>
                <div>Exchange rate: 1 ${fromCurrency} = ${result.rate} ${toCurrency}</div>
            `;
            
        } catch (error) {
            resultDiv.innerHTML = '<div style="color: red;">Conversion failed. Please try again later.</div>';
        }
    }
    
    // Do the actual currency conversion
    async function convertCurrency(fromCurrency, toCurrency, amount) {
        const response = await fetch(`${API_URL}${fromCurrency}`);
        const data = await response.json();
        
        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);
        
        return {
            convertedAmount: convertedAmount,
            rate: rate.toFixed(4)
        };
    }
    
    // Swap the selected currencies
    function swapCurrencies() {
        const fromValue = fromCurrencySelect.value;
        const toValue = toCurrencySelect.value;
        
        fromCurrencySelect.value = toValue;
        toCurrencySelect.value = fromValue;
    }
});