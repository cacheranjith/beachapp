const map = L.map('map').setView([20.5937, 78.9629], 5); // Center on India

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Example beach locations
const beaches = [
    { lat: 15.4958, lon: 73.7439, name: "Anjuna Beach" },
    { lat: 15.5081, lon: 73.7485, name: "Baga Beach" },
    { lat: 15.3069, lon: 73.8589, name: "Palolem Beach" },
    { lat: 11.9353, lon: 79.8365, name: "Pondicherry Beach" },
    { lat: 8.7356, lon: 76.7032, name: "Varkala Beach" },
    { lat: 8.3889, lon: 76.9760, name: "Kovalam Beach" },
    { lat: 9.1242, lon: 76.3828, name: "Marari Beach" },
    { lat: 17.7143, lon: 83.3237, name: "Rushikonda Beach" },
    { lat: 13.0500, lon: 80.2824, name: "Marina Beach" },
    { lat: 12.6121, lon: 80.1969, name: "Mahabalipuram Beach" },
    { lat: 18.9543, lon: 72.8115, name: "Girgaum Chowpatty" },
    { lat: 19.0759, lon: 72.8448, name: "Juhu Beach" },
    { lat: 18.6845, lon: 72.8141, name: "Alibaug Beach" },
    { lat: 20.4167, lon: 70.8167, name: "Diu Beach" },
    { lat: 23.0206, lon: 70.4725, name: "Mandvi Beach" },
    { lat: 8.8947, lon: 76.5535, name: "Thirumullavaram Beach" }
];

const apiKey = 'c89e2a8377860a3f65007485d65e7c86'; // Replace with your OpenWeatherMap API key

function getWeather(lat, lon, name) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = `
                <h3>Weather Information</h3>
                <p><strong>${data.name}</strong></p>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
                <p>Humidity: ${data.main.humidity} %</p>
                <p>Visibility: ${data.visibility / 1000} km</p>
                <p>Alerts: ${data.alerts ? data.alerts.map(alert => `<br>${alert.description}`).join('') : 'No alerts'}</p>
            `;
            document.getElementById('weather-info').innerHTML = weatherInfo;
            updateReviews(name);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-info').innerHTML = '<p>Error fetching weather data.</p>';
        });
}

function updateReviews(name) {
    const reviews = JSON.parse(localStorage.getItem(name)) || [];
    let reviewHtml = `<h3>Reviews and Ratings</h3>`;
    reviews.forEach(review => {
        reviewHtml += `<div class="review"><strong>${review.username}</strong>: ${review.rating}/5<br>${review.text}</div>`;
    });
    document.getElementById('weather-info').innerHTML += reviewHtml;
}

function submitReview(name) {
    const username = prompt('Enter your name:');
    const rating = parseInt(prompt('Rate this beach (1-5):'), 10);
    const text = prompt('Enter your review:');

    if (username && !isNaN(rating) && text) {
        const reviews = JSON.parse(localStorage.getItem(name)) || [];
        reviews.push({ username, rating, text });
        localStorage.setItem(name, JSON.stringify(reviews));
        updateReviews(name);
    }
}

// Add beach markers to the map
beaches.forEach(beach => {
    const marker = L.marker([beach.lat, beach.lon]).addTo(map);
    marker.bindPopup(`
        <b>${beach.name}</b><br>
        <button onclick="getWeather(${beach.lat}, ${beach.lon}, '${beach.name}')">Get Weather</button><br>
        <button onclick="submitReview('${beach.name}')">Submit Review</button>
    `);
});

// Optionally, initialize the weather info with the first beach location
getWeather(beaches[0].lat, beaches[0].lon, beaches[0].name);
