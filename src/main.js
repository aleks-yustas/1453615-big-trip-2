import {render} from './framework/render';
import TripInfoView from './view/trip-info-view';
import FilterView from './view/filter-view';
import TripPresenter from './presenter/trip-presenter';
import PointsModel from './model/points-model';

const tripMainContainer = document.querySelector('.trip-main');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripBodyElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();

render(new TripInfoView(), tripMainContainer);
render(new FilterView(), tripFiltersContainer);

const tripPresenter = new TripPresenter({
  tripContainer: tripBodyElement,
  pointsModel
});
tripPresenter.init();
