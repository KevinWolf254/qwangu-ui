import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public isTogglerActive: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public toggleIsActive() {
    this.isTogglerActive = !this.isTogglerActive;
  }

}
