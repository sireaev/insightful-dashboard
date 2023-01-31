import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';

import { environment } from '@app/environment';
import { IShift } from '../models/shift.model';

@Injectable({
  providedIn: 'root',
})
export class ShiftService {
  private readonly routeUrl = 'shifts';

  constructor(private readonly http: HttpClient) { }

  listByEmployeeId(id: number): Observable<IShift[]> {
    return this.http.get<IShift[]>(`${environment.url}/${this.routeUrl}`).pipe(
      filter<IShift[]>((el: any) => el.employeeId === id),
    );
  }

  listByEmployeesId(ids: number[]): Observable<IShift[]> {
    return this.http.get<IShift[]>(`${environment.url}/${this.routeUrl}`).pipe(
      map((shifts: IShift[]) => shifts.filter(el => ids.includes(el.employeeId))));
  }

  list(): Observable<any> {
    return this.http.get(`${environment.url}/${this.routeUrl}`);
  }
}
