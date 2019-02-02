import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { TaskEffects } from './task.effects';

describe('TaskEffects', () => {
  const actions$: Observable<any> = of({});
  let effects: TaskEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.get(TaskEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
