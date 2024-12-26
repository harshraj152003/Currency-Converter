const fromAmountEle = document.querySelector(".amount");
const convertedAmountEle = document.querySelector(".convertedAmount");
const fromCurrencyEle = document.querySelector(".fromCurrency");
const toCurrencyEle = document.querySelector(".toCurrency");
const result = document.querySelector(".result");

// Function to create options for the currency dropdowns
const countries = [
    { code: "USD", name: "United States Dollar" },
    { code: "INR", name: "Indian Rupee" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound Sterling" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "MXN", name: "Mexican Peso" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "RUB", name: "Russian Ruble" },
    { code: "ZAR", name: "South African Rand" },
    { code: "SAR", name: "Saudi Riyal" },
    { code: "KRW", name: "South Korean Won" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "SEK", name: "Swedish Krona" },
    { code: "NOK", name: "Norwegian Krone" },
    { code: "DKK", name: "Danish Krone" },
    { code: "HKD", name: "Hong Kong Dollar" },
    { code: "SGD", name: "Singapore Dollar" },
    { code: "MYR", name: "Malaysian Ringgit" },
    { code: "TRY", name: "Turkish Lira" },
    { code: "IDR", name: "Indonesian Rupiah" },
    { code: "THB", name: "Thai Baht" },
    { code: "PHP", name: "Philippine Peso" },
    { code: "VND", name: "Vietnamese Dong" },
    { code: "PKR", name: "Pakistani Rupee" },
    { code: "AED", name: "United Arab Emirates Dirham" },
    { code: "KES", name: "Kenyan Shilling" },
    { code: "TWD", name: "New Taiwan Dollar" },
    { code: "CUP", name: "Cuban Peso" },
    { code: "PLN", name: "Polish Zloty" },
    { code: "HUF", name: "Hungarian Forint" },
    { code: "CZK", name: "Czech Koruna" },
    { code: "ISK", name: "Icelandic Króna" },
    { code: "BHD", name: "Bahraini Dinar" },
    { code: "OMR", name: "Omani Rial" },
    { code: "KWD", name: "Kuwaiti Dinar" },
    { code: "QAR", name: "Qatari Rial" },
    { code: "JOD", name: "Jordanian Dinar" },
    { code: "LKR", name: "Sri Lankan Rupee" },
    { code: "COP", name: "Colombian Peso" },
    { code: "PEN", name: "Peruvian Nuevo Sol" },
    { code: "ARS", name: "Argentine Peso" },
    { code: "CLP", name: "Chilean Peso" },
    { code: "NPR", name: "Nepalese Rupee" },
    { code: "MAD", name: "Moroccan Dirham" },
    { code: "EGP", name: "Egyptian Pound" },
    { code: "BDT", name: "Bangladeshi Taka" },
    { code: "BND", name: "Brunei Dollar" },
    { code: "NGN", name: "Nigerian Naira" },
    { code: "YEN", name: "Japanese Yen" },
    { code: "COP", name: "Colombian Peso" },
    { code: "DZD", name: "Algerian Dinar" },
    { code: "LTL", name: "Lithuanian Litas" },
    { code: "HRK", name: "Croatian Kuna" },
    { code: "MDL", name: "Moldovan Leu" },
    { code: "RON", name: "Romanian Leu" },
    { code: "BGN", name: "Bulgarian Lev" },
    { code: "GEL", name: "Georgian Lari" },
    { code: "MKD", name: "Macedonian Denar" },
    { code: "HRK", name: "Croatian Kuna" },
    { code: "LKR", name: "Sri Lankan Rupee" }
];

// Populate dropdowns with countries
countries.forEach(country => {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');

    option1.value = option2.value = country.code;
    option1.textContent = option2.textContent = `${country.code} (${country.name})`;
    
    fromCurrencyEle.appendChild(option1);
    toCurrencyEle.appendChild(option2);
});

// Setting default values
fromCurrencyEle.value = "USD";
toCurrencyEle.value = "INR";

// Function to get exchange rate using API
const getExchangeRate = () => {
    const amount = parseFloat(fromAmountEle.value);
    const fromCurrency = fromCurrencyEle.value;
    const toCurrency = toCurrencyEle.value;

    if (isNaN(amount) || amount <= 0) {
        result.textContent = "Please enter a valid amount.";
        return;
    }

    // Dynamically set the URL with the selected fromCurrency
    const requestUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", requestUrl);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);

            if (data && data.rates && data.rates[toCurrency]) {
                const rate = data.rates[toCurrency];
                const convertedAmount = amount * rate;
                convertedAmountEle.value = `${convertedAmount.toFixed(2)}`;  // Update value of convertedAmount input
                result.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
            } else {
                result.textContent = "Currency conversion rate not found.";
            }
        }
    };
    xhr.send();
};

fromAmountEle.addEventListener("input", getExchangeRate);
fromCurrencyEle.addEventListener("change", getExchangeRate);
toCurrencyEle.addEventListener("change", getExchangeRate);