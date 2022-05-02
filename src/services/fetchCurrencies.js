const fetchCurrencies = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await response.json();
  return currencies;
};

export default fetchCurrencies;
