import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisregardoneComponent } from './disregardone.component';

describe('DisregardoneComponent', () => {
  let component: DisregardoneComponent;
  let fixture: ComponentFixture<DisregardoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisregardoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisregardoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
