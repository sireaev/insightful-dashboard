import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, startWith } from 'rxjs';
import { environment } from '@app/environment';
import { IEmployee } from '../models/employee.model';
import { IResponse } from '../models/response.model';
import { ShiftService } from './shift.service';
import { IEmployeeList } from '../models/employee-list.model';
import { parseToListFormat } from 'src/app/shared/parsings.util';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly routeUrl = 'employees';

  constructor(private readonly http: HttpClient,
    private readonly shiftService: ShiftService) { }

  listForTable(): Observable<IResponse<IEmployeeList[]>> {
    return forkJoin([
      this.list(),
      this.shiftService.list(),
    ]).pipe(
      map(([employees, shifts]) => <IResponse<IEmployeeList[]>>({
        data: employees.map(employee => parseToListFormat(shifts, employee)),
        isLoading: false,
      })),
      catchError(() => {
        return of({ isLoading: false });
      }),
      startWith({ isLoading: true }),
    );
  }

  list(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(`${environment.url}/${this.routeUrl}`);
  }
}
