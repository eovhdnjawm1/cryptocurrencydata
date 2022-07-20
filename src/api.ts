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

// export function fetchCoinInfo(coinId: string) {
// 	return fetch(`${BASE_URL}/coins/${coinId}`).then(response => response.json());
// }

// export function fetchCoinTickers(coinId: string) {
// 	return fetch(`${BASE_URL}/tickers/${coinId}`).then(response => response.json());
// }

export function fetchCoinHistory(coinId: string) {

	const endDate = Math.floor(Date.now() / 1000)
	//  일주일 전
	const startDate = endDate - 60 * 60 * 23;

	return fetch(
		`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
	).then((response) => response.json());
}


export function fetchCoinPrice(coinId: string) {
	return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/today`).then((response) =>
		response.json()
	);
}

