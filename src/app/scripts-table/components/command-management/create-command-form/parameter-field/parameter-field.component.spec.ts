import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterFieldComponent } from './parameter-field.component';

describe('ParameterFieldComponent', () => {
  let component: ParameterFieldComponent;
  let fixture: ComponentFixture<ParameterFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParameterFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParameterFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
