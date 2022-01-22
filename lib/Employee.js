const Roles = require('./Roles')

class Employee extends Roles {
    constructor(firstName, lastName, role, salary, manager) { 
    super(role, salary, deptName) 
    this.firstName = firstName;
    this.lastName = lastName;
    this.manager = manager;
    }
}
module.exports = Employee;
