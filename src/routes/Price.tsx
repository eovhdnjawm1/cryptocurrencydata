import { useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchCoinHistory } from './../api';

const Container = styled.div`
	display: grid;
	grid-template:
	"a a"
	"a a";
`

const List = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: 2px solid ${(props) => props.theme.buttonBg};
	border-radius: 20% / 50%;
	padding: 10px;
	margin: 20px;

	& span:nth-child(2) {
    margin-top: 10px;
    font-weight: bold;
  }
`;

interface PriceProps {
	coinId: string;
}

interface ITodayPrice {
	time_open: string;
	time_close: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}


function Price({ coinId }: PriceProps) {
	const { isLoading, data } = useQuery<ITodayPrice[]>(["today", coinId], () => fetchCoinHistory(coinId));

	const todayObjData: any = data ? data[0] : {};
	const displayKey = ["open", "close", "low", "high"];
	const priceData = displayKey.map((data) => todayObjData[data]);

	return (
		<>
			{isLoading ? ("Loading price...") : (
				<>
					<Container>
						{displayKey.map((data, index) => {
							return (
								<List key={index}>
									<span>
										{data}
									</span>
									<span>${priceData[index]}</span>
								</List>
							)
						})}
					</Container>
				</>
			)}
		</>
	)
}

export default Price;