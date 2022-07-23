import ApexCharts from 'apexcharts';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';

interface ChartProps {
	coinId: string;
}

interface IChart {
	time_open: string;
	time_close: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}

function Chart({ coinId }: ChartProps) {
	console.log(coinId);
	const { isLoading, data } = useQuery(["ohlcv", coinId], () => fetchCoinHistory(coinId))
	console.log(data);

	return (
		<>
			<h1>Chart</h1>
		</>
	)
}

export default Chart;