import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarEleveComponent } from './sidebar-eleve.component';

describe('SidebarEleveComponent', () => {
  let component: SidebarEleveComponent;
  let fixture: ComponentFixture<SidebarEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarEleveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
