import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevistasPrestamoComponent } from './revistas-prestamo.component';

describe('RevistasPrestamoComponent', () => {
  let component: RevistasPrestamoComponent;
  let fixture: ComponentFixture<RevistasPrestamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevistasPrestamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevistasPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
