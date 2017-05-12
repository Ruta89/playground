import { Component } from '@angular/core';
import { MapPage } from '../map/map';
import { ListPage } from '../list/list';
import { Navigation } from '../navigation/navigation';
import { GeolocationPage } from '../geolocation/geolocation';

@Component({
  selector: 'page-homemap',
  templateUrl: 'homemap.html'
})
export class HomeMapPage {

  tab1Root: any = MapPage;
  tab2Root: any = ListPage;
  tab3Root: any = Navigation;
  tab4Root: any = GeolocationPage;

  constructor() {

  }

}
