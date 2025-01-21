let balance = 10000;
let stocks = {
    Apple: { price: 150, quantity: 0, history: [150] },
    Tesla: { price: 700, quantity: 0, history: [700] },
};

const updateInterval = 2000; // Zeitintervall in Millisekunden

// Aktualisiere die Tabelle
function updateTable() {
    const table = document.getElementById("stocks");
    table.innerHTML = "";
    for (let stock in stocks) {
        const row = `
            <tr>
                <td>${stock}</td>
                <td>${stocks[stock].price.toFixed(2)}€</td>
                <td>${stocks[stock].quantity}</td>
                <td>
                    <button onclick="buyStock('${stock}', 1)">Kaufen</button>
                    <button onclick="sellStock('${stock}', 1)">Verkaufen</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    }
    document.getElementById("balance").innerHTML = `Kontostand: <strong>€${balance.toFixed(2)}</strong>`;
}

// Kauf- und Verkaufslogik
function buyStock(stock, amount) {
    if (balance >= stocks[stock].price * amount) {
        balance -= stocks[stock].price * amount;
        stocks[stock].quantity += amount;
    } else {
        alert("Nicht genug Guthaben!");
    }
    updateTable();
}

function sellStock(stock, amount) {
    if (stocks[stock].quantity >= amount) {
        balance += stocks[stock].price * amount;
        stocks[stock].quantity -= amount;
    } else {
        alert("Nicht genug Aktien!");
    }
    updateTable();
}

// Aktienpreise simulieren
function simulateStockPrices() {
    for (let stock in stocks) {
        const change = (Math.random() - 0.5) * 10; // Zufällige Änderung
        stocks[stock].price = Math.max(1, stocks[stock].price + change); // Verhindert negative Preise
        stocks[stock].history.push(stocks[stock].price);
        if (stocks[stock].history.length > 20) stocks[stock].history.shift(); // Begrenze die Historie
    }
    updateChart();
    updateTable();
}

// Chart.js für das Diagramm
const ctx = document.getElementById("stockChart").getContext("2d");
const stockChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: Array.from({ length: 20 }, (_, i) => `t-${20 - i}`), // Zeitachsen-Labels
        datasets: Object.keys(stocks).map(stock => ({
            label: stock,
            data: stocks[stock].history,
            borderColor: getRandomColor(),
            fill: false,
        })),
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: "Zeit" } },
            y: { title: { display: true, text: "Preis (€)" } },
        },
    },
});

// Aktualisiere das Diagramm
function updateChart() {
    stockChart.data.datasets.forEach((dataset, index) => {
        const stock = Object.keys(stocks)[index];
        dataset.data = stocks[stock].history;
    });
    stockChart.update();
}

// Hilfsfunktion für zufällige Farben
function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Starte die Simulation
updateTable();
setInterval(simulateStockPrices, updateInterval);
