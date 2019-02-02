import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Task } from '../task.model';
import { TaskActions, TaskActionTypes } from '../task.actions';

export interface State extends EntityState<Task> {
  activeTaskId: string;
}
const timerInitialValue = 0;
const taskIdDefaultValue = undefined;
export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>({
  selectId: (task: Task) => task.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  activeTaskId: taskIdDefaultValue,
});

export function reducer(state = initialState, action: TaskActions): State {
  switch (action.type) {
    case TaskActionTypes.AddTask: {
      return adapter.addOne(
        {
          id: action.payload.selectId,
          name: action.payload.taskName,
          elapsedSeconds: timerInitialValue,
        },
        state
      );
    }

    case TaskActionTypes.UpdateTask: {
      return adapter.updateOne(action.payload.task, state);
    }
    case TaskActionTypes.PlayTask: {
      return { ...state, activeTaskId: action.payload.taskId };
    }
    case TaskActionTypes.PauseTask: {
      return { ...state, activeTaskId: taskIdDefaultValue };
    }
    case TaskActionTypes.SetTaskElapsedSeconds: {
      return adapter.updateOne(
        {
          id: action.payload.taskId,
          changes: { elapsedSeconds: action.payload.elapsedSeconds },
        },
        state
      );
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
