import ApexCharts from 'react-apexcharts';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import dayjs from 'dayjs';

interface ChartProps {
	coinId: string;
}

interface IChartType {
	close: string;
	high: string;
	low: string;
	market_cap: number;
	open: string;
	time_close: number;
	time_open: string;
	volume: string;
}

function Chart({ coinId }: ChartProps) {
	const { isLoading, data } = useQuery<IChartType[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId))
	console.log(data);

	return (
		<>
			{isLoading ? "Loading chart..." : (
				<ApexCharts
					type="candlestick"
					series={[
						{
							name: "Today Close Price",
							data: data?.slice(0, 7).map((price) => {
								return {
									x: price.time_open,
									y:
										[price.open,
										price.high,
										price.low,
										price.close]
								};
								// price.close) as number[],
							})
						},
					] as any}
					options={{
						theme: {
							mode: "dark",
						},
						chart: {
							type: 'candlestick',
							height: 500,
							width: 1000,
							toolbar: {
								show: false,
							},
							zoom: {
								enabled: false,
							},
							background: "transparent",
						},
						stroke: {
							curve: "straight",
							width: 2,
							lineCap: 'butt',
						},
						// xaxis: {
						// 	type: 'category',
						// 	categories: ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1']
						// 	//  () => { return data?.map((price) => price.time_open)) as any }

						// },
						xaxis: {
							type: "category",
							labels: {
								// datetimeFormatter: { month: "mm yy" },
								formatter: (val) => {
									return dayjs(val).format('MMM DD')
								}
							},
						},
						yaxis: {
							show: true,
							labels: {
								formatter: (value) => `${value.toFixed(2)} $`,
							},
						},
						title: {
							text: "Today Close Price",
							align: 'center',
							margin: 20,
						},
						grid: {
							row: {
								colors: ['black', 'transparent'],
								opacity: 0.3
							}
						}

					}}
				/>
			)


			}


		</>
	)
}

export default Chart;