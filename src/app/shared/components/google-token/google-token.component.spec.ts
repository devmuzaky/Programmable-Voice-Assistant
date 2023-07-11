import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleTokenComponent } from './google-token.component';

describe('GoogleTokenComponent', () => {
  let component: GoogleTokenComponent;
  let fixture: ComponentFixture<GoogleTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleTokenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
