/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GsaComponent } from './gsa.component';

describe('GsaComponent', () => {
  let component: GsaComponent;
  let fixture: ComponentFixture<GsaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GsaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
