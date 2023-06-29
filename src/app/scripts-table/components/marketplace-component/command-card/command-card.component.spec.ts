import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandCardComponent } from './command-card.component';

describe('CommandCardComponent', () => {
  let component: CommandCardComponent;
  let fixture: ComponentFixture<CommandCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
