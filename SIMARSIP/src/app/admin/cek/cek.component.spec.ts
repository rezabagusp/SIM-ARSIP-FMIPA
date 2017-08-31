import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CekComponent } from './cek.component';

describe('CekComponent', () => {
  let component: CekComponent;
  let fixture: ComponentFixture<CekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
