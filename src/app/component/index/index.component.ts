import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TourService } from '../../tour.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  tours:any;
  constructor(private http: HttpClient,private tourservice: TourService) { }

  ngOnInit() {
    this.getTours();
  }

  getTours(){
    this.tourservice.getTours().subscribe(res => {
      console.log(res);
      this.tours = res;
    });
  }

  deleteTours(id){
    this.tourservice.deleteTours(id).subscribe(res => {
      console.log(res);
      this.getTours();
    });
  }
}
