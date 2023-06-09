/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ServeComponent } from './serve.component';

describe('ServeComponent', () => {
  let component: ServeComponent;
  let fixture: ComponentFixture<ServeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
