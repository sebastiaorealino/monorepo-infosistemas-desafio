import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PageService } from '../page.service';
import { Car, Pageable } from '../shared/models';

@Component({
  selector: 'app-car-list',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {

  cars: Car[] = [];

  constructor(
    public service: PageService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.listCars();
  }

  listCars() {
    this.service.listCars()
      .subscribe((response: Pageable<Car>) => {
        this.cars = response.data;
        console.log(this.cars)
      }, (err) => {
        this.toastr.error('Erro ao carregar lista de carros..');
      })
  }
}
