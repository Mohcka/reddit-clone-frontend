interface WeatherForcast {
  date: string
  temperatureC: string
  temperatureF: string
  summary: string
}

export type WeatherForcasts = Array<WeatherForcast>;