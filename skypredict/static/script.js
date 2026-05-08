// ⏰ CLOCK FUNCTION
function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toDateString();

    document.getElementById('clock').innerHTML = date + ' | ' + time;
}

window.onload = function () {

    // START CLOCK
    updateClock();
    setInterval(updateClock, 1000);

    // 🌤 WEATHER BACKGROUND
    const weather = document.body.getAttribute("data-weather");

    if (weather) {
        const w = weather.toLowerCase();

        if (w.includes("clear")) {
            document.body.className = "sunny";
        }
        else if (w.includes("rain") || w.includes("drizzle") || w.includes("thunderstorm")) {
            document.body.className = "rainy";
        }
        else if (w.includes("cloud")) {
            document.body.className = "cloudy";
        }
        else if (w.includes("snow")) {
            document.body.className = "snow";
        }
        else {
            document.body.className = "cloudy";
        }
    }

    // 📊 GET FORECAST DATA FROM DJANGO
    let temps = [];

    try {
        const rawData = document.getElementById("forecast-data").textContent;
        temps = JSON.parse(rawData);
        console.log("Temps:", temps); // Debug
    } catch (error) {
        console.log("JSON Parse Error:", error);
    }

    // 📊 CREATE TEMPERATURE CHART
    if (temps && temps.length > 0) {

        const labels = temps.map(item => item.date);
        const data = temps.map(item => item.temp);

        const canvas = document.getElementById('weatherChart');

        if (canvas) {
            const ctx = canvas.getContext('2d');

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Temperature (°C)',
                        data: data,
                        borderColor: "#ff0000",   // bright red
                        backgroundColor: "rgba(255, 0, 0, 0.2)",
                        borderWidth: 3,
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            labels: {
                                color: "white"
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: "white"
                            }
                        },
                        y: {
                            ticks: {
                                color: "white"
                            }
                        }
                    }
                }
            });

        } else {
            console.log("Canvas not found");
        }

    } else {
        console.log("No data for chart");
    }

};