// API endpoint for getting eth price
const url = 'https://api.coinmarketcap.com/v2/ticker/1027/?convert=USD'

export const getEtherPrice = async () => {
  const response = await fetch(url, { type: 'GET' }).then(x => x.json())
  return response.data.quotes.USD.price
}