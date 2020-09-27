import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  formGroup: FormGroup;
  fieldTextType: boolean;
  departments = ['administrator', 'user', 'demo'];
  privileges = ['read', 'write', 'delete', 'user manager'];
  statusList = ['active', 'inactive', 'delete'];
  userTypes = ['develop tem and testing', 'other'];
  selectedDepartment: string[];
  selectedUserType: string;
  selectedStatus: string;
  selectedPrivileges: string[];

  constructor(
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(20),
          ],
        ],
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(100),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [Validators.required, Validators.pattern('^(?=.*[0-9])|(?=.{6,})')],
        ],
        confirmPassword: ['', [Validators.required]],
        userType: ['', [Validators.required]],
        departments: [[], [Validators.required]],
        privileges: [[]],
        status: [true, [Validators.required]],
      },
      { validator: this.mustMatch('password', 'confirmPassword') }
    );
  }

  private getDepartments() {}

  // custom validator to check that two fields match
  private mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  public toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  onSubmit(data: IUser) {
    // data.status = this.selectedStatus;

    console.log(data);
  }
}
