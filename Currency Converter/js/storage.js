/**
 * Storage handling functions for currency converter
 */

const Storage = {
    /**
     * Save conversion history to localStorage
     * @param {Object} conversion - Conversion data to save
     */
    saveToHistory: function(conversion) {
        let history = this.getHistory();
        
        // Add timestamp to conversion
        conversion.timestamp = new Date().toISOString();
        
        // Add to beginning of array (most recent first)
        history.unshift(conversion);
        
        // Limit history to 10 items
        if (history.length > 10) {
            history = history.slice(0, 10);
        }
        
        localStorage.setItem('conversionHistory', JSON.stringify(history));
    },
    
    /**
     * Get conversion history from localStorage
     * @returns {Array} Array of conversion history items
     */
    getHistory: function() {
        const history = localStorage.getItem('conversionHistory');
        return history ? JSON.parse(history) : [];
    },
    
    /**
     * Clear conversion history from localStorage
     */
    clearHistory: function() {
        localStorage.removeItem('conversionHistory');
    },
    
    /**
     * Save user preferences to localStorage
     * @param {Object} preferences - User preferences to save
     */
    savePreferences: function(preferences) {
        localStorage.setItem('converterPreferences', JSON.stringify(preferences));
    },
    
    /**
     * Get user preferences from localStorage
     * @returns {Object} User preferences
     */
    getPreferences: function() {
        const preferences = localStorage.getItem('converterPreferences');
        return preferences ? JSON.parse(preferences) : {
            fromCurrency: 'USD',
            toCurrency: 'EUR'
        };
    }
};