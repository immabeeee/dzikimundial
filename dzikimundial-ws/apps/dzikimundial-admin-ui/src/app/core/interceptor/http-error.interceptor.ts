import { Injectable } from '@angular/core'
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr'

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error:', error)
        let errorMsg = ''
        if (error.error instanceof ErrorEvent) {
          console.log('This is client side error')
          errorMsg = `Error: ${error.error.message}`
        } else {
          if (error.error && error.error.message) {
            errorMsg = `Error Code: ${error.status},  Message: ${
              typeof error.error.message === 'string' ? error.error.message : error.error.message.join(', ')
            }`
          } else {
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`
          }
        }
        console.log(errorMsg)
        this.toastr.error(errorMsg, 'Ooups 😮')
        return throwError(errorMsg)
      }),
    )
  }
}
