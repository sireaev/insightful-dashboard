import { addDays, differenceInHours, endOfDay, startOfDay } from 'date-fns';
import { IEmployee } from '../core/models/employee.model';
import { IShift } from '../core/models/shift.model';

export const totalWorkingRegularHours = (startDate: Date, endDate: Date) => {
  let minutesWorked = 0;
  
  if (endDate < startDate) { return 0; }
    
  let current = startDate;
  let totalMinutes = 0;
  let endDay = endOfDay(current) < endDate ? endOfDay(current) : endDate;

  while (current <= endDate) {
    endDay = endOfDay(current) < endDate ? endOfDay(current) : endDate;

    minutesWorked++;
    if (minutesWorked === 480 || current >= endDay) {

      if (minutesWorked === 480 && current < endDay) {
        if (startOfDay(addDays(current, 1)) < endDate) {
          current = startOfDay(addDays(current, 1));
        }
      }

      totalMinutes += minutesWorked;
      minutesWorked = 0;
      endDay = endOfDay(current) < endDate ? endOfDay(current) : endDate;
    }

    current.setTime(current.getTime() + 1000 * 60);
  }

  return totalMinutes / 60;
};

export const parseToListFormat = (shifts: IShift[], employee: IEmployee) => {
  const abs = Math.abs;
  const employeeShifts = shifts.filter((shift: IShift) => shift.employeeId === employee.id);
  return {
    id: employee.id,
    name: employee.name,
    email: employee.email,
    hourlyRate: employee.hourlyRate,
    overtimeHourlyRate: employee.overtimeHourlyRate,
    totalClockedTime: employeeShifts.reduce((acc: any, curr: any) => {
      return acc + abs(differenceInHours(new Date(curr.clockIn), new Date(curr.clockOut)));
    }, 0),
    totalPaidRegularHours: employeeShifts.reduce((acc: any, curr: any) => {
      return acc + (abs(totalWorkingRegularHours(new Date(curr.clockIn), new Date(curr.clockOut))) * (employee.hourlyRate || 1));
    }, 0),
    totalPaidOvertimeHours: employeeShifts.reduce((acc: any, curr: any) => {
      return acc + ((abs(differenceInHours(new Date(curr.clockIn), new Date(curr.clockOut))) - 
                       abs(totalWorkingRegularHours(new Date(curr.clockIn), new Date(curr.clockOut)))) * (employee.overtimeHourlyRate || 1));
    }, 0),
  };
};
