const API_KEY = "your-api-key"; // Add your OpenWeatherMap API key here
const weatherDataDiv = document.getElementById("weather-data");
const cityInput = document.getElementById("city-input");
const fetchWeatherBtn = document.getElementById("fetch-weather-btn");

// Function to fetch weather data
async function fetchWeatherData() {
  const cityName = cityInput.value;
  if (!cityName) {
    alert("Please enter a city name.");
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Check if the response is successful
    if (response.ok) {
      // Extract relevant data
      const {
        main: { temp },
        weather: [{ description }],
        name: city,
      } = data;
      // Display the weather data
      weatherDataDiv.innerHTML = `City: ${city}<br>Temperature: ${temp}°C<br>Condition: ${description}`;
    } else {
      // Handle the error
      weatherDataDiv.innerHTML = `Error fetching weather data for ${cityName}. Please try again.`;
    }
  } catch (error) {
    console.error(error);
    weatherDataDiv.innerHTML =
      "An error occurred while fetching weather data. Please try again later.";
  }
}

// Event listener for the button
fetchWeatherBtn.addEventListener("click", fetchWeatherData);
