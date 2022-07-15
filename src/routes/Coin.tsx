import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

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
	background-color: ${props => props.theme.buttonColor};
	width: 120px;
	height: 30px;
	border-radius: 15px;
	cursor:pointer;
`
interface RouteParams {
	coinId: string;
}

function Coin() {
	const { coinId } = useParams<RouteParams>();
	const [loading, setLoading] = useState(false);

	return (
		<Container>
			<h1>Coin : {coinId}</h1>
			<Header>
				<Title>Coin</Title>
				<ThemeModeButton>테마 모드 변경</ThemeModeButton>
			</Header>
			{loading ? (<Loader>Loading...</Loader>) :
				null
			}
		</Container>
	)
}

export default Coin;