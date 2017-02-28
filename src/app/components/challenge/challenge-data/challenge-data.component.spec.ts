import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeDataComponent } from './challenge-data.component';

describe('ChallengeDataComponent', () => {
  let component: ChallengeDataComponent;
  let fixture: ComponentFixture<ChallengeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
