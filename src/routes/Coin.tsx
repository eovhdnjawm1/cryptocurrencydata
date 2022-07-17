import axios from 'axios';
import { Route, useHistory, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { isDarkAtom } from './../atoms';
import { Switch } from 'react-router-dom';
import Price from './Price';
import Chart from './Chart';

const Title = styled.h1`
	color: ${props => props.theme.decColor};
	margin: 20px 0;
	font-size: 25px;
	font-weight:bold;
	& {
		transition: color .2s ease-in-out;
	}
`

const Container = styled.div`
padding: 0px 20px;
max-width: 480px;
margin: 0 auto;
`

const Header = styled.header`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`


const Loader = styled.span`
	text-align: center;
	font-size: 25px;
	display:block;
	color: ${props => props.theme.textColor};
`

const ThemeModeButton = styled.button`
	margin: 15px 0;
	border: none;
	background-color: ${props => props.theme.buttonBg};
	color: ${props => props.theme.buttonText};
	width: 120px;
	height: 30px;
	border-radius: 15px;
	cursor:pointer;
`


const BackButton = styled.button`
  border: none;
  border-radius: 5px;
  cursor:pointer;
  background-color: ${(props) => props.theme.buttonBg};
  padding: 10px;
`;


const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.buttonBg};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.theme.buttonText};
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  line-height: 25px;
  color: ${props => props.theme.decColor};
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span <  { isActive: boolean }> `
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.buttonBg};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
		props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const RouteStyle = styled.div`
	color: ${(props) => props.theme.decColor};
`

interface ITag {
	coin_counter: number;
	ico_counter: number;
	id: string;
	name: string;
}
interface InfoData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
	description: string;
	message: string;
	open_source: boolean;
	started_at: string;
	development_status: string;
	hardware_wallet: boolean;
	proof_type: string;
	org_structure: string;
	hash_algorithm: string;
	first_data_at: string;
	last_data_at: string;
}
interface PriceData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	beta_value: number;
	first_data_at: string;
	last_updated: string;
	quotes: {
		USD: {
			ath_date: string;
			ath_price: number;
			market_cap: number;
			market_cap_change_24h: number;
			percent_change_1h: number;
			percent_change_1y: number;
			percent_change_6h: number;
			percent_change_7d: number;
			percent_change_12h: number;
			percent_change_15m: number;
			percent_change_24h: number;
			percent_change_30d: number;
			percent_change_30m: number;
			percent_from_price_ath: number;
			price: number;
			volume_24h: number;
			volume_24h_change_24h: number;
		};
	};
}

interface RouteParams {
	coinId: string;
}

interface RouteState {
	name: string;
}


function Coin() {
	const { coinId } = useParams<RouteParams>();
	const { state } = useLocation<RouteState>();
	const [loading, setLoading] = useState(false);

	const history = useHistory();

	const setDarkAtom = useSetRecoilState(isDarkAtom);
	const isDarakAtom = () => setDarkAtom(prev => !prev)

	const [info, setInfo] = useState<InfoData>()
	const [priceInfo, setPriceInfo] = useState<PriceData>();


	useEffect(() => {
		(async () => {
			const infoData = await (
				await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
			).json();
			const tickersData = await (
				await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
			).json();
			setInfo(infoData);
			setPriceInfo(tickersData);
			setLoading(false);
		})();

	}, [])



	return (
		<Container>
			<Header>
				<Title>Coin : {coinId}</Title>
				<BackButton onClick={() => history.push("/")}>🏠</BackButton>
				<ThemeModeButton onClick={isDarakAtom}>테마 모드 변경</ThemeModeButton>
			</Header>
			{loading ? (<Loader>Loading...</Loader>) :
				(
					<>
						<Overview>
							<OverviewItem>
								<span>Rank:</span>
								<span>{info?.rank}</span>
							</OverviewItem>
							<OverviewItem>
								<span>Symbol:</span>
								<span>${info?.symbol}</span>
							</OverviewItem>
							<OverviewItem>
								<span>Price:</span>
								<span>${priceInfo?.quotes.USD.price.toFixed(2)}</span>
							</OverviewItem>
						</Overview>
						<Description>{info?.description}</Description>
						<Overview>
							<OverviewItem>
								<span>Total Suply:</span>
								<span>{priceInfo?.total_supply}</span>
							</OverviewItem>
							<OverviewItem>
								<span>Max Supply:</span>
								<span>{priceInfo?.max_supply}</span>
							</OverviewItem>
						</Overview>
						<Switch>
							<RouteStyle>
								<Route path={`/${coinId}/price`}><Price /></Route>
								<Route path={`/${coinId}/chart`}><Chart /></Route>
							</RouteStyle>
						</Switch>
					</>
				)
			}
		</Container>
	)
}

export default Coin;