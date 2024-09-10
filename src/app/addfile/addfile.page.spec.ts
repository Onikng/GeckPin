import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddfilePage } from './addfile.page';

describe('AddfilePage', () => {
  let component: AddfilePage;
  let fixture: ComponentFixture<AddfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
