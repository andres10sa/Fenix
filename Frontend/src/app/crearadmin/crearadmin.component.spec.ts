import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearadminComponent } from './crearadmin.component';

describe('CrearadminComponent', () => {
  let component: CrearadminComponent;
  let fixture: ComponentFixture<CrearadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
