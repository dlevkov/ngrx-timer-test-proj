import { Action } from '@ngrx/store';

export enum TaskActionTypes {
  AddTask = '[Task API] Add Task',
  SetTaskElapsedSeconds = '[Task API] Set Task elapsed seconds',
  PlayTask = '[Task UI] Play Task requested',
  PauseTask = '[Task UI] Pause Task requested',
  PerformTick = '[Task API] Perform Tick',
  ChangeActiveTaskId = '[Task API] ChangeActiveTaskId',
}

export class AddTask implements Action {
  readonly type = TaskActionTypes.AddTask;
  constructor(public payload: { taskName: string; selectId: string }) {}
}

export class PlayTask implements Action {
  readonly type = TaskActionTypes.PlayTask;
  constructor(public payload: { taskId: string }) {}
}
export class PauseTask implements Action {
  readonly type = TaskActionTypes.PauseTask;
  constructor(public payload: { taskId: string }) {}
}
export class PerformTick implements Action {
  readonly type = TaskActionTypes.PerformTick;
}
export class ChangeActiveTaskId implements Action {
  readonly type = TaskActionTypes.ChangeActiveTaskId;
  constructor(public payload: { taskId: string }) {}
}
export class SetTaskElapsedSeconds implements Action {
  readonly type = TaskActionTypes.SetTaskElapsedSeconds;
  constructor(public payload: { taskId: string; elapsedSeconds: number }) {}
}

export type TaskActions =
  | AddTask
  | SetTaskElapsedSeconds
  | PlayTask
  | PauseTask
  | ChangeActiveTaskId
  | PerformTick;
