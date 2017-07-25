import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetensiSuratComponent } from './retensi-surat.component';

describe('RetensiSuratComponent', () => {
  let component: RetensiSuratComponent;
  let fixture: ComponentFixture<RetensiSuratComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetensiSuratComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetensiSuratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
