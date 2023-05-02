import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicCommandsComponent } from './public-commands.component';

describe('MyCommandsComponent', () => {
  let component: PublicCommandsComponent;
  let fixture: ComponentFixture<PublicCommandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicCommandsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
