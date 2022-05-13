import { Component, Input, OnInit } from '@angular/core';
import { city } from '../models/city.model';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.scss']
})
export class CityDetailsComponent implements OnInit {

  constructor() { }
  @Input() cityInject:city;

  ngOnInit(): void {
  }

}
