import { Component, OnInit, Input } from '@angular/core';
import { Image } from '../../models/image';
import { ImageService } from '../../services/image.service';
import {Observable} from 'rxjs/Rx';
@Component({
  selector: 'ng-image-list',
  templateUrl: './image-list.component.html',
  styles: []
})
export class ImageListComponent implements OnInit {
  image: Image;
  images:Image[]=[];
  selectedImage: Image;
  registryTemp: string;
  cityNames: object[] = [];

  constructor(private imageService:ImageService) {
    this.cityNames = [{name:'Santiago',src:'../../assets/img/chile.jpg'},   {name:'Buenos Aires',src:'../../assets/img/buenos-aires.jpg'},   {name:'Lima',src:'../../assets/img/lima.jpg'},   {name:'Sao Paulo',src:'../../assets/img/sao-paulo.jpg'}];
  }

  ngOnInit() {
     this.getCities(this.cityNames);
     Observable.interval(3000 * 60).subscribe(x => {
     this.images=[];
     this.getCities(this.cityNames);
  });

  }

  getCities(cityNames){
    cityNames.forEach((item) => {
            this.imageService.getCityByName(item.name).subscribe(data => {
            this.imageService.saveLocalStorageTemperatures(data.name,data.main.temp);
            this.registryTemp=this.imageService.getLocalStorageTemperatures();
            this.image=new Image(data.id, data.name, data.main.temp, item.src, data.weather[0].icon);
            this.images.push(this.image);
          });
      });
}

  onSelect(image: Image){
    this.selectedImage = image;
    this.registryTemp=this.imageService.getLocalStorageTemperatures();
  }


  }

