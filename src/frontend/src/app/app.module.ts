import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule }   from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SplitPipe } from './pipes/split.pipe';
import { StudentComponent } from './components/dashboard/student/student.component';
import { TeacherComponent } from './components/dashboard/teacher/teacher.component';
import { AdminComponent } from './components/dashboard/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { CourseEditDialogComponent } from './components/dialogs/course-edit-dialog/course-edit-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { StudentsManageDialogComponent } from './components/dialogs/students-manage-dialog/students-manage-dialog.component';
import { DummyCardComponent } from './components/cards/dummy-card/dummy-card.component';
import { CoursesManageComponent } from './components/cards/courses-manage/courses-manage.component';
import { CoursesEnrolmentComponent } from './components/cards/courses-enrolment/courses-enrolment.component';
import { StudentsManageComponent } from './components/cards/students-manage/students-manage.component';
import { ProfileDialogComponent } from './components/dialogs/profile-dialog/profile-dialog.component';
import { ErrorHandlerInterceptor } from './services/error-handler.interceptor';
import { ErrorDialogComponent } from './components/dialogs/error-dialog/error-dialog.component';

// Required during AOT compilation
export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SplitPipe,
    DashboardComponent,
    StudentComponent,
    TeacherComponent,
    AdminComponent,
    DummyCardComponent,
    CoursesManageComponent,
    CoursesEnrolmentComponent,
    CourseEditDialogComponent,
    ConfirmDialogComponent,
    StudentsManageComponent,
    CoursesManageComponent,
    CoursesEnrolmentComponent,
    StudentsManageDialogComponent,
    ProfileDialogComponent,
    ErrorDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatRadioModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
