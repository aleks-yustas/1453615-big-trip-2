import AbstractView from '../framework/view/abstract-view'
import {dateFormatters, formatTimeDuration} from '../utils';

function createTripPointTemplate(point, offers, destinations) {
  const {basePrice, dateFrom, dateTo, isFavorite, type} = point;
  const destinationName = destinations.find((destinationItem) => destinationItem.id === point.destination).name;
  const typeOffers = offers.find((offerItem) => offerItem.type === point.type).offers;
  const pointOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));

  function createOffersListTemplate(availableOffers) {
    if (availableOffers?.length > 0) {
      return (
        `<ul class="event__selected-offers">
          ${availableOffers.map((offerItem) => (`<li class="event__offer">
              <span class="event__offer-title">${offerItem.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offerItem.price}</span>
            </li>`)).join('')}
        </ul>`
      );
    } else {
      return '';
    }
  }

  return (
    `<li class="trip-events__item">
      <div class="event">
          <time
            class="event__date"
            datetime="${dateFormatters.toISODate(dateFrom)}"
          >
            ${dateFormatters.toShortDate(dateFrom)}
          </time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${type} ${destinationName}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time
                class="event__start-time"
                datetime="${dateFormatters.toISODateTime(dateFrom)}"
              >
                ${dateFormatters.toTime(dateFrom)}
              </time>
              &mdash;
              <time
                class="event__end-time"
                datetime="${dateFormatters.toISODateTime(dateTo)}"
              >
                ${dateFormatters.toTime(dateTo)}
              </time>
            </p>
            <p class="event__duration">${formatTimeDuration(dateFrom, dateTo)}</p>
          </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          ${createOffersListTemplate(pointOffers)}
          <button
            class="event__favorite-btn
            ${isFavorite ? 'event__favorite-btn--active' : ''}"
            type="button"
          >
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`
  );
}

export default class TripPointView extends AbstractView {
  constructor(point, offers, destinations) {
    super();
    this.point = point;
    this.offers = offers;
    this.destinations = destinations;
  }

  get template() {
    return createTripPointTemplate(this.point, this.offers, this.destinations);
  }
}
