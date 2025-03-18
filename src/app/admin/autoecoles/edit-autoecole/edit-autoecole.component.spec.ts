import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAutoecoleComponent } from './edit-autoecole.component';

describe('EditAutoecoleComponent', () => {
  let component: EditAutoecoleComponent;
  let fixture: ComponentFixture<EditAutoecoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAutoecoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAutoecoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
