import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Apartment } from '../model/apartment.model';

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.scss']
})
export class ApartmentListComponent implements OnInit {

  public form: FormGroup;
  public createForm: FormGroup;
  public updateForm: FormGroup;
  public isLoading: boolean;
  public apartments: Apartment[];
  public deleteApartmentName: string;
  private closeResult = '';

  constructor(private _fb: FormBuilder, private _modalService: NgbModal) {
    this.form = this._fb.group({
      'pageSize': ['10'],
      'name': []
    });
    this.createForm = this._fb.group({
      'name': ['', Validators.required],
    });
    this.updateForm = this._fb.group({
      'name': ['', Validators.required],
    });
    this.isLoading = false;
    let today = new Date();
    this.apartments = [new Apartment("1", "NEW HEAVEN", today, '', today, '')];
    this.deleteApartmentName = 'NEW HEAVEN';
   }

  ngOnInit(): void {
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  open(content: any) {
    this._modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openCreate(content: any) {
    this.open(content);
  }

  openEdit(roleId: string | undefined, content: any) {
    this.open(content);
  }

  openDelete(roleId: string | undefined, content: any) {
    this.open(content);
  }

  public create(form: FormGroup) {

  }

  public update(form: FormGroup) {

  }
}
