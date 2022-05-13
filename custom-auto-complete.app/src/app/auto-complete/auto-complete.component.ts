import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { city } from '../models/city.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {

  constructor(private dataService:DataService) { }

  @Output() emitCity = new EventEmitter<city>();
  filterdCities:Array<city>
  toHighlight:string = ""; filterCity:string = "";
  isOpenDropDown:boolean = false;
  time: number = 0;
  interval;

  ngOnInit(): void {
  }

  onFilterCity(): void{
    if (this.filterCity !== ""){
      if (this.time < 1)
        this.startTimer()
      else
        this.resetTimer()
    }
    else
      this.filterdCities = []
  }

  getHighlightText(city:string): string{
    let highlightText = city.replaceAll(this.capitalizeFirstLetter(this.filterCity),"<b>" + this.capitalizeFirstLetter(this.filterCity) + "</b>")
    return highlightText;
  }

  onSelectCity(selectedCity:city): void{
    this.isOpenDropDown = false
    this.filterCity = selectedCity.name
    this.emitCity.emit(selectedCity);
  }

  onClickDropDown(): void{
    if (this.filterCity === "")
      this.isOpenDropDown = false

    if (this.filterCity !== "" && this.filterdCities.length > 0)
      this.isOpenDropDown = true
    else
      this.isOpenDropDown = false
  } 

  onClickOutside(event): void{
    if(event.target.id === "warper")
      this.isOpenDropDown = false
  }



  private startTimer() {
   this.resetTimer()
    this.interval = setInterval(() => {

      if (this.time >= 0)
        this.time++;

      if (this.time > 1){
        this.resetTimer()
        this.dataService.getFilterdCities(this.filterCity).subscribe((data: Array<city>) => {
          this.filterdCities = data;
          this.onClickDropDown()
        });
      }

    }, 400);
  }


  private resetTimer() {
    this.time = 0
    clearInterval(this.interval);
  }

  private capitalizeFirstLetter(str:string){
    if (str.includes(" ")){
      let strArr: Array<string> = str.split(" ")
      strArr.forEach( (s,index) =>
        strArr[index] = s.charAt(0).toLocaleUpperCase() + s.substring(1).toLowerCase()
      )
      return strArr.join(" ")
    }
    else
      return str.charAt(0).toLocaleUpperCase() + str.substring(1).toLowerCase()
  }

}
