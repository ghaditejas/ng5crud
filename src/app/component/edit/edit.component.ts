import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from '../../tour.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  tour :any;
  title = 'Edit Tour Location';
  tourForm: FormGroup;
  constructor(private route: ActivatedRoute, private router: Router,private tourservice: TourService, private fb: FormBuilder) {
    this.createForm();
   }

  createForm(){
    this.tourForm = this.fb.group({
      location: ['', Validators.required],
      cost: ['', Validators.required]
   });
  }

  updateTour() {
    this.route.params.subscribe(params => {
      this.tourservice.updateCoin(this.tourForm, params['id']);
    })
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tour = this.tourservice.getTourDetails(params['id']).subscribe(res => {
        console.log(res);
        this.tour = res[0];
      });
    });
  }
}
