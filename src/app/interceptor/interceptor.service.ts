import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  private cache = new Map<string, { response: HttpResponse<any>, expiry: number }>();
  private cacheDuration = 30000; // Cache duration in milliseconds (30 seconds)

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next.handle(req); // Proceed without caching
    }

    const cachedResponse = this.cache.get(req.url);

    // Check if cache is available and not expired
    if (cachedResponse && (Date.now() < cachedResponse.expiry)) {
      // Return the cached response
      return of(cachedResponse.response.clone());
    }

    // If cache doesn't exist or expired, send the request to the server
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // Cache the response with expiry time
          this.cache.set(req.url, { response: event, expiry: Date.now() + this.cacheDuration });
        }
      })
    );
  }
}