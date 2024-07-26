import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./page/page-home/page-home.component').then(m => m.PageHomeComponent),
                title: 'Inicio'
            },
            {
                path: 'home',
                loadComponent: () => import('./page/page-home/page-home.component').then(m => m.PageHomeComponent),
                title: 'Inicio'
            },
            {
                path: 'pdv',
                loadComponent: () => import('./page/page-pdv/page-pdv.component').then(m => m.PagePdvComponent),
                title: 'Pdv'
            },
            {
                path: 'products',
                loadComponent: () => import('./page/page-products/page-products.component').then(m => m.PageProductsComponent),
                title: 'Produtos'
            },
            {
                path: 'flux-control',
                loadComponent: () => import('./page/page-flux-control/page-flux-control.component').then(m => m.PageFluxControlComponent),
                title: 'Controle de Fluxo'
            },
            {
                path: 'about',
                loadComponent: () => import('./page/page-about/page-about.component').then(m => m.PageAboutComponent),
                title: 'Sobre'
            }
        ],      
    },
    { path: '**', redirectTo: 'home' }	
];