let balance = 10000;
let stocks = {
    Apple: { price: 150, quantity: 0 },
    Tesla: { price: 700, quantity: 0 },
};

// Aktualisiere die Tabelle
function updateTable() {
    const table = document.getElementById('stocks');
    table.innerHTML = '';
    for (let stock in stocks) {
        const row = `
            <tr>
                <td>${stock}</td>
                <td>${stocks[stock].price}€</td>
                <td>${stocks[stock].quantity}</td>
                <td>
                    <button onclick="buyStock('${stock}', 1)">Kaufen</button>
                    <button onclick="sellStock('${stock}', 1)">Verkaufen</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    }
    document.getElementById('balance').innerHTML = `Kontostand: <strong>€${balance}</strong>`;
}

// Kauf- und Verkaufslogik
function buyStock(stock, amount) {
    if (balance >= stocks[stock].price * amount) {
        balance -= stocks[stock].price * amount;
        stocks[stock].quantity += amount;
    } else {
        alert('Nicht genug Guthaben!');
    }
    updateTable();
}

function sellStock(stock, amount) {
    if (stocks[stock].quantity >= amount) {
        balance += stocks[stock].price * amount;
        stocks[stock].quantity -= amount;
    } else {
        alert('Nicht genug Aktien!');
    }
    updateTable();
}

updateTable();
