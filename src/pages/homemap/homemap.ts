import { Component } from '@angular/core';
import { MapPage } from '../map/map';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-homemap',
  templateUrl: 'homemap.html'
})
export class HomeMapPage {

  tab1Root: any = MapPage;
  tab2Root: any = ListPage;

  constructor() {

  }

}
