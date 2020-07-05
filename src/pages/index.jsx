import styled from 'styled-components';
import { useState } from 'react';
import MetricPage from '../components/MetricPage';
import SelectYear from '../components/MetricPage/SelectYear';

const StyledHome = styled.div`
  margin-left: 92px;
  padding: 30px;
  width: calc(100vw - 92px);

  .title {
    font-weight: 900;
  }

  @media only screen and (max-width: 619px) {
    margin: 75px 20px;
    padding: 0;
    width: 100vw;
  }
`;

/**
 * Page for Overall Metrics
 *
 * @param {*} param0
 */
function Home({ user }) {
  const [year, setYear] = useState('');
  const [yearId, setYearId] = useState(0);
  return (
    <StyledHome>
      <h1 className="title">{year === '' ? 'Overall' : year} Metrics</h1>
      <SelectYear setYearId={setYearId} setYear={setYear} yearId={yearId} year={year} />
      <MetricPage user={user} yearId={yearId} year={year} />
    </StyledHome>
  );
}

export default Home;
