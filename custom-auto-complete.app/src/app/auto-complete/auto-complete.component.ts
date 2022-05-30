import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
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
  subject: Subject<any> = new Subject();
  filterdCities:Array<city>
  toHighlight:string = ""; filterCity:string = "";
  isOpenDropDown:boolean = false;


  ngOnInit(): void {

    // Subscribe to the subject, which is triggered with each keyup
    // When the debounce time has passed, we call the api for data
    this.subject.pipe(debounceTime(500)).subscribe(() => {
      if (this.filterCity !== ""){
        this.dataService.getFilterdCities(this.filterCity).subscribe((data: Array<city>) => {
          this.filterdCities = data;
          this.onClickDropDown()
        });
      }}
    );
  }


  onFilterCity(): void{
    if (this.filterCity !== "")
      this.subject.next("");
    else
      this.filterdCities = []
  }

  getHighlightText(city:string): string{
    let highlightText = this.capitalizeFirstLetter(this.filterCity);
    highlightText = city.replaceAll(highlightText,"<b>" + highlightText + "</b>")
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
