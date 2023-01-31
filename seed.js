const { faker } = require('@faker-js/faker');

// index.js
module.exports = () => {
    const data = { employees: [], shifts: [] }
    // Create 1000 users
    for (let i = 0; i < 10; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      data.employees.push({
        id: i+1,
        name: `${firstName} ${lastName}`,
        email: faker.internet.email(firstName, lastName),
        hourlyRate: faker.datatype.number({ min: 100, max: 200 }),
        overtimeHourlyRate: faker.datatype.number({ min: 120, max: 300 })
       })
    }

    for (let i = 0; i < 1000; i++) {
        data.shifts.push({
            employeeId: faker.datatype.number({min: 1, max: 10}),
            clockIn: faker.date.recent(), 
            clockOut: faker.date.recent()
         })
      }

    return data
}