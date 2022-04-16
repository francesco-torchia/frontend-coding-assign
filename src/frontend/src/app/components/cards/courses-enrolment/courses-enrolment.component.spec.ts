import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesEnrolmentComponent } from './courses-enrolment.component';

describe('CoursesEnrolmentComponent', () => {
  let component: CoursesEnrolmentComponent;
  let fixture: ComponentFixture<CoursesEnrolmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesEnrolmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesEnrolmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
