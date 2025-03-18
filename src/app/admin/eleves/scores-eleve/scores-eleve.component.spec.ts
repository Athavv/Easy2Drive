import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoresEleveComponent } from './scores-eleve.component';

describe('ScoresEleveComponent', () => {
  let component: ScoresEleveComponent;
  let fixture: ComponentFixture<ScoresEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScoresEleveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoresEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
