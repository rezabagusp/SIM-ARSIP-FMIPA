import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LampiranComponent } from './lampiran.component';

describe('LampiranComponent', () => {
  let component: LampiranComponent;
  let fixture: ComponentFixture<LampiranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LampiranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LampiranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
