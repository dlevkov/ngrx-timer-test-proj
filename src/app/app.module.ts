import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'

import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from './task.effects';
import { MaterialModule } from './material/material.module';
import { TaskContainerComponent } from './components/task-container/task-container.component';
import { TaskPresenterComponent } from './components/task-presenter/task-presenter.component';
import { TaskAddComponent } from './components/task-add/task-add.component';
import { MinuteSecondsPipe } from './components/minute-seconds.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TaskContainerComponent,
    TaskPresenterComponent,
    TaskAddComponent,
    MinuteSecondsPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 25 })
      : [],
    EffectsModule.forRoot([TaskEffects]),
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
