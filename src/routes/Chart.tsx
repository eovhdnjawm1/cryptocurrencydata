import ApexCharts from 'react-apexcharts';
import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './../atoms';

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

	const isDark = useRecoilValue(isDarkAtom);

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
							})
						},
					] as any}
					options={{
						theme: {
							mode: isDark ? "dark" : "light",
						},
						chart: {
							type: 'candlestick',
							height: 500,
							width: 1500,
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
						xaxis: {
							type: "category",
							labels: {
								formatter: (val) => {
									return dayjs(val).format('HH:mm')
								}
							},
							title: {
								text: "Hour : Minutes",
							}
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