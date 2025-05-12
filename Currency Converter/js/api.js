/**
 * API handling functions for currency conversion
 */

const API = {
    // We'll use the Exchange Rate API (free tier)
    BASE_URL: 'https://api.exchangerate-api.com/v4/latest/',
    
    /**
     * Fetch available currencies
     * @returns {Promise} Promise object with currency data
     */
    fetchCurrencies: async function() {
        try {
            const response = await fetch(`${this.BASE_URL}USD`);
            const data = await response.json();
            
            if (data.rates) {
                // Create an array of currency codes
                const currencies = Object.keys(data.rates);
                return currencies;
            } else {
                throw new Error('Unable to fetch currencies');
            }
        } catch (error) {
            console.error('Error fetching currencies:', error);
            throw error;
        }
    },
    
    /**
     * Convert amount from one currency to another
     * @param {string} fromCurrency - Source currency code
     * @param {string} toCurrency - Target currency code
     * @param {number} amount - Amount to convert
     * @returns {Promise} Promise object with conversion result
     */
    convertCurrency: async function(fromCurrency, toCurrency, amount) {
        try {
            const response = await fetch(`${this.BASE_URL}${fromCurrency}`);
            const data = await response.json();
            
            if (data.rates && data.rates[toCurrency]) {
                const rate = data.rates[toCurrency];
                const result = amount * rate;
                
                return {
                    fromCurrency,
                    toCurrency,
                    amount,
                    result: result.toFixed(2),
                    rate: rate.toFixed(4)
                };
            } else {
                throw new Error('Unable to fetch conversion rate');
            }
        } catch (error) {
            console.error('Error converting currency:', error);
            throw error;
        }
    }
};