import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAutoEcolesComponent } from './add-auto-ecoles.component';

describe('AddAutoEcolesComponent', () => {
  let component: AddAutoEcolesComponent;
  let fixture: ComponentFixture<AddAutoEcolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAutoEcolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAutoEcolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
