import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {
  foodResources = [
    {
      title: 'The Doorway Project',
      url: 'http://doorwayproject.org/',
      imgPath: '/assets/img/doorway_project.png',
      description: ''
    },
    {
      title: 'Teen Feed',
      url: 'http://www.teenfeed.org/',
      imgPath: '/assets/img/teen_feed.png',
      description: ''
    },
    {
      title: 'Street Youth Ministries',
      url: 'http://www.streetyouthministries.org/',
      imgPath: '/assets/img/street_youth_ministries.png',
      description: ''
    }
  ];
  // map: Microsoft.Maps.Map;

  constructor() { }

  ngOnInit() {
    
  }

}
