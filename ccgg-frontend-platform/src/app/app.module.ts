import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {RouteReuseStrategy, RouterModule} from '@angular/router';
import {AuthService} from './service/auth.service';
import {AppGuard} from './app.guard';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {FooterComponent} from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { QuestionComponent } from './question/question.component';
import { MockInterviewComponent } from './mock-interview/mock-interview.component';
import { ResourcesComponent } from './resources/resources.component';
import { QuestionDetailComponent } from './question/question-detail/question-detail.component';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule, MatInputModule, MatListModule,
  MatMenuModule, MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule, MatSlideToggleModule, MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {QuestionService} from './service/question.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import {AceModule} from 'ngx-ace-wrapper';
import { AddNewQuestionTagComponent } from './admin/add-new-question-tag/add-new-question-tag.component';
import { AddNewQuestionComponent } from './admin/add-new-question/add-new-question.component';
import { ActiveNewUsersComponent } from './admin/active-new-users/active-new-users.component';
import { QuestionTagComponent } from './question/question-tag/question-tag.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CachingInterceptor} from './service/cache-interceptor/caching.interceptor';
import {CacheService} from './service/cache-interceptor/cache.service';
import {QuestionRouteReuse} from './service/route-reuse-strategy/question-route-reuse';
import { UpdateQuestionComponent } from './admin/update-question/update-question.component';
import { AddNewBatchComponent } from './admin/add-new-batch/add-new-batch.component';
import {UserService} from './service/user.service';
import { MockInterviewGeneratorComponent } from './mock-interview/mock-interview-generator/mock-interview-generator.component';
import { QuestionGeneratorComponent } from './mock-interview/mock-interview-generator/question-generator/question-generator.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    QuestionComponent,
    MockInterviewComponent,
    ResourcesComponent,
    QuestionDetailComponent,
    AddNewQuestionTagComponent,
    AddNewQuestionComponent,
    ActiveNewUsersComponent,
    QuestionTagComponent,
    UpdateQuestionComponent,
    AddNewBatchComponent,
    MockInterviewGeneratorComponent,
    QuestionGeneratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    NoopAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTabsModule,
    MatTooltipModule,
    MatTreeModule,
    LMarkdownEditorModule,
    AceModule,
  ],
  providers: [
    AuthService,
    QuestionService,
    UserService,
    AppGuard,
    CacheService,
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: QuestionRouteReuse }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
