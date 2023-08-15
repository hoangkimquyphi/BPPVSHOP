import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { IReview, Review } from '../class/IReview';
import { AuthServiceService } from './auth.service.service';

@Injectable({
  providedIn: 'root'
})

export class ReviewService {
  averageRating = 0;

  constructor(private http: HttpClient,private authService:AuthServiceService) { }
  getCurrentUserId(): Observable<any> {
    return this.http.get(`http://localhost:4000/api/user`).pipe(
      map((user: any) => user.id)
    );
  }
  getReviewsByProductId(productId: number): Observable<Review[]> {
    // return this.http.get<IReview[]>(`http://localhost:4000/api/reviews/${productId}/reviews`);
    const url = `http://localhost:4000/api/reviews/${productId}`;
    return this.http.get<Review[]>(url);

  }







  saveProductReview(review: any, productId: number): Observable<any> {
    // review.productId = productId;
    // const token = this.authService.getToken();
    const token = localStorage.getItem('access_token');
    let headers = new Headers();
    this.createTokenizeHeader(headers,token)
    console.log(token)
    if (token) {
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
      console.log(headers)

      return this.http.post<any>(`http://localhost:4000/api/reviews/${productId}`, { headers, observe: 'response' });
    }
    return of(null);
  }
  createTokenizeHeader(headers: Headers,token:any) {
    headers.append('Token', token);
  }

}
