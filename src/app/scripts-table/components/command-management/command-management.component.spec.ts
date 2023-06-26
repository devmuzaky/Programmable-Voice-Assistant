import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandManagement } from './command-management.component';

describe('CommandsTableComponentComponent', () => {
  let component: CommandManagement;
  let fixture: ComponentFixture<CommandManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandManagement ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CommandManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
