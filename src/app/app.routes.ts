import { Routes } from '@angular/router';
import { BookCatalogComponent } from './pages/book-catalog/book-catalog.component';
import { FormBookCatalogComponent } from './pages/book-catalog/form-book-catalog/form-book-catalog.component';
import { MembersComponent } from './pages/members/members.component';
import { FormMemberComponent } from './pages/members/form-member/form-member.component';

export const routes: Routes = [
  {
    path: 'book-catalog',
    component: BookCatalogComponent,
  },
  {
    path: '',
    redirectTo: '/book-catalog',
    pathMatch: 'full',
  },
  {
    path:'members',
    component: MembersComponent
  },
  {
    path:'book-catalog/add-book',
    component: FormBookCatalogComponent
  },
  {
    path:'book-catalog/edit',
    component: FormBookCatalogComponent
  },
  {
    path: 'members/add-member',
    component: FormMemberComponent
  },
  {
    path: 'members/edit',
    component: FormMemberComponent
  }
];
