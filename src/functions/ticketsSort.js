import { CHEAPEST, FASTEST, OPTIMAL } from '../constants/sortValues';

export default function ticketsSort(sortType, arr) {
  let tickets;
  if (sortType === CHEAPEST) {
    // Эта дичь сортирует билеты: по возрастанию цены, по возрастанию времени в пути
    tickets = [...arr].sort((aElem, bElem) => aElem.price - bElem.price);
  } else if (sortType === FASTEST) {
    tickets = [...arr].sort((aElem, bElem) => {
      const aMinDuration = Math.min(...aElem.segments.map((elem) => elem.duration));
      const bMinDuration = Math.min(...bElem.segments.map((elem) => elem.duration));
      return aMinDuration - bMinDuration;
    });
  } else if (sortType === OPTIMAL) {
    tickets = [...arr].sort((aElem, bElem) => bElem.price - aElem.price);
  }
  return tickets;
}
