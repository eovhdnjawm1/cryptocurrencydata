## 가상화폐 목록 및 시세 확인 프로젝트

```
URL : https://eovhdnjawm1.github.io/cryptocurrencydata/
```

1. 시가 총액 Top 100의 코인을 확인할 수 있습니다.
2. 각 코인의 코인 랭킹, 심볼, 현재가격, 공급 갯수를 확인할 수 있습니다.
3. 각 코인의 가격을 chart로 확인할 수 있습니다.
4. 각 코인의 당일 시작 금액, 마감 금액, 저점, 고점 가격을 확인 할 수 있습니다.

- (coinpaprika 유료화 정책으로 인해 3번 4번은 고정된 API를 사용 하였습니다.)

## 기술 스택

- styled components
- recoil
- react query
- react router dom (v5.3.0)
- apex chart
- dayjs
- Typescripts

### styled components

- css 파일을 새로 생성하지 않고 js, ts, tsx 파일 내부에 style을 설정하여 파일의 갯수를 줄일 수 있습니다.
- 기존 div, h1, header, span 과 같은 태그를 변수에 담아 태그 대신 사용하여 JSX코드의 직관성을 높일 수 있습니다.
- 각 태그의 className, style={} 를 생성 및 지정하지 않아도 style을 지정할 수 있습니다.

```
const Title = styled.h1`
	font-weight: bold;
	text-align: center;
`
...
<>
	<Title> 제목입니다. </Title>
</>
```

### Recoil

- context API, redux와 같은 전역 상태관리를 할 수 있는 라이브러리 입니다.
- Recoil state를 지정해놓는다면 해당 state가 변경될때 마다 리렌더링이 작동됩니다.
- 해당 프로젝트에서는 theme 지정 (dark, light)에 사용 되었습니다.

### React Query

- axios, fetch 등을 통하여 API data 받아오는 것을 보관 하고 관리 하기위한 라이브러리 입니다.
- 또한 전역적 데이터 관리에 사용되며 비동기 로직을 쉽게 다룰 수 있습니다.
- React Query로 받아온 data는 캐싱 되어 2개의 같은 페이지를 반복 이동하여도 최초 통신 1회에만 API 통신을 발생 시킵니다.
- API 통신을 통하여 data를 받아 왔을때 발생하는 error, success, loading 등에 대한 프로퍼티를 제공합니다.
- 해당 프로젝트에서는 코인파프리카의 coin data, 노마드 코더의 coin price 데이터를 받아오는데 사용하였습니다.
- React Query에 대하여 더 자세한 정리 사항은 블로그에 정리하였습니다.

```
https://promanysided.tistory.com/116
```

### Apex Chart

- data를 입력하여 Chart를 손쉽게 표현할 수 있는 라이브러리를 사용하였습니다.

### dayjs

- javaScript 날짜 라이브러리 입니다.
- 기존 코인 파프리카의 price data의 Time_open은 number 타입이였습니다.
- 새롭게 제공된 노마드 코더의 time_open의 데이터 타입은 string 타입입니다.
- string 값으로 제공된 date 값을 날짜 값으로 변경하기 위해 사용하였습니다.

### React Router Dom (v5.3.0)

- 클라이언트 사이드 렌더링을 도와주는 라이브러리 입니다.
- 사용자가 입력한 주소를 감지하는 역할을 가집니다.
- 해당 프로젝트의 컴포넌트로 BrowserRouter, Switch, Route, Link를 사용하였습니다.
- 쿼리스트링에 관련한 Hook으로 useLocation, useParams를 사용하였습니다.
- 코드의 중복과 전체 페이지 리렌더리을 방지하기 위하여 Nested Router 방식을 사용하였습니다.
- 쿼리스트링에 관한 Hook에 관한 자세한 사항은 블로그에 정리 하였습니다.

```
https://promanysided.tistory.com/115
```

### Typescript

- 기존 javascript는 동적 타입의 언어로 오류가 발생할 시 런타임에서 오류를 발견합니다.
- TypeScript는 정적 타입의 컴파일 언어 이며 javascript로 언어가 변환되어 사용 됩니다.
- 또한, 코드 작성 단계 및 런타임 이전에 오류를 발견하여 정확한 디버깅이 가능합니다.
- 타입을 강제하기 때문에 프로퍼티를 활용할 때 자동완성에 도움을 줍니다.

### 라이브러리 Typescript 적용

```
 npm install --save typescript @types/react-dom
 npm install --save typescript @types/styled-components
 ...
```

### 에러 및 해결 사항

```
- chart data의 x축 값이 string 값이였으며 해당 데이터를 number 값으로 변경하기위해 parseInt를 사용하였으나 통신과정의 문제로 string 값을 먼저 확인하여 chart의 x축값이 변경되지 않는 문제가 발생하였습니다.
- 이에 dayjs의 콜백함수를 사용하여 x축의 값을 시간값으로 변경하였습니다.
```
