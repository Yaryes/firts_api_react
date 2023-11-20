import { useState } from "react"

export const App = () => {
  const [ciudad, setCiudad] = useState('')
  const [dataClima, setDataClima] = useState(null)

  const difKelvin = 273.15 
  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  const API_KEY = 'ee190e76cd79a982a666e28d87e7c915'

  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value)
  }

  const fetchClima = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
      const data = await response.json()
      setDataClima(data)
    } catch(error) {
      console.error('Ocurrio un error con la conexion a la API', error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (ciudad.length > 0) fetchClima()
  }

  return (
    <div className="container">
      <h1>Aplicacion Clima</h1>
      <form onSubmit={handleSubmit}>
        <input type="text"
          value={ciudad}
          onChange={handleCambioCiudad}
        />
        <button type="submit">Buscar</button>
      </form>
      {
        dataClima && (
          <div>
              <h2>{dataClima.name}</h2>
              <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
              <p>Condicion meteorologica: {dataClima.weather[0].description}</p>
              <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} />
          </div>
        )
      }
    </div>
  )
}
