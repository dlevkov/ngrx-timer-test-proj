import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from './task.actions';
import { map } from 'rxjs/operators';
import { TimerService } from '../timer.service';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private timerService: TimerService) {
    this.timerService.initTimer();
  }

}
