import { Spin, Alert } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getTime from 'date-fns/getTime';
import Ticket from './components/ticket/Ticket';
import Button from './components/button/button';
import Sidebar from './components/sidebar/Sidebar';
import * as actions from './actions/actions';
import AviaLogo from './img/Logo.png';

import css from './app.module.css';

import '../node_modules/antd/dist/antd.css';

const { app, main, bilets, biletsFilter, biletsBtn, selected, aviaLogo, mainContent, header } = css;

function App(props) {
  const { getTickets, changeSort, setFilteredTickets, state } = props;
  const [searchId, setSearchId] = useState('');
  const [spliceIndex, setSpliceIndex] = useState(5);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    fetch('https://front-test.beta.aviasales.ru/search')
      .then((resp) => resp.json())
      .then((resp) => {
        setSearchId(resp.searchId);
        getTickets(resp.searchId);
      });
  }, []);

  useEffect(() => {
    if (!state.stop && !state.loading) {
      getTickets(searchId);
    }
  });

  useEffect(() => {
    const ticketsArr = JSON.parse(JSON.stringify(state.ticketsArr)).filter((elem) => {
      let peresadki = 0;
      const arr = { ...elem };
      if (props.state.filters.length === 4) {
        return true;
      }
      arr.segments.forEach((segment) => {
        peresadki += segment.stops.length;
      });
      return props.state.filters.indexOf(peresadki) !== -1;
    });

    setFilteredTickets(ticketsArr);
  }, [state.filters, state.ticketsArr]);

  return (
    <div className={app}>
      <header className={header}>
        <img className={aviaLogo} src={AviaLogo} alt="site logo" />
      </header>
      <main className={mainContent}>
        <Sidebar />
        <main className={main}>
          <div className={biletsFilter}>
            <input
              onClick={() => changeSort('cheapest')}
              className={[biletsBtn, state.ticketsSort === 'cheapest' ? selected : null].join(' ')}
              type="button"
              value="Самый дешевый"
            />
            <input
              onClick={() => changeSort('fastest')}
              className={[biletsBtn, state.ticketsSort === 'fastest' ? selected : null].join(' ')}
              type="button"
              value="Самый быстрый"
            />
            <input
              onClick={() => changeSort('optimal')}
              className={[biletsBtn, state.ticketsSort === 'optimal' ? selected : null].join(' ')}
              type="button"
              value="Оптимальный"
            />
          </div>
          <div className={bilets}>
            {state.filters.length === 0 || state.filteredTicketsArr.length === 0 ? (
              <Alert
                message="Рейсов, подходящих под заданные фильтры, не найдено"
                type="error"
                style={{ marginTop: '20px' }}
              />
            ) : null}
            {[...state.filteredTicketsArr].splice(0, spliceIndex).map((elem) => (
              <Ticket
                key={Math.floor(elem.segments[0].duration + getTime(new Date(elem.segments[0].date)))}
                price={elem.price}
                carrier={elem.carrier}
                segments={elem.segments}
              />
            ))}
            {!state.stop ? <Spin style={{ marginTop: '20px' }} /> : null}
          </div>
          {state.filters.length === 0 || state.filteredTicketsArr.length === 0 ? null : (
            <Button setSpliceIndex={() => setSpliceIndex(spliceIndex + 5)} />
          )}
        </main>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => {
  const { changeSort, getTickets, setFilteredTickets } = bindActionCreators(actions, dispatch);

  return {
    changeSort,
    getTickets,
    setFilteredTickets,
  };
};

App.propTypes = {
  changeSort: PropTypes.func.isRequired,
  getTickets: PropTypes.func.isRequired,
  setFilteredTickets: PropTypes.func.isRequired,
  state: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
