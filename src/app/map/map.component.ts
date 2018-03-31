import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ScriptLoadService } from '../script-load.service';
import { HttpClient } from '@angular/common/http';
import { mapNumber } from '../../assets/functions/mapNumber';
import { styledMap } from '../../assets/mapStylingMaterial/styledMap';
import { customGradient } from '../../assets/mapStylingMaterial/gradient';

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
  lettings: string[];
  masts: string[];

  constructor(private load: ScriptLoadService, private http: HttpClient) {
  }

  ngAfterViewInit(): void {

    this.load.loadScript(url, 'gmap', () => {
      const maps = window['google']['maps'];
      console.log(maps);
      const loc = new maps.LatLng(51.561638, -0.14);

      const darkmap = new maps.StyledMapType(styledMap, { name: 'Dark Map' });

      this.coords = function(x, y) {
        return new maps.LatLng(x, y);
      };

      this.map = new maps.Map(this.mapElm.nativeElement, {
        zoom: 11,
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

      this.map.data.loadGeoJson('assets/lonely.geojson');
      this.map.data.addListener('mouseover', (function(e) {
        this.legend.nativeElement.style.display = 'block';
        this.infoBox.nativeElement.innerText = e.feature.getProperty('PREVALENCE');
      }).bind(this));
      this.map.data.addListener('mouseout', (function(e) {
        this.legend.nativeElement.style.display = 'none';
      }).bind(this));
      this.map.data.setStyle(function(feature) {
        const lon = feature.getProperty('PREVALENCE');
        const value = 255 - Math.round(mapNumber(lon, 0, 5, 0, 255));
        const color = 'rgb(' + value + ',' + value + ',' + 0 + ')';
        return {
          fillColor: color,
          strokeWeight: 1
        };
      });

      const antenna = new maps.MarkerImage('assets/antennabl.png',
        null,
        null,
        null,
        new maps.Size(25, 40)
      );

      this.http.get('assets/masts.json').subscribe(data => {
        this.masts = data['data'];
        console.log(this.masts[0][17]); // longitude
        console.log(this.masts[0][18]); // latitude

        this.masts.map(x => {
          new maps.Marker({
            position: new maps.LatLng(x[18], x[17]),
            icon: antenna,
            // map: this.map
          });
        });
      });
    });
  }


}
