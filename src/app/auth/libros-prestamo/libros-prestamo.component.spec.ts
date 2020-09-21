import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosPrestamoComponent } from './libros-prestamo.component';

describe('LibrosPrestamoComponent', () => {
  let component: LibrosPrestamoComponent;
  let fixture: ComponentFixture<LibrosPrestamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrosPrestamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrosPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
