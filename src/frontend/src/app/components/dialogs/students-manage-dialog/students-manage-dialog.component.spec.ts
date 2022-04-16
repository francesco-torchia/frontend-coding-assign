import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsManageDialogComponent } from './students-manage-dialog.component';

describe('StudentsManageDialogComponent', () => {
  let component: StudentsManageDialogComponent;
  let fixture: ComponentFixture<StudentsManageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsManageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsManageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
