import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import { ALL } from '../../constants/filterTypes';
import css from './Sidebar.module.css';
import * as actions from '../../redux/actions/actions';

const { sidebar, filter, filterItem, title } = css;

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
const Sidebar = (props) => {
  const { filters, changeFilter } = props;

  const styles = { width: '100%', padding: '10px 20px' };
  return (
    <div className={sidebar}>
      <div className={title}>Количество пересадок</div>
      <ul className={filter}>
        <li className={filterItem}>
          <Checkbox style={styles} onChange={() => changeFilter(ALL)} checked={filters.length === 4 ? '1' : ''}>
            Все
          </Checkbox>
        </li>
        <li className={filterItem}>
          <Checkbox style={styles} onChange={() => changeFilter(0)} checked={filters.indexOf(0) !== -1 ? '1' : ''}>
            Без пересадок
          </Checkbox>
        </li>
        <li className={filterItem}>
          <Checkbox style={styles} onChange={() => changeFilter(1)} checked={filters.indexOf(1) !== -1 ? '1' : ''}>
            1 пересадка
          </Checkbox>
        </li>
        <li className={filterItem}>
          <Checkbox style={styles} onChange={() => changeFilter(2)} checked={filters.indexOf(2) !== -1 ? '1' : ''}>
            2 пересадки
          </Checkbox>
        </li>
        <li className={filterItem}>
          <Checkbox style={styles} onChange={() => changeFilter(3)} checked={filters.indexOf(3) !== -1 ? '1' : ''}>
            3 пересадки
          </Checkbox>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({ filters: state.filters });

const mapDispatchToProps = (dispatch) => {
  const { changeSort, changeFilter } = bindActionCreators(actions, dispatch);

  return {
    changeSort,
    changeFilter,
  };
};

Sidebar.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  filters: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
