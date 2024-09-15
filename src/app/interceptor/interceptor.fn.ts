import { HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

// Define the interceptor function
export const cacheInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const cache = new Map<string, { response: HttpResponse<any>, expiry: number }>();
  const cacheDuration = 30000; // Cache duration in milliseconds (30 seconds)

  // Only cache GET requests
  if (req.method !== 'GET') {
    return next(req); // Proceed without caching
  }

  const cachedResponse = cache.get(req.url);

  // Check if cache is available and not expired
  if (cachedResponse && (Date.now() < cachedResponse.expiry)) {
    // Return the cached response
    return of(cachedResponse.response.clone());
  }

  

  // If cache doesn't exist or expired, send the request to the server
  return next(req).pipe(
    tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // Cache the response with expiry time
        cache.set(req.url, { response: event, expiry: Date.now() + cacheDuration });
      }
    })
  );

  
};
