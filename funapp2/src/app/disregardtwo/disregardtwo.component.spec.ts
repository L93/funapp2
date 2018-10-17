import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisregardtwoComponent } from './disregardtwo.component';

describe('DisregardtwoComponent', () => {
  let component: DisregardtwoComponent;
  let fixture: ComponentFixture<DisregardtwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisregardtwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisregardtwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
