import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PalabrasClaveComponent } from './palabras-clave.component';

describe('PalabrasClaveComponent', () => {
  let component: PalabrasClaveComponent;
  let fixture: ComponentFixture<PalabrasClaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PalabrasClaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PalabrasClaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
