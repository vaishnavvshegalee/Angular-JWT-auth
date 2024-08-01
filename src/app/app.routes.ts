import { Routes } from '@angular/router';
import { LayoutComponent } from './Layout/layout/layout.component';
import { DahsboardComponent } from './Pages/dahsboard/dahsboard.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
    {
        path: '', component: LayoutComponent, children: [
            { path: '', redirectTo: "dashboard", pathMatch: 'full' },
            { path: 'dashboard', canActivate: [authGuard], component: DahsboardComponent },
            { path: 'login', canActivate: [guestGuard], component: LoginComponent },
            { path: 'register', canActivate: [guestGuard], component: RegisterComponent },
        ]
    }
];
