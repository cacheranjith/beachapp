const map = L.map('map').setView([20.5937, 78.9629], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const apiKey = 'c89e2a8377860a3f65007485d65e7c86';

const beaches = [
  { lat: 15.4958, lon: 73.7439, name: "Anjuna Beach", suitability: 4 },
            { lat: 15.5081, lon: 73.7485, name: "Baga Beach", suitability: 5 },
            { lat: 15.3069, lon: 73.8589, name: "Palolem Beach", suitability: 3 },
            { lat: 11.9353, lon: 79.8365, name: "Pondicherry Beach", suitability: 4 },
            { lat: 8.7356, lon: 76.7032, name: "Varkala Beach", suitability: 5 },
            { lat: 8.3889, lon: 76.9760, name: "Kovalam Beach", suitability: 4 },
            { lat: 9.1242, lon: 76.3828, name: "Marari Beach", suitability: 3 },
            { lat: 17.7143, lon: 83.3237, name: "Rushikonda Beach", suitability: 2 },
            { lat: 13.0500, lon: 80.2824, name: "Marina Beach", suitability: 5 },
            { lat: 12.6121, lon: 80.1969, name: "Mahabalipuram Beach", suitability: 4 },
            { lat: 18.9543, lon: 72.8115, name: "Girgaum Chowpatty", suitability: 3 },
            { lat: 19.0759, lon: 72.8448, name: "Juhu Beach", suitability: 4 },
            { lat: 18.6845, lon: 72.8141, name: "Alibaug Beach", suitability: 3 },
            { lat: 20.71, lon: 70.98, name: "Diu Beach", suitability: 5 },
            { lat: 23.0206, lon: 70.4725, name: "Mandvi Beach", suitability: 3 },
            { lat: 8.8947, lon: 76.5535, name: "Thirumullavaram Beach", suitability: 4 },
            { lat: 20.4254, lon: 72.8358, name: "Daman Beach", suitability: 3 },
            { lat: 15.0062, lon: 74.0369, name: "Palolem Beach (Goa)", suitability: 4 },
            { lat: 15.5526, lon: 73.7498, name: "Calangute Beach (Goa)", suitability: 4 },
            { lat: 15.5521, lon: 73.7471, name: "Anjuna Beach (Goa)", suitability: 4 },
            { lat: 15.5525, lon: 73.7672, name: "Vagator Beach (Goa)", suitability: 3 },
            { lat: 15.5522, lon: 73.7616, name: "Candolim Beach (Goa)", suitability: 4 },
            { lat: 15.2919, lon: 73.9946, name: "Colva Beach (Goa)", suitability: 4 },
            { lat: 9.5002, lon: 76.3384, name: "Alappuzha Beach (Kerala)", suitability: 4 },
            { lat: 11.2588, lon: 75.7804, name: "Kozhikode Beach (Kerala)", suitability: 3 },
            { lat: 10.2130, lon: 76.2004, name: "Cherai Beach (Kerala)", suitability: 4 },
            { lat: 8.0994, lon: 77.5385, name: "Kanyakumari Beach (Tamil Nadu)", suitability: 4 },
            { lat: 9.2843, lon: 79.1581, name: "Rameswaram Beach (Tamil Nadu)", suitability: 3 },
            { lat: 9.0287, lon: 79.2720, name: "Vadaserikkal Beach (Tamil Nadu)", suitability: 3 },
            { lat: 12.0227, lon: 92.9640, name: "Radhanagar Beach (Havelock Island)", suitability: 5 },
            { lat: 12.0055, lon: 92.9452, name: "Elephant Beach (Havelock Island)", suitability: 4 },
            { lat: 21.6330, lon: 87.5285, name: "Digha Beach (West Bengal)", suitability: 3 },
            { lat: 21.6737, lon: 87.6187, name: "Mandarmani Beach (West Bengal)", suitability: 3 },
            { lat: 20.8933, lon: 70.4011, name: "Somnath Beach (Gujarat)", suitability: 4 },
            { lat: 21.5222, lon: 70.4578, name: "Junagadh Beach (Gujarat)", suitability: 3 },
            { lat: 21.6692, lon: 88.0740, name: "Sagar Island Beach (West Bengal)", suitability: 1 },
            { lat: 21.2097, lon: 72.1078, name: "Gopnath Beach (Gujarat)", suitability: 1 },
            { lat: 21.5111, lon: 87.0904, name: "Chandipur Beach (Odisha)", suitability: 1 },
            { lat: 11.5561, lon: 92.5844, name: "North Sentinel Island Beach (Andaman and Nicobar Islands)", suitability: 1 },
            { lat: 18.3562, lon: 72.8211, name: "Murud Beach (Maharashtra)", suitability: 1 },
            { lat: 13.3415, lon: 74.7125, name: "Kundapura Beach (Karnataka)", suitability: 1 }
];

function getColor(suitability) {
  return ['red', 'orange', 'yellow', 'blue', 'green'][suitability - 1] || 'gray';
}

function getDescription(s) {
  return ['Very Poor', 'Poor', 'Moderate', 'Good', 'Excellent'][s - 1];
}

function createMarker(beach) {
  const marker = L.circleMarker([beach.lat, beach.lon], {
    radius: 8,
    fillColor: getColor(beach.suitability),
    color: getColor(beach.suitability),
    weight: 1,
    fillOpacity: 0.8
  }).addTo(map);

  marker.bindPopup(`
    <b>${beach.name}</b><br>
    Suitability: ${getDescription(beach.suitability)}<br>
    <button onclick="getWeather(${beach.lat}, ${beach.lon}, '${beach.name}')">Get Weather</button><br>
    <button onclick="showReviews('${beach.name}')">Show Reviews</button>
  `);
}

function getWeather(lat, lon, beachName) {
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  Promise.all([
    fetch(currentUrl).then(res => res.json()),
    fetch(forecastUrl).then(res => res.json())
  ])
  .then(([current, forecast]) => {
    const sunrise = new Date(current.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(current.sys.sunset * 1000).toLocaleTimeString();

    let html = `
      <h3>Weather at ${current.name}</h3>
      <p><strong>Temperature:</strong> ${current.main.temp} °C</p>
      <p><strong>Weather:</strong> ${current.weather[0].description}</p>
      <p><strong>Humidity:</strong> ${current.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${current.wind.speed} m/s</p>
      <p><strong>Sunrise:</strong> ${sunrise}</p>
      <p><strong>Sunset:</strong> ${sunset}</p>
      <h4>3-Day Forecast</h4>
    `;

    const forecastDays = forecast.list.filter((_, index) => index % 8 === 0).slice(0, 3);
    forecastDays.forEach(day => {
      const date = new Date(day.dt * 1000).toLocaleDateString();
      html += `
        <div>
          <strong>${date}</strong><br>
          Temp: ${day.main.temp} °C, ${day.weather[0].description}<br>
        </div>
      `;
    });

    document.getElementById("weather-info").innerHTML = html;
  })
  .catch(() => {
    document.getElementById("weather-info").innerHTML = `<p>Error fetching weather data</p>`;
  });
}

function showReviews(beachName) {
  const reviews = JSON.parse(localStorage.getItem(beachName)) || [];
  let html = `<h3>Reviews for ${beachName}</h3>`;
  reviews.forEach(r => {
    html += `<div class='review'><strong>${r.username}</strong> (${r.rating}/5): ${r.text}</div>`;
  });

  html += `
    <form onsubmit="submitReview(event, '${beachName}')">
      <input type="text" name="username" placeholder="Your name" required><br>
      <input type="number" name="rating" min="1" max="5" placeholder="Your rating" required><br>
      <textarea name="text" placeholder="Your review" required></textarea><br>
      <button type="submit">Submit</button>
    </form>
  `;
  document.getElementById("weather-info").innerHTML = html;
}

function submitReview(e, beachName) {
  e.preventDefault();
  const f = e.target;
  const review = {
    username: f.username.value,
    rating: f.rating.value,
    text: f.text.value
  };
  const reviews = JSON.parse(localStorage.getItem(beachName)) || [];
  reviews.push(review);
  localStorage.setItem(beachName, JSON.stringify(reviews));
  showReviews(beachName);
}

document.getElementById('suitabilityFilter').addEventListener('change', function(e) {
  const value = e.target.value;
  map.eachLayer(layer => {
    if (layer instanceof L.CircleMarker) map.removeLayer(layer);
  });
  beaches.forEach(beach => {
    if (value === "all" || beach.suitability.toString() === value) {
      createMarker(beach);
    }
  });
});

beaches.forEach(createMarker);