import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceComponent } from './marketplace.component';

describe('ScriptsTableComponent', () => {
  let component: MarketplaceComponent;
  let fixture: ComponentFixture<MarketplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketplaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
