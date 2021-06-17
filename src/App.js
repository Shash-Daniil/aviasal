import { Spin, Alert } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Service from './services/aviaService';
import Ticket from './components/Ticket/Ticket';
import Button from './components/Button/Button';
import Sidebar from './components/Sidebar/Sidebar';
import SortBtn from './components/SortBtn/SortBtn';
import { CHEAPEST, FASTEST, OPTIMAL } from './constants/sortValues';
import * as actions from './redux/actions/actions';
import AviaLogo from './img/Logo.png';

import css from './App.module.css';

import '../node_modules/antd/dist/antd.css';

const { app, main, bilets, biletsFilter, aviaLogo, mainContent, header } = css;

function App(props) {
  const { getTickets, setFilteredTickets, state } = props;
  const [searchId, setSearchId] = useState('');
  const [spliceIndex, setSpliceIndex] = useState(5);

  const aviaService = new Service();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    aviaService.getTickets().then((resp) => {
      setSearchId(resp.searchId);
      getTickets(resp.searchId);
    });
  }, []);

  useEffect(() => {
    if (!state.ticketsReducer.stop && !state.loading && searchId) {
      getTickets(searchId);
    }
  }, [state.loading]);

  useEffect(() => {
    const ticketsArr = JSON.parse(JSON.stringify(state.ticketsReducer.ticketsArr)).filter((elem) => {
      let peresadki = 0;
      const arr = { ...elem };
      if (state.filters.length === 4) {
        return true;
      }
      arr.segments.forEach((segment) => {
        peresadki += segment.stops.length;
      });
      return state.filters.indexOf(peresadki) !== -1;
    });

    setFilteredTickets([...ticketsArr].splice(0, spliceIndex));
  }, [state.filters, state.ticketsReducer.ticketsArr, spliceIndex]);

  return (
    <div className={app}>
      <header className={header}>
        <img className={aviaLogo} src={AviaLogo} alt="site logo" />
      </header>
      <main className={mainContent}>
        <Sidebar />
        <main className={main}>
          <div className={biletsFilter}>
            <SortBtn text="Самый дешевый" type={CHEAPEST} />
            <SortBtn text="Самый быстрый" type={FASTEST} />
            <SortBtn text="Оптимальный" type={OPTIMAL} />
          </div>
          <div className={bilets}>
            {state.filters.length === 0 || state.ticketsReducer.filteredTicketsArr.length === 0 ? (
              <Alert
                message="Рейсов, подходящих под заданные фильтры, не найдено"
                type="error"
                style={{ marginTop: '20px' }}
              />
            ) : null}
            {state.ticketsReducer.filteredTicketsArr.map((elem, id) => (
              <Ticket key={Math.floor(id)} price={elem.price} carrier={elem.carrier} segments={elem.segments} />
            ))}
            {!state.ticketsReducer.stop ? <Spin style={{ marginTop: '20px' }} /> : null}
          </div>
          {state.filters.length === 0 || state.ticketsReducer.filteredTicketsArr.length === 0 ? null : (
            <Button handler={() => setSpliceIndex(spliceIndex + 5)} text="ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!" />
          )}
        </main>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => {
  const { getTickets, setFilteredTickets } = bindActionCreators(actions, dispatch);

  return {
    getTickets,
    setFilteredTickets,
  };
};

App.propTypes = {
  getTickets: PropTypes.func.isRequired,
  setFilteredTickets: PropTypes.func.isRequired,
  state: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
