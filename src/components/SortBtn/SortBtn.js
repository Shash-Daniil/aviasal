import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import css from './SortBtn.module.css';
import * as actions from '../../redux/actions/actions';

const { biletsBtn, selected } = css;

const SortBtn = (props) => {
  const { ticketsSort, changeSort, text, type } = props;

  return (
    <input
      onClick={() => changeSort(type)}
      className={[biletsBtn, ticketsSort === type ? selected : null].join(' ')}
      type="button"
      value={text}
    />
  );
};

const mapStateToProps = (state) => ({
  ticketsSort: state.ticketsReducer.ticketsSort,
});

const mapDispatchToProps = (dispatch) => {
  const { changeSort } = bindActionCreators(actions, dispatch);

  return {
    changeSort,
  };
};

SortBtn.propTypes = {
  ticketsSort: PropTypes.string.isRequired,
  changeSort: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SortBtn);
