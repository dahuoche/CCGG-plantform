import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from './auth/login/login.component';
import {AppGuard} from './app.guard';
import {RegisterComponent} from './auth/register/register.component';
import {HomeComponent} from './home/home.component';
import {QuestionComponent} from './question/question.component';
import {ResourcesComponent} from './resources/resources.component';
import {MockInterviewComponent} from './mock-interview/mock-interview.component';
import {QuestionDetailComponent} from './question/question-detail/question-detail.component';
import {ActiveNewUsersComponent} from './admin/active-new-users/active-new-users.component';
import {AddNewQuestionComponent} from './admin/add-new-question/add-new-question.component';
import {AddNewQuestionTagComponent} from './admin/add-new-question-tag/add-new-question-tag.component';
import {UpdateQuestionComponent} from './admin/update-question/update-question.component';
import {AddNewBatchComponent} from './admin/add-new-batch/add-new-batch.component';
import {MockInterviewGeneratorComponent} from './mock-interview/mock-interview-generator/mock-interview-generator.component';

// @ts-ignore
const routes: Routes = [
  {
    path: '',
    canActivate: [AppGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'questions',
        component: QuestionComponent
      },
      {
        path: 'questions/detail/:id',
        component: QuestionDetailComponent
      },
      {
        path: 'resources',
        component: ResourcesComponent
      },
      {
        path: 'ccgg-review',
        component: ResourcesComponent
      },
      {
        path: 'mocks',
        component: MockInterviewComponent
      },
      {
        path: 'admin/add/users',
        component: ActiveNewUsersComponent
      },
      {
        path: 'admin/add/questions',
        component: AddNewQuestionComponent
      },
      {
        path: 'admin/add/questions/tags',
        component: AddNewQuestionTagComponent
      },
      {
        path: 'admin/add/batch',
        component: AddNewBatchComponent
      },
      {
        path: 'admin/update/question/:id',
        component: UpdateQuestionComponent
      },
      {
        path: 'admin/add/mock-interview',
        component: MockInterviewGeneratorComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
