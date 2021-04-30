import { Weather } from './../model/Weather';
import { WeatherLocation } from '../model/Weather';

const key = "17ec61558cff4f634fcc87cd279f1df9"
const keyQuery = `appid=${key}`
const server = 'https://api.openweathermap.org/data/2.5';

export async function searchLocation(term: string): Promise<WeatherLocation | undefined> {
  const url = `${server}/weather?q=${term}&${keyQuery}`
  try {
    const result = await fetch(url, {
      cache: undefined
    })

    console.log(result.status)
    if (result.status === 404) throw new Error('Not Found');
    if (result.status !== 200) throw new Error('Failed to read location data');

    return await result.json()
  } catch (error) {
    return error?.message
  }
}

export async function readWeather(locationId: number): Promise<Weather> {
  const url = `${server}/weather?id=${locationId}&${keyQuery}&units=metric`
  const current = await fetch(url)

  if (current.status !== 200) throw new Error('Failed to read location data')

  return await current.json()
}

export async function readForecast(locationId: number): Promise<Weather[]> {
  const url = `${server}/forecast?id=${locationId}&${keyQuery}&units=metric&cnt=8`
  const forecast = await fetch(url)

  if (forecast.status !== 200) throw new Error('Failed to read location Data')

  return (await forecast.json()).list
}

export function getIconUrl(code: string): string {
  return `http://openweathermap.org/img/wn/${code}.png`;
}
