import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromTask from './task.reducer';

export interface State {
  tasks: fromTask.State;
}

export const reducers: ActionReducerMap<State> = {
  tasks: fromTask.reducer,
};

export const getActiveTaskId = createSelector(fromTask.getActiveTaskId);

export const {
  selectAll,
  selectEntities: getTaskEntities,
} = fromTask.adapter.getSelectors((state: State) => state.tasks);

export const getAllTasks = createSelector(
  (state: State) => state.tasks,
  fromTask.selectAll
);
export const getTimers = createSelector(
  getAllTasks,
  x => x.map(y => y.elapsedSeconds)
);
export const getTotal = createSelector(
  getTimers,
  timers => timers.reduce((x, y) => x + y, 0)
);
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
