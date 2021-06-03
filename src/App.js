import { Spin, Alert } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Ticket from './components/Ticket/Ticket';
import Button from './components/Button/Button';
import Sidebar from './components/Sidebar/Sidebar';
import { CHEAPEST, FASTEST, OPTIMAL } from './constants/sortValues';
import * as actions from './redux/actions/actions';
import AviaLogo from './img/Logo.png';

import css from './App.module.css';

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

    setFilteredTickets([...ticketsArr].splice(0, spliceIndex));
  }, [state.filters, state.ticketsArr, spliceIndex]);

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
              onClick={() => changeSort(CHEAPEST)}
              className={[biletsBtn, state.ticketsSort === CHEAPEST ? selected : null].join(' ')}
              type="button"
              value="Самый дешевый"
            />
            <input
              onClick={() => changeSort(FASTEST)}
              className={[biletsBtn, state.ticketsSort === FASTEST ? selected : null].join(' ')}
              type="button"
              value="Самый быстрый"
            />
            <input
              onClick={() => changeSort(OPTIMAL)}
              className={[biletsBtn, state.ticketsSort === OPTIMAL ? selected : null].join(' ')}
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
            {state.filteredTicketsArr.map((elem, id) => (
              <Ticket key={Math.floor(id)} price={elem.price} carrier={elem.carrier} segments={elem.segments} />
            ))}
            {!state.stop ? <Spin style={{ marginTop: '20px' }} /> : null}
          </div>
          {state.filters.length === 0 || state.filteredTicketsArr.length === 0 ? null : (
            <Button handler={() => setSpliceIndex(spliceIndex + 5)} text="ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!" />
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
