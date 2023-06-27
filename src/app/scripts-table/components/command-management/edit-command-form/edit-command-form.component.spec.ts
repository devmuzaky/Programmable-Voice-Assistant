import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommandFormComponent } from './edit-command-form.component';

describe('EditCommandFormComponent', () => {
  let component: EditCommandFormComponent;
  let fixture: ComponentFixture<EditCommandFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCommandFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCommandFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
