import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Notice } from './model/notice.model';

@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.component.html',
  styleUrls: ['./notice-list.component.scss']
})
export class NoticeListComponent implements OnInit {
  public form: FormGroup;
  public isLoading: boolean;
  public notices: Notice[];
  private closeResult = '';

  public createForm: FormGroup;
  public updateForm: FormGroup;
  public deleteNotice: string;

  constructor(private _fb: FormBuilder, private _router: Router, private _route: ActivatedRoute,
    private _modalService: NgbModal) {
    this.form = this._fb.group({
      'pageSize': ['10'],
      'paymentId': [''],
      'isActive': [''],
      'occupationId': [''],
    });
    this.createForm = this._fb.group({
      'occupationId': ['', Validators.required],
      'vacatingOn': ['', Validators.required],
      'notifiedOn': ['', Validators.required],
    });
    this.updateForm = this._fb.group({
      'id': [''],
      'isActive': ['', Validators.required],
      'vacatingOn': ['', Validators.required],
      'notifiedOn': ['', Validators.required],
    });
    this.deleteNotice = 'WERD12R5667';
    this.isLoading = false;
    let today: Date = new Date;
    let notice = new Notice("1", true ,today, today, '1', today, '', today, '');
    this.notices = [notice];
   }

  ngOnInit(): void {
  }

  private open(content: any) {
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public create(form: FormGroup) {

  }

  public update(form: FormGroup) {

  }
}
