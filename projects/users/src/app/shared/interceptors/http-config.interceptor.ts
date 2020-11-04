import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';
import { ISnackBarData } from '../interfaces/snackbar.interface';

import { environment } from '../../../environments/environment';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  errorData: ISnackBarData = {
    message: 'An error has occurred in the request, please try again later',
    panelClass: ['toast-danger'],
  };

  constructor(
    private notificationService: NotificationService,
    private http: HttpClient
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token: string = localStorage.getItem('access_token');

    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
    }
    //  if (!request.headers.has('Content-Type')) {
    //    request = request.clone({
    //      headers: request.headers.set('Content-Type', 'application/json'),
    //    });
    //  }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error.status);

        //        if (error.status === 401) {
        //          if (error.error.msg === 'Token has expired') {
        //            let params = {
        //              token,
        //              refresh_token: localStorage.getItem('refresh_token'),
        //            };
        //            return this.http
        //              .post(`${environment.baseUrl}/refresh`, params)
        //              .pipe(
        //                mergeMap((data: any) => {
        //                  console.log(data);
        //                  //If reload successful update tokens
        //                  if (data.status == 200) {
        //                    //Update tokens
        //                    localStorage.setItem(
        //                      'access_token',
        //                      data.result.access_token
        //                    );
        //                    localStorage.setItem(
        //                      'refresh_token',
        //                      data.result.refresh_token
        //                    );
        //                    //Clone our fieled request ant try to resend it
        //                    request = request.clone({
        //                      setHeaders: {
        //                        access_token: data.result.access_token,
        //                      },
        //                    });
        //                    return next.handle(request);
        //                  } else {
        //                    //Logout from account
        //                    this.notificationService.notification$.next(this.errorData);
        //                  }
        //                })
        //              );
        //          } else {
        //            //Logout from account or do some other stuff
        //
        //            this.notificationService.notification$.next(this.errorData);
        //          }
        //        }

        let data = {};
        data = {
          reason:
            error && error.error && error.error.reason
              ? error.error.reason
              : '',
          status: error.status,
        };

        this.notificationService.notification$.next(this.errorData);

        return throwError(error);
      })
    );
  }
}
