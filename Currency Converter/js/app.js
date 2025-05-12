/**
 * Main application logic for currency converter
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const amountInput = document.getElementById('amount');
    const convertBtn = document.getElementById('convert-btn');
    const swapBtn = document.getElementById('swap-btn');
    const resultDiv = document.getElementById('result');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history');
    
    // Initialize the app
    init();
    
    /**
     * Initialize the application
     */
    async function init() {
        try {
            // Load currencies
            const currencies = await API.fetchCurrencies();
            populateCurrencySelects(currencies);
            
            // Load user preferences
            loadPreferences();
            
            // Display history
            displayHistory();
            
            // Add event listeners
            convertBtn.addEventListener('click', handleConversion);
            swapBtn.addEventListener('click', swapCurrencies);
            clearHistoryBtn.addEventListener('click', clearHistory);
            
            // Save preferences when selections change
            fromCurrencySelect.addEventListener('change', savePreferences);
            toCurrencySelect.addEventListener('change', savePreferences);
            
        } catch (error) {
            showError('Failed to initialize the application. Please try again later.');
        }
    }
    
    /**
     * Populate currency select dropdowns
     * @param {Array} currencies - Array of currency codes
     */
    function populateCurrencySelects(currencies) {
        // Sort currencies alphabetically
        currencies.sort();
        
        // Clear existing options
        fromCurrencySelect.innerHTML = '';
        toCurrencySelect.innerHTML = '';
        
        // Add options to selects
        currencies.forEach(currency => {
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
    
    /**
     * Handle currency conversion
     */
    async function handleConversion() {
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        const amount = parseFloat(amountInput.value);
        
        // Validate input
        if (isNaN(amount) || amount <= 0) {
            showError('Please enter a valid amount');
            return;
        }
        
        try {
            // Show loading state
            resultDiv.textContent = 'Converting...';
            
            // Perform conversion
            const conversion = await API.convertCurrency(fromCurrency, toCurrency, amount);
            
            // Display result
            resultDiv.innerHTML = `
                <strong>${amount} ${fromCurrency} = ${conversion.result} ${toCurrency}</strong>
                <div>Exchange rate: 1 ${fromCurrency} = ${conversion.rate} ${toCurrency}</div>
            `;
            
            // Save to history
            Storage.saveToHistory(conversion);
            
            // Update history display
            displayHistory();
            
        } catch (error) {
            showError('Conversion failed. Please try again later.');
        }
    }
    
    /**
     * Swap the selected currencies
     */
    function swapCurrencies() {
        const fromValue = fromCurrencySelect.value;
        const toValue = toCurrencySelect.value;
        
        fromCurrencySelect.value = toValue;
        toCurrencySelect.value = fromValue;
        
        savePreferences();
    }
    
    /**
     * Display conversion history
     */
    function displayHistory() {
        const history = Storage.getHistory();
        
        // Clear existing history
        historyList.innerHTML = '';
        
        if (history.length === 0) {
            historyList.innerHTML = '<li>No conversion history yet</li>';
            return;
        }
        
        // Add history items
        history.forEach(item => {
            const li = document.createElement('li');
            const date = new Date(item.timestamp).toLocaleString();
            
            li.innerHTML = `
                <div>${item.amount} ${item.fromCurrency} = ${item.result} ${item.toCurrency}</div>
                <small>${date}</small>
            `;
            
            historyList.appendChild(li);
        });
    }
    
    /**
     * Clear conversion history
     */
    function clearHistory() {
        Storage.clearHistory();
        displayHistory();
    }
    
    /**
     * Load user preferences
     */
    function loadPreferences() {
        const preferences = Storage.getPreferences();
        
        fromCurrencySelect.value = preferences.fromCurrency;
        toCurrencySelect.value = preferences.toCurrency;
    }
    
    /**
     * Save user preferences
     */
    function savePreferences() {
        const preferences = {
            fromCurrency: fromCurrencySelect.value,
            toCurrency: toCurrencySelect.value
        };
        
        Storage.savePreferences(preferences);
    }
    
    /**
     * Show error message
     * @param {string} message - Error message to display
     */
    function showError(message) {
        resultDiv.innerHTML = `<div style="color: red;">${message}</div>`;
    }
});