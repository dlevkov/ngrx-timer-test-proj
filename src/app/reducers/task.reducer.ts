import {
  EntityState,
  EntityAdapter,
  createEntityAdapter,
  Dictionary,
} from '@ngrx/entity';
import { Task } from '../task.model';
import { TaskActions, TaskActionTypes } from '../task.actions';
import { createSelector } from '@ngrx/store';

export interface State extends EntityState<Task> {
  activeTaskId?: string;
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>({
  selectId: (task: Task) => task.id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  activeTaskId: undefined,
});

export function reducer(state = initialState, action: TaskActions): State {
  switch (action.type) {
    case TaskActionTypes.AddTask: {
      return adapter.addOne(
        {
          id: action.payload.selectId,
          name: action.payload.taskName,
          elapsedSeconds: 10,
        },
        state
      );
    }

    case TaskActionTypes.UpdateTask: {
      return adapter.updateOne(action.payload.task, state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
export const getActiveTaskId = (state: State) => state.activeTaskId;
