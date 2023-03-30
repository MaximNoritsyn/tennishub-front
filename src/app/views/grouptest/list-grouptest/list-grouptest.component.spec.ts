/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListGrouptestComponent } from './list-grouptest.component';

describe('ListGrouptestComponent', () => {
  let component: ListGrouptestComponent;
  let fixture: ComponentFixture<ListGrouptestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGrouptestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGrouptestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
