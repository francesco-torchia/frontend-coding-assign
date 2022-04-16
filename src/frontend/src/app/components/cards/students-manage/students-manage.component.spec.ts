import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsManageComponent } from './students-manage.component';

describe('StudentsManageComponent', () => {
  let component: StudentsManageComponent;
  let fixture: ComponentFixture<StudentsManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
