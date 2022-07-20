import axios from 'axios';

const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
	return axios(`${BASE_URL}/coins`).then(res => res.data)
}


export function fetchCoinInfo(coinId: string) {
	return axios(`${BASE_URL}/coins/${coinId}`).then(res => res.data);
}

export function fetchCoinTickers(coinId: string) {
	return axios(`${BASE_URL}/tickers/${coinId}`).then(res => res.data);
}

export function fetchCoinHistory(coinId: string) {
	const endDate = Math.floor(Date.now() / 1000);
	const startDate = endDate - 60 * 60 * 24 * 7 * 2;

	return axios(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).then(res => res.data)
}

// export function fetchCoinInfo(coinId: string) {
// 	return fetch(`${BASE_URL}/coins/${coinId}`).then(response => response.json());
// }

// export function fetchCoinTickers(coinId: string) {
// 	return fetch(`${BASE_URL}/tickers/${coinId}`).then(response => response.json());
// }



export function fetchCoinPrice(coinId: string) {
	return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/today`).then((response) =>
		response.json()
	);
}

