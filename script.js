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
            convertCurrencies();
        }
    });

    function renderSelect(currencies) {
        for (let currency in currencies.symbols) {
            const newOption = document.createElement('option');
            newOption.value = currency;
            newOption.text = `${currencies.symbols[currency]['description']} - ${currency}`;
            const clone = newOption.cloneNode(true);
            fromCurrency.append(newOption);
            toCurrency.append(clone);
        }
    }
    function renderResult(resCalc) {
        result.value = resCalc;
    }

    // API
    const baseUrl = 'https://api.exchangerate.host';
    const urlForSelectList = `${baseUrl}/symbols`;

    fetch(urlForSelectList)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            renderSelect(data);
        })
        .catch((error) => console.log(error));

    function convertCurrencies() {
        const url = `${baseUrl}/convert?from=${fromCurrency.value}&to=${toCurrency.value}&amount=${amount.value}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                renderResult(data.result);
            })
            .catch((error) => console.log(error));
    }

})();
