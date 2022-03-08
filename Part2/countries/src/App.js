import react, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ weather, country }) => {
  if (weather && Object.keys(weather).length === 0){
    return(
      <div></div>
    )
  }
  else{
  return(
    <div>
      <h2>Weather in {country.capital}</h2>
      <div>Temperature: {Math.round(((weather.main.temp - 273.15) + Number.EPSILON) * 100) / 100} Celsius</div>
      <img width='100' height='100' src={'http://openweathermap.org/img/wn/' + weather.weather[0].icon +'.png'} alt='Weather icon'/>
      <div>Wind: {weather.wind.speed} m/s</div>
    </div>
  )
  }
}

const Country = ({ country }) => {

  const [weather, setWeather] = useState({})
  const apiKey = process.env.REACT_APP_API_KEY
  const latitude = country.capitalInfo.latlng[0]
  const longitude = country.capitalInfo.latlng[1]

  useEffect(() => {
    axios
    .get('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey)
    .then(response => {
      setWeather(response.data);
    })
  }, [])

  return(
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map(language =>
          <li key={language}>{language}</li>
          )}
      </ul>
      <img src={country.flags.png} alt={{country} + 'flag'}/>
      <Weather weather ={weather} country={country}/>
    </div>
  )
}

const Countries = ({ countries }) => {
  const [showList, setShowList] = useState(true)
  const [showCountry, setShowCountry] = useState({})

  const handleClick = (props) => {
    setShowCountry(props)
    if (showList){
      setShowList(false)
    }
    else{
      setShowList(true)
    }
  }

  if (showList) {
    if (countries.length === 1){
      return(
        <div>
          <Country country={countries[0]}/>
        </div>
      )
    }
    else if (countries.length > 10){
      return(
        <div>
          <p>Too many matches, specify another filter</p>
        </div>
      )
    }
    return(
      <div>
        {countries.map(country =>
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => handleClick(country)}>show</button>
          </div>
          )}
      </div>
    )
  }
  else{
    return(
      <div>
        <Country country={showCountry}/>
        <button onClick={() => handleClick(showCountry)}>Go back</button>
      </div>
    )
  }
}


const App = () => {
  const [countries, setCountries] = useState([
  ])
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  return(
    <div>
      Find countries <input value={newSearch} onChange={handleSearchChange}/>
      <Countries countries={countries.filter(country =>country.name.common.toLowerCase().includes(newSearch.toLowerCase()))}/>
    </div>
  );
}

export default App;
