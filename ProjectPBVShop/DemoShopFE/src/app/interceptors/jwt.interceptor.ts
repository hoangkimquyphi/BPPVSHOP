import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthServiceService } from '../_service/auth.service.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authServiceService: AuthServiceService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authServiceService.isLoggedIn().pipe(switchMap((isLoggedIn): Observable<HttpEvent<any>> => {
            // const isApiUrl = request.url.startsWith(environment.apiUrl);
            if (isLoggedIn) {
                request = request.clone({
                    setHeaders: { Authorization: `Bearer ${this.authServiceService.getToken()}` }
                });
            }
    
            return next.handle(request);
        }))
    }
}