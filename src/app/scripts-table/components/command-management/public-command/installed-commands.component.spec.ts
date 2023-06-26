import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstalledCommandsComponent } from './installed-commands.component';

describe('MyCommandsComponent', () => {
  let component: InstalledCommandsComponent;
  let fixture: ComponentFixture<InstalledCommandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstalledCommandsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstalledCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
