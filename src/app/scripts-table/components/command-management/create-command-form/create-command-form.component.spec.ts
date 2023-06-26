import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommandFormComponent } from './create-command-form.component';

describe('CreateCommandFormComponent', () => {
  let component: CreateCommandFormComponent;
  let fixture: ComponentFixture<CreateCommandFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCommandFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCommandFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
