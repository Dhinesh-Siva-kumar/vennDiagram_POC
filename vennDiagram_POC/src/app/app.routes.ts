import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadComponent: () => import('./venn-diagram/venn-diagram.component').then(mod => mod.VennDiagramComponent)},
];
