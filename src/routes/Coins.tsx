import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { isDarkAtom } from './../atoms';

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


const Coinlist = styled.ul`
margin-top: 30px;
`

const Coin = styled.li`
	background-color: ${props => props.theme.buttonBg};
	color: ${props => props.theme.buttonText};
	margin-bottom: 10px;
	border-radius: 15px;
	font-weight: bold;
	a {
		padding: 20px;
		transition: color .3s ease-in-out;
		display:flex;
		align-items: center;
		cursor: pointer;
	}
	&:hover{
		a{
			color: ${props => props.theme.accentColor};
		}
	}
`
const CoinImage = styled.img`
	width: 35px;
	height: 35px;
	margin-right: 10px;
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

interface ICoin {
	id: string,
	name: string,
	symbol: string,
	rank: number,
	is_new: boolean,
	is_active: boolean,
	type: string,
}

interface ICoinProps {

}

function Coins({ }: ICoinProps) {
	const [coins, setCoins] = useState<ICoin[]>([]);
	const [loading, setLoading] = useState(true);

	const setDarkAtom = useSetRecoilState(isDarkAtom);
	const isDarakAtom = () => setDarkAtom(prev => !prev)


	useEffect(() => {

		(async () => {
			const res = await axios(`https://api.coinpaprika.com/v1/coins`);
			setCoins(res.data.slice(0, 99))
			setLoading(false);
		})();
	}, [])

	return (
		<Container>
			<Header>
				<Title>Coins</Title>
				<ThemeModeButton onClick={isDarakAtom}>테마 모드 변경</ThemeModeButton>

			</Header>
			{loading ? <Loader>Loading...</Loader> : <Coinlist>
				{

					coins.map((coin) => (
						<Coin key={coin.id}>
							<Link to={{
								pathname: `/${coin.id}`,
								state: { name: coin.name },
							}} >
								<CoinImage src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />

								{coin.name} &rarr;
							</Link>
						</Coin>
					))
				}
			</Coinlist>}
		</Container>
	)
}

export default Coins;