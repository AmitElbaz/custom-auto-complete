import { Component, Input } from '@angular/core';
import { city } from './models/city.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'custom-auto-complete';
  @Input() selectedCity:city;

  setSelectedCity(selectedCity:city) {
    this.selectedCity = selectedCity;
  }

}
