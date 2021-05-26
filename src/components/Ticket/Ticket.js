import React from 'react';
import PropTypes from 'prop-types';
import css from './Ticket.module.css';
import TicketInfo from '../TicketInfo/TicketInfo';

const { bilet, biletHeader, biletPrice, biletLogo } = css;

const Ticket = (props) => {
  const { carrier, segments } = props;
  let { price } = props;

  if (String(price).split('').length > 3) {
    // Эт чтоб был пробел в цене: "30 000 Р" Вместо "30000 Р"
    price = String(price).split('');
    price.splice(price.length - 3, 0, ' ');
    price = price.join('');
  }

  segments.sort((aElem, bElem) => aElem.stops.length - bElem.stops.length);

  return (
    <div className={bilet}>
      <header className={biletHeader}>
        <div className={biletPrice}>{`${price} Р`}</div>
        <div className={biletLogo}>
          <img src={`http://pics.avs.io/99/36/${carrier}.png`} alt="carrier logo" />
        </div>
      </header>
      {segments.map((elem) => (
        <TicketInfo key={elem.duration} info={elem} />
      ))}
    </div>
  );
};

Ticket.propTypes = {
  price: PropTypes.number.isRequired,
  carrier: PropTypes.string.isRequired,
  segments: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default Ticket;
