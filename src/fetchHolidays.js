async function fetchHolidays(year, countryCode) {
  const url = `https://openholidaysapi.org/PublicHolidays?countryIsoCode=${countryCode}&validFrom=${year}-01-01&validTo=${year}-12-31&languageIsoCode=EN`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export { fetchHolidays };
