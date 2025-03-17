import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAutoEcolesComponent } from './edit-auto-ecoles.component';

describe('EditAutoEcolesComponent', () => {
  let component: EditAutoEcolesComponent;
  let fixture: ComponentFixture<EditAutoEcolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAutoEcolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAutoEcolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
