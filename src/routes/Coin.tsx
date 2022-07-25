import { Helmet } from 'react-helmet';
import { Link, Route, useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { isDarkAtom } from './../atoms';
import { Switch } from 'react-router-dom';
import Price from './Price';
import Chart from './Chart';
import { fetchCoinInfo, fetchCoinTickers } from './../api';
import { useQuery } from 'react-query';

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

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: ${(props) => props.isActive ? 700 : "none"};
  background-color: rgba(0, 0, 0, 0.2);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
		props.isActive ? props.theme.accentColor : props.theme.decColor};
  

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

	const history = useHistory();

	const setDarkAtom = useSetRecoilState(isDarkAtom);
	const isDarakAtom = () => setDarkAtom(prev => !prev)

	const priceMatch = useRouteMatch(`/${coinId}/price`);
	const chartMatch = useRouteMatch(`/${coinId}/chart`);

	const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId))
	const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId))
	const loading = infoLoading || tickersLoading;

	return (
		<Container>
			<Helmet>
				<title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</title>
			</Helmet>
			<Header>
				<Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
				<BackButton onClick={() => history.push("/")}>🏠</BackButton>
				<ThemeModeButton onClick={isDarakAtom}>테마 모드 변경</ThemeModeButton>
			</Header>
			{loading ? (<Loader>Loading...</Loader>) :
				(
					<>
						<Overview>
							<OverviewItem>
								<span>Rank:</span>
								<span>{infoData?.rank}</span>
							</OverviewItem>
							<OverviewItem>
								<span>Symbol:</span>
								<span>${infoData?.symbol}</span>
							</OverviewItem>
							<OverviewItem>
								<span>Price:</span>
								<span>${tickersData?.quotes.USD.price.toFixed(2)}</span>
							</OverviewItem>
						</Overview>
						<Description>{infoData?.description}</Description>
						<Overview>
							<OverviewItem>
								<span>Total Suply:</span>
								<span>{tickersData?.total_supply}</span>
							</OverviewItem>
							<OverviewItem>
								<span>Max Supply:</span>
								<span>{tickersData?.max_supply}</span>
							</OverviewItem>
						</Overview>

						<RouteStyle>
							<Tabs>
								<Tab isActive={chartMatch !== null}>
									<Link to={`/${coinId}/chart`}>
										Chart
									</Link>
								</Tab>
								<Tab isActive={priceMatch !== null}>
									<Link to={`/${coinId}/price`}>
										Price
									</Link>
								</Tab>
							</Tabs>

							<Switch>
								<Route path={`/${coinId}/price`}><Price coinId={coinId} /></Route>
								<Route path={`/${coinId}/chart`}><Chart coinId={coinId} /></Route>
							</Switch>
						</RouteStyle>
					</>
				)
			}
		</Container>
	)
}

export default Coin;