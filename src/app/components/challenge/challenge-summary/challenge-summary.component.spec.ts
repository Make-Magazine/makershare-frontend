import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeSummaryComponent } from './challenge-summary.component';

describe('ChallengeSummaryComponent', () => {
  let component: ChallengeSummaryComponent;
  let fixture: ComponentFixture<ChallengeSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
