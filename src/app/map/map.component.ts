import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ScriptLoadService } from '../script-load.service';
import { styledMap } from '../../assets/mapStylingMaterial/styledMap';

const your_API_key = 'AIzaSyAwVnwE1bEZf_Bkk_pSkGM0XlBSXJocVUY';
const url = 'https://maps.googleapis.com/maps/api/js?key=' + your_API_key + '&libraries=visualization';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  @ViewChild('mapElement') mapElm: ElementRef;
  @ViewChild('legend') legend: ElementRef;
  @ViewChild('info') infoBox: ElementRef;

  private map: any;
  private coords: any;
  private infowindow: any;
  lettings: string[];
  masts: string[];

  constructor(private load: ScriptLoadService) {
  }

  ngAfterViewInit(): void {

    this.load.loadScript(url, 'gmap', () => {
      const maps = window['google']['maps'];
      console.log(maps);
      const loc = new maps.LatLng(37.970775, 23.760588);

      const darkmap = new maps.StyledMapType(styledMap, { name: 'Dark Map' });

      this.coords = function(x, y) {
        return new maps.LatLng(x, y);
      };

      this.map = new maps.Map(this.mapElm.nativeElement, {
        zoom: 7,
        center: loc,
        scrollwheel: true,
        panControl: false,
        mapTypeControl: false,
        zoomControl: true,
        streetViewControl: false,
        scaleControl: true,
        zoomControlOptions: {
          style: maps.ZoomControlStyle.LARGE,
          position: maps.ControlPosition.RIGHT_BOTTOM
        }
      });
      this.map.mapTypes.set('dark_map', darkmap);
      this.map.setMapTypeId('dark_map');

      const locControl = document.getElementById('location-buttons');
      this.map.controls[maps.ControlPosition.TOP_CENTER].push(locControl);


      this.map.data.loadGeoJson('assets/tents.geojson');
      this.map.data.addListener('click', (function(e) {
        this.infowindow.setPosition(e.feature.getGeometry().get());
        this.infowindow.setContent(`<div class="overlay"><p><b>ID Skinis:</b> ${e.feature.getProperty('id')}</p>
        <p><b>Perigrafi:</b> ${e.feature.getProperty('description')}</p>
        <p><b>Timi (low season</b> ${e.feature.getProperty('price')} EUR /night</p>
        <p><b>Timi (high season)</b> ${e.feature.getProperty('high-price')}  EUR /night</p></div>
        `)
        this.infowindow.open(this.map);
      }).bind(this));

      this.map.data.setStyle(function(feature) {
        let icon = new maps.MarkerImage('assets/tent.png',
          null,
          null,
          null,
          new maps.Size(25, 25)
        );
        return /** @type {google.maps.Data.StyleOptions} */({
          icon: icon
        });
      });

      this.infowindow = new maps.InfoWindow();

    });
  }


}
