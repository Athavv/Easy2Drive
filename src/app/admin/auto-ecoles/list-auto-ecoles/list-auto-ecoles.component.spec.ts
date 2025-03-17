import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAutoEcolesComponent } from './list-auto-ecoles.component';

describe('ListAutoEcolesComponent', () => {
  let component: ListAutoEcolesComponent;
  let fixture: ComponentFixture<ListAutoEcolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListAutoEcolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAutoEcolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
