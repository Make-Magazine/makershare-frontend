import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerFaireComponent } from './maker-faire.component';

describe('MakerFaireComponent', () => {
  let component: MakerFaireComponent;
  let fixture: ComponentFixture<MakerFaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerFaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerFaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
