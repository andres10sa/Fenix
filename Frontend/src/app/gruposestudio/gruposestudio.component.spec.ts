import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposestudioComponent } from './gruposestudio.component';

describe('GruposestudioComponent', () => {
  let component: GruposestudioComponent;
  let fixture: ComponentFixture<GruposestudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GruposestudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposestudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
