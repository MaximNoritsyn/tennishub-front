/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GsdVdComponent } from './gsd-vd.component';

describe('GsdVdComponent', () => {
  let component: GsdVdComponent;
  let fixture: ComponentFixture<GsdVdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GsdVdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GsdVdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
