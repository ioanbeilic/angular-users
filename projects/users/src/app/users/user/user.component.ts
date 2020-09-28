import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISnackBarData } from '../../shared/interfaces/snackbar.interface';
import { IUser } from '../../shared/interfaces/user.interface';
import { NotificationService } from '../../shared/services/notification.service';
import { UserService } from '../user.service';

interface IData {
  user: IUser;
  disabled: boolean;
  title: string;
}

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
  statusList = [true, false];
  userTypes = ['develop tem and testing', 'other'];
  selectedDepartment: string[];
  selectedUserType: string;
  selectedStatus: boolean;
  selectedPrivileges: string[];
  user: IUser;
  withData: boolean = false;
  inputDisabled: boolean = false;
  title: string;
  showPasswordField: boolean = true;
  userUpdate: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IData,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    if (this.data) {
      if (this.data.user && !this.userUpdate) {
        this.user = this.data.user;
        this.withData = true;
        this.inputDisabled = this.data.disabled;
        this.title = this.data.title;
        this.userUpdate = this.userUpdate;
      } else if (this.data.user && this.userUpdate) {
        this.user = this.data.user;
        this.withData = true;
        this.inputDisabled = this.data.disabled;
        this.title = this.data.title;
        this.userUpdate = this.userUpdate;
      } else {
        this.user = this.data.user;
        this.withData = true;
        this.userUpdate = true;
        this.title = this.data.title;
      }
    }
  }

  ngOnInit(): void {
    if (this.withData) {
      this.updateForm();
    } else {
      this.title = 'New User';
      this.createForm();
    }
  }

  // to do combine create and update form, the problem is the custom validator

  createForm() {
    this.formGroup = this.formBuilder.group(
      {
        alias: [
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
        departments: [null, [Validators.required]],
        privileges: [null, [Validators.required]],
        status: [null, [Validators.required]],
      },
      { validator: this.mustMatch('password', 'confirmPassword') }
    );
  }

  updateForm() {
    this.formGroup = this.formBuilder.group({
      alias: [
        {
          value: this.withData ? this.user.alias : '',
          disabled: this.inputDisabled,
        },
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      name: [
        {
          value: this.withData ? this.user.name : '',
          disabled: this.inputDisabled,
        },
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100),
        ],
      ],
      email: [
        {
          value: this.withData ? this.user.email : '',
          disabled: this.inputDisabled ? true : null,
        },
        [Validators.required, Validators.email],
      ],
      userType: [
        {
          value: this.withData ? this.user.userType : '',
          disabled: this.inputDisabled ? true : null,
        },
        [Validators.required],
      ],
      departments: [
        {
          value: this.withData ? this.user.departments : null,
          disabled: this.inputDisabled ? true : null,
        },
        [Validators.required],
      ],
      privileges: [
        {
          value: this.withData ? this.user.privileges : null,
          disabled: this.inputDisabled ? true : null,
        },

        [Validators.required],
      ],
      status: [
        {
          value: this.withData ? this.user.status : null,
          disabled: this.inputDisabled ? true : null,
        },
        [Validators.required],
      ],
    });
  }

  private getDepartments() {}

  private getUserType() {}

  private getPrivileges() {}

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

  onSubmit(user: IUser) {
    this.userService.createUser(user).subscribe(() => {
      const notificationData: ISnackBarData = {
        message: 'User Created',
        panelClass: ['toast-success'],
      };

      this.notificationService.notification$.next(notificationData);
    });
  }
}
