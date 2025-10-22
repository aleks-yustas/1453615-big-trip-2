import {render} from '../framework/render';
import EventsListView from '../view/events-list-view';
import SortingView from '../view/sorting-view';
import PointEditView from '../view/point-edit-view';
import TripPointView from '../view/trip-point-view';

export default class TripPresenter {
  eventsListComponent = new EventsListView();

  constructor({tripContainer, pointsModel}) {
    this.tripContainer = tripContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    const tripPoints = [...this.pointsModel.getPoints()];
    const offers = this.pointsModel.getOffers();
    const destinations = this.pointsModel.getDestinations();

    render(new SortingView(), this.tripContainer);
    render(this.eventsListComponent, this.tripContainer);
    render(new PointEditView(tripPoints[0], offers, destinations), this.eventsListComponent.element);

    for (let i = 1; i <= 3; i++) {
      render(new TripPointView(tripPoints[i], offers, destinations), this.eventsListComponent.element);
    }
  }
}
