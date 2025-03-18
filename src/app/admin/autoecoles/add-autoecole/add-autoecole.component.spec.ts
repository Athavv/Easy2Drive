import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAutoecoleComponent } from './add-autoecole.component';

describe('AddAutoecoleComponent', () => {
  let component: AddAutoecoleComponent;
  let fixture: ComponentFixture<AddAutoecoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAutoecoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAutoecoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
