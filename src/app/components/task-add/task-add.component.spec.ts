import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LogicService } from '../logic.service';
import { TaskAddComponent } from './task-add.component';
import { MatFormFieldModule, MatCardModule, MatInputModule } from '@angular/material';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('TaskAddComponent', () => {
  let component: TaskAddComponent;
  let fixture: ComponentFixture<TaskAddComponent>;
  beforeEach(() => {
    const logicServiceStub = {
      addTask: () => ({}),
      nameExists: () => of({}),
    };
    TestBed.configureTestingModule({
      declarations: [TaskAddComponent],
      providers: [{ provide: LogicService, useValue: logicServiceStub }],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        NoopAnimationsModule
      ],
    });
    fixture = TestBed.createComponent(TaskAddComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('validateNameExists', () => {
    it('makes expected calls', () => {
      const logicServiceStub: LogicService = fixture.debugElement.injector.get(
        LogicService
      );
      jest.spyOn(logicServiceStub, 'nameExists').mockReturnValue(of(true));

      const given = { value: 'hello' } as any;
      component.validateNameExists(given);
      expect(logicServiceStub.nameExists).toHaveBeenCalled();
    });
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(formBuilderStub, 'group');
      component.ngOnInit();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });
  describe('submitHandler', () => {
    it('makes expected calls', () => {
      const logicServiceStub: LogicService = fixture.debugElement.injector.get(
        LogicService
      );
      jest.spyOn(logicServiceStub, 'addTask').mockReturnValue({});
      fixture.detectChanges();
      component.submitHandler('someText');
      expect(logicServiceStub.addTask).toHaveBeenCalled();
    });
  });
});
