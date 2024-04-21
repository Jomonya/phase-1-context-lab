/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

 function createEmployeeRecord(employeeData) {
    let employeeRecord = {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employeeRecord;
}
function createEmployeeRecords(employeeDataArray) {
    return employeeDataArray.map(employeeData => createEmployeeRecord(employeeData));
}
function createTimeInEvent(employeeRecord, dateTimeStamp) {
    if (typeof dateTimeStamp !== 'string' || dateTimeStamp.length < 16) {
        throw new Error('Invalid date/time stamp format');
    }

    let [date, hour] = dateTimeStamp.split(" ");
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTimeStamp) {
    if (typeof dateTimeStamp !== 'string' || dateTimeStamp.length < 16) {
        throw new Error('Invalid date/time stamp format');
    }

    let [date, hour] = dateTimeStamp.split(" ");
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

    const timeInHour = parseInt(timeInEvent.hour.toString().slice(0, 2));
    const timeOutHour = parseInt(timeOutEvent.hour.toString().slice(0, 2));

    return timeOutHour - timeInHour;
}
function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour;
    return hoursWorked * payRate;
}


const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

