import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {QuestionService} from '../../service/question.service';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-add-new-batch',
  templateUrl: './add-new-batch.component.html',
  styleUrls: ['./add-new-batch.component.css']
})
export class AddNewBatchComponent implements OnInit {

  @ViewChild('BForm') newBForm: NgForm;

  style = ['', ''];
  warnings = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.GetUserBatches().subscribe((res) => {
      // console.log(res);
    });
  }

  AddNewBatch() {
    let valid = true;
    // const border = 'border: 1px solid red; border-style: outset; border-radius: 10px' ;
    if (this.newBForm.value.focus === '') {
      this.style[0] = '1px solid red';
      this.warnings[0] = 'Batch Focus';
      valid = false;
    } else {this.style[0] = ''; this.warnings[0] = ''; }
    if (this.newBForm.value.batch === '') {
      this.style[1] = '1px solid red';
      this.warnings[1] = 'Batch Date';
      valid = false;
    } else {this.style[1] = ''; this.warnings[0] = ''; }
    if (this.newBForm.value.trainer === '') {
      this.style[2] = '1px solid red';
      this.warnings[2] = 'Batch trainer';
      valid = false;
    } else {this.style[2] = ''; this.warnings[0] = ''; }
    if (valid === true) {
      this.userService.AddNewBatch(this.newBForm.value)
        .subscribe((res) => {
        alert('Successfully' + res['success']);
      });
    } else {
      alert('unsuccessfully');
    }
  }

  clear() {
  }
}
