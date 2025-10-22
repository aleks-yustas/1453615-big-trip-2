import {render, replace} from '../framework/render';
import EventsListView from '../view/events-list-view';
import SortingView from '../view/sorting-view';
import TripPointView from '../view/trip-point-view';
import PointEditView from '../view/point-edit-view';

export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;

  #eventsListComponent = new EventsListView();

  #tripPoints = [];
  #offers = [];
  #destinations = [];

  constructor({tripContainer, pointsModel}) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.points];
    this.#offers = this.#pointsModel.offers;
    this.#destinations = this.#pointsModel.destinations;

    this.#renderTrip();
  }

  #renderTripPoint(point, offers, destinations) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const tripPointComponent = new TripPointView({
      point,
      offers,
      destinations,
      onExpandClick: () => {
        replacePointToEdit();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const tripPointEditComponent = new PointEditView({
      point,
      offers,
      destinations,
      onFormSubmit: () => {
        replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onCollapseClick: () => {
        replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToEdit() {
      replace(tripPointEditComponent, tripPointComponent);
    }

    function replaceEditToPoint() {
      replace(tripPointComponent, tripPointEditComponent);
    }


    render(tripPointComponent, this.#eventsListComponent.element);
  }

  #renderTrip() {
    render(new SortingView(), this.#tripContainer);
    render(this.#eventsListComponent, this.#tripContainer);

    for (let i = 0; i <= this.#tripPoints.length - 1; i++) {
      this.#renderTripPoint(this.#tripPoints[i], this.#offers, this.#destinations);
    }
  }
}
