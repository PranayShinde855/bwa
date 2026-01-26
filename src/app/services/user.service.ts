import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listRequest } from '../models/listRequest';
import { getByIdUserRequest } from '../models/UserModels/getByIdUserRequest';
import { addUserRequest } from '../models/UserModels/addUserRequest';
import { updateUserRequet } from '../models/UserModels/updateUserRequest';
import { deleteUserRequest } from '../models/UserModels/deleteUserRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAll(request: listRequest): Observable<any> {
    return this.httpClient.post('User/GetAsync', request);
  }

  getById(request: getByIdUserRequest): Observable<any> {
    return this.httpClient.post('User/GetByIdAsync', request);
  }

  Add(request: addUserRequest): Observable<any> {
    return this.httpClient.post('User/AddAsync', request);
  }

  update(request: updateUserRequet): Observable<any> {
    return this.httpClient.post('User/UpdateAsync', request);
  }

  delete(request: deleteUserRequest): Observable<any> {
    return this.httpClient.post('User/DeleteAsync', request);
  }

  getRoles(): Observable<any> {
    return this.httpClient.post('User/GetRolesAsync', {});
  }

  getISDCodes(): Observable<any> {
    return this.httpClient.post('User/GetCountryAsync', {});
  }

  changePassword(request: any): Observable<any> {
    return this.httpClient.post('User/ChangePasswordAsync', request);
  }

  deactivateUser(reqest: any): Observable<any> {
    return this.httpClient.post('User/DeactivateUserAsync', reqest);
  }

  activateUser(request: any): Observable<any> {
    return this.httpClient.post('User/ActivateUserAsync', request);
  }
 
  getUserDetails(): Observable<any> {
    return this.httpClient.post('User/GetLoginDetails', {});
  }
}
