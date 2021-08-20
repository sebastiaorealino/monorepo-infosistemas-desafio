import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CAR_URL } from '../config/settings';
import { Car, Pageable } from './shared/models';


@Injectable({ providedIn: 'root' })
export class PageService {

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
  ) { }

  listCars(): Observable<Pageable<Car>> {
    this.spinner.show();
    return this.http.get<Pageable<Car>>(CAR_URL)
      .pipe(finalize(() => this.spinner.hide()));
  }

  postCar(car: Car): Observable<Pageable<Car>> {
    this.spinner.show();
    return this.http.post<Pageable<Car>>(`${CAR_URL}`, car)
      .pipe(finalize(() => this.spinner.hide()));
  }
}
