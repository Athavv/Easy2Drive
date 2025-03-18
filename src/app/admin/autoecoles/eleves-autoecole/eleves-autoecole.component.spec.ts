import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevesAutoecoleComponent } from './eleves-autoecole.component';

describe('ElevesAutoecoleComponent', () => {
  let component: ElevesAutoecoleComponent;
  let fixture: ComponentFixture<ElevesAutoecoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElevesAutoecoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElevesAutoecoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
