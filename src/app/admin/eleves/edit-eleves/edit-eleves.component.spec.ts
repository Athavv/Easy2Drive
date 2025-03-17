import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditElevesComponent } from './edit-eleves.component';

describe('EditElevesComponent', () => {
  let component: EditElevesComponent;
  let fixture: ComponentFixture<EditElevesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditElevesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditElevesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
