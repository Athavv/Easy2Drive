import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAutoecolesComponent } from './list-autoecoles.component';

describe('ListAutoecolesComponent', () => {
  let component: ListAutoecolesComponent;
  let fixture: ComponentFixture<ListAutoecolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListAutoecolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAutoecolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
