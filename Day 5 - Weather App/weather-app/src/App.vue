<script setup>
import { ref } from 'vue'
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

// reactive state variables
const locationInput = ref('')
const weatherData = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

const getWeatherData = async () => {
  // default states
  weatherData.value = null
  errorMessage.value = ''
  isLoading.value = true

  // error handling - user input
  if (!locationInput.value.trim()) {
    errorMessage.value = 'Please enter a city or zip code.'
    isLoading.value = false
    return
  }

  try {
    const response = await fetch(
      `${BASE_URL}?q=${locationInput.value.trim()}&appid=${API_KEY}&units=metric`,
    )

    // error handling - API request
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found. Please check your spelling.')
      } else if (response.status === 401) {
        throw new Error('Unauthorized API key. Please check your API key.')
      } else {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    }

    // update weather data status
    const data = await response.json()
    weatherData.value = data
  } catch (error) {
    console.error('Fetch error:', error)
    errorMessage.value = `Failed to fetch weather data: ${error.message}`
  } finally {
    isLoading.value = false // hide loading message after requests
  }
}
</script>

<template>
  <main class="weather-container">
    <img class="logo" src="./assets/weather-mate.svg" alt="weather - mate logo" />
    <h1>Your Weather Companion</h1>
    <p class="intro">
      Planning your day, or just curious about the sky elsewhere? Weather Mate's got you covered!
      <br />
      Get fast, reliable and up-to-the-minute weather details for any city or zip code on the go or
      from the comfort of your home. Go on, give it a try!
    </p>
    <div class="search-box">
      <input
        type="text"
        v-model="locationInput"
        placeholder="Enter city or zip code"
        @keyup.enter="getWeatherData"
      />
      <button @click="getWeatherData" :disabled="isLoading">Get Weather</button>
    </div>

    <div class="weather-display">
      <p v-if="isLoading">Loading weather data...</p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <div v-if="weatherData && !errorMessage" class="weather-info">
        <h2>{{ weatherData.name }}</h2>
        <p>Temperature: {{ Math.round(weatherData.main.temp) }}°C</p>
        <p>Description: {{ weatherData.weather[0].description }}</p>
        <img
          :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`"
          :alt="weatherData.weather[0].description"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
.weather-container {
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 600px;
  margin-top: 1px;
}

.logo {
  width: 100px;
  height: 100px;
  margin: 0px auto;
}

h1 {
  color: #333;
  margin-top: 0;
  margin-bottom: 10px;
}

.intro {
  font-size: small;
  line-height: 1.5;
  margin-top: 10px;
  font-weight: 550;
}

.search-box {
  display: flex;
  justify-content: center;
  margin: 20px auto;
}

.search-box input {
  padding: 10px;
  border: 1px solid #7ccc;
  background-color: #b8d6f7;
  border-radius: 50px 0px 0px 50px;
  flex-grow: 1;
  font-size: 16px;
}

.search-box button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0px 50px 50px 0px;
  cursor: pointer;
  font-size: 16px;
}

.search-box button:hover {
  background-color: #0056b3;
}

.weather-display {
  margin-top: 20px;
}

.weather-display h2 {
  color: #555;
  margin-bottom: 10px;
}

.weather-display p:not(.error-message) {
  color: #666;
  margin-bottom: 5px;
}

.weather-display img {
  width: 80px;
  height: 80px;
  margin-top: 10px;
}

.error-message {
  color: red;
  font-weight: bold;
}

@media (max-width: 767px) {
  .weather-container {
    width: 70%;
    padding: 20px;
    margin: 20px auto;
  }

  h1 {
    font-size: 20px;
  }

  .intro {
    font-size: 12px;
    line-height: 1.35;
  }

  .search-box input {
    padding: 7px;
    font-size: 11px;
  }

  .search-box button {
    padding: 7px;
    font-size: 11px;
  }
}
</style>
