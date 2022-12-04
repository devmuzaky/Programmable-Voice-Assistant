import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptsTableComponent } from './scripts-table.component';

describe('ScriptsTableComponent', () => {
  let component: ScriptsTableComponent;
  let fixture: ComponentFixture<ScriptsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScriptsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScriptsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
