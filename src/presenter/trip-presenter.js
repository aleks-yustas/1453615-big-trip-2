import {render} from '../framework/render';
import EventsListView from '../view/events-list-view';
import SortingView from '../view/sorting-view';
import TripPointView from '../view/trip-point-view';

export default class TripPresenter {
  #eventsListComponent = new EventsListView();

  constructor({tripContainer, pointsModel}) {
    this.tripContainer = tripContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    const tripPoints = [...this.pointsModel.points];
    const offers = this.pointsModel.offers;
    const destinations = this.pointsModel.destinations;

    render(new SortingView(), this.tripContainer);
    render(this.#eventsListComponent, this.tripContainer);

    for (let i = 0; i <= tripPoints.length - 1; i++) {
      this.#renderTripPoint(tripPoints[i], offers, destinations);
    }
  }

  #renderTripPoint(point, offers, destinations) {
    const tripPoint = new TripPointView(point, offers, destinations);

    render(tripPoint, this.#eventsListComponent.element);
  }
}
