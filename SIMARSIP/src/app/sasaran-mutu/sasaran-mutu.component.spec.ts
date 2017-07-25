import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SasaranMutuComponent } from './sasaran-mutu.component';

describe('SasaranMutuComponent', () => {
  let component: SasaranMutuComponent;
  let fixture: ComponentFixture<SasaranMutuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SasaranMutuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SasaranMutuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
