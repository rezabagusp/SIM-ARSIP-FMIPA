import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestasiComponent } from './prestasi.component';

describe('PrestasiComponent', () => {
  let component: PrestasiComponent;
  let fixture: ComponentFixture<PrestasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
