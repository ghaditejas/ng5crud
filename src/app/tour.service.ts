import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import 'rxjs/add/operator/map';

@Injectable()
export class TourService {

  constructor(private http: HttpClient,private router: Router) { }

  addTour(tourForm){
    const uri = 'http://localhost:8000/add_tour';
    const obj = {
      location: tourForm.controls['location'].value,
      cost: tourForm.controls['cost'].value,
    };
    this.http.post(uri, obj)
        .subscribe(res => {
            if(res['error']){
              this.router.navigate(['/create']);
            }else{
              this.router.navigate(['/index']);
            }
            
        });
    }

    getTours(){
      const uri = 'http://localhost:8000/tours';
      return this.http.get(uri).map(res => {
        return res['data'];
      });
    }

    deleteTours(id){
      const uri = 'http://localhost:8000/delete_tour/'+id;
      return this.http.delete(uri).map(res => {
        return true
      });
    }

    getTourDetails(id){
      const uri = 'http://localhost:8000/tour/'+id;
      return this.http.get(uri).map(res => {
        return res['data'];
      });
    }

    updateCoin(tourForm,id){
      const uri = 'http://localhost:8000/update_tour/'+id;
      const obj = {
        location: tourForm.controls['location'].value,
        cost: tourForm.controls['cost'].value,
      };
      this.http.put(uri, obj)
        .subscribe(res => {
            if(res['error']){
              this.router.navigate(['/create']);
            }else{
              this.router.navigate(['/index']);
            }
            
        });
    }
  }
