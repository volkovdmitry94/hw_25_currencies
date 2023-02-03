(() => {
    // View
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const amount = document.getElementById('numberToConvert');
    const result = document.getElementById('resultNumber');

    document.getElementById('sendBtn').addEventListener('click', () => {
        if (amount.value <= 0 || amount.value > 1_000_000_000 || !amount.value) {
            alert('Please enter correct amount');
        } else if (fromCurrency.value === 'Default' || toCurrency.value === 'Default') {
            alert('Please choose From and To currencies');
        } else {
            getCurrencies();
        }
    });

    function renderSelect(currencies) {
        for (let currency in currencies.symbols) {
            const newOption = document.createElement('option');
            newOption.value = currency;
            newOption.text = `${currencies.symbols[currency]} - ${currency}`;
            const clone = newOption.cloneNode(true);
            fromCurrency.append(newOption);
            toCurrency.append(clone);
        }
    }
    function renderResult(resCalc) {
        result.value = resCalc;
    }

    // Core
    function calcCurrency(data) {
        const array = Object.values(data.rates);
        // in the case of converting USD to USD
        if (array.length === 1) {
            return 1;
        }
        const crossRate = array[1] / array[0];
        const finalCalc = (Math.floor(crossRate * amount.value * 1_000_000) / 1_000_000 );
        return finalCalc;
    }

    // API
    const baseUrl = 'http://data.fixer.io/api';
    const apiKey = '';
    const urlForSelectList = `${baseUrl}/symbols?access_key=${apiKey}`;

    fetch(urlForSelectList)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.success) {
                console.log(data);
                renderSelect(data);
            }
            else alert(`HTTP Code: ${data.error.code}, details: ${data.error.info}`);
        })
        .catch(error => console.log(error));

    function getCurrencies() {
        const url = `${baseUrl}/latest?access_key=${apiKey}&symbols=${fromCurrency.value},${toCurrency.value}`;

        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    console.log(data);
                    renderResult(calcCurrency(data));
                }
                else alert(`HTTP Code: ${data.error.code}, details: ${data.error.info}`);
            })
            .catch(error => console.log(error));
    }

})();
