import AbstractView from '../framework/view/abstract-view'
import {OFFER_TYPES} from '../const.js';
import {dateFormatters} from '../utils.js';

function createPointEditTemplate(point, offers, destinations) {
  const { basePrice, dateFrom, dateTo, destination, type } = point;
  const currentDestination = destinations.find((destinationItem) => destinationItem.id === destination);
  const typeOffers = offers.find((offerItem) => offerItem.type === point.type).offers;
  const pointOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));

  function createEventTypeGroupTemplate(types) {
    return (
      `<fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${types.map((typeItem) => (`<div class="event__type-item">
              <input
                id="event-type-${typeItem.toLowerCase()}-1"
                class="event__type-input visually-hidden"
                type="radio"
                name="event-type"
                value="${typeItem.toLowerCase()}"
                ${typeItem.toLowerCase() === type ? 'checked' : ''}
              >
              <label
                class="event__type-label event__type-label--${typeItem.toLowerCase()}"
                for="event-type-${typeItem.toLowerCase()}-1"
              >
                ${typeItem}
              </label>
            </div>`)).join('')}
      </fieldset>`
    );
  }

  function createAvailableOffersListTemplate(availableOffers) {
    if (availableOffers?.length > 0) {
      return (
        `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${availableOffers.map((offerItem) => (`<div class="event__offer-selector">
                <input
                  class="event__offer-checkbox visually-hidden"
                  id="event-offer-${offerItem.id}"
                  type="checkbox" name="event-offer-${offerItem.id}"
                  ${pointOffers.some((pointOffer) => pointOffer.id === offerItem.id) ? 'checked' : ''}
                >
                <label class="event__offer-label" for="event-offer-${offerItem.id}">
                  <span class="event__offer-title">${offerItem.title}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${offerItem.price}</span>
                </label>
              </div>`)).join('')}
          </div>
        </section>`
      );
    } else {
      return '';
    }
  }

  function createDestinationPhotosListTemplate(destinationImages) {
    if (destinationImages?.length > 0) {
      return (
        `<div class="event__photos-container">
          <div class="event__photos-tape">
            ${destinationImages.map((imageItem) => `<img class="event__photo" src="${imageItem.src}" alt="${imageItem.description}">`)}
          </div>
        </div>`
      );
    } else {
      return '';
    }
  }

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
              ${createEventTypeGroupTemplate(OFFER_TYPES)};
            </div>
          </div>
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
            </label>
            <input
              class="event__input  event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="${currentDestination.name}"
              list="destination-list-1"
            >
            <datalist id="destination-list-1">
              ${destinations.map((destinationItem) => `<option value="${destinationItem.name}"></option>`).join('')}
            </datalist>
          </div>
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input
              class="event__input  event__input--time"
              id="event-start-time-1"
              type="text"
              name="event-start-time"
              value="${dateFormatters.toCompactDateTime(dateFrom)}"
            >
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input
              class="event__input  event__input--time"
              id="event-end-time-1"
              type="text"
              name="event-end-time"
              value="${dateFormatters.toCompactDateTime(dateTo)}"
            >
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input
              class="event__input
              event__input--price"
              id="event-price-1"
              type="text"
              name="event-price"
              value="${basePrice}"
            >
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${createAvailableOffersListTemplate(typeOffers)}
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${currentDestination.description}</p>
            <div class="event__photos-container">
              ${createDestinationPhotosListTemplate(currentDestination.pictures)}
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
}

export default class PointEditView extends AbstractView {
  constructor(point, offers, destinations) {
    super();
    this.point = point;
    this.offers = offers;
    this.destinations = destinations;
  }

  get template() {
    return createPointEditTemplate(this.point, this.offers, this.destinations);
  }
}
