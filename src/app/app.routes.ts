import { Routes } from '@angular/router';
import { Syllabus } from './partials/syllabus/syllabus';

export const routes: Routes = [
    {path: "syllabus", component: Syllabus},
    {path: "", redirectTo: "syllabus", pathMatch: "full"}
];
