import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Title = styled.h1`
	color: ${props => props.theme.accentColor};
`

const Container = styled.div`
padding: 0px 20px;
max-width: 480px;
margin: 0 auto;
`

const Header = styled.header`
	height: 10vh;
	display: flex;
	justify-content: center;
	align-items: center;
`


const Coinlist = styled.ul`

`

const Coin = styled.li`
	background-color: white;
	color: ${props => props.theme.bgColor};
	margin-bottom: 10px;
	border-radius: 15px;
	font-weight: bold;
	
	
	a {
		padding: 20px;
		transition: color .3s ease-in-out;
		display:block;
		cursor: pointer;
	}

	&:hover{
		a{
			color: ${props => props.theme.accentColor};
		}
	}
`

const Loader = styled.span`
	text-align: center;
	font-size: 25px;
	display:block;
	color: ${props => props.theme.textColor};
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


function Coins() {
	const [coins, setCoins] = useState<ICoin[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {

		(async () => {
			const res = await axios(`https://api.coinpaprika.com/v1/coins`);
			console.log(res.data);
			setCoins(res.data.slice(0, 99))
			setLoading(false);
		})();
	}, [])

	return (
		<Container>
			<Header>
				<Title>Coins</Title>

			</Header>
			{loading ? <Loader>Loading...</Loader> : <Coinlist>
				{

					coins.map((coin) => (
						<Coin key={coin.id}>
							<Link to={`/${coin.id}`}>
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