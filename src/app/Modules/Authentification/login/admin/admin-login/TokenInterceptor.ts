import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import {AuthService} from "../../../../../services/auth.service";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import { MessageService } from 'primeng/api';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(public authService: AuthService,private router: Router,private toast:NgToastService,private messageService : MessageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

        if (this.authService.getJwtToken()) {
            request = this.addToken(request, this.authService.getJwtToken());
        }

        return next.handle(request).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                return
            } else {
                return throwError(error);
            }
        }));
       
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });
    }


}
