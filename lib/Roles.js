const Department = require('./Department')

class Roles extends Department { 
    constructor(role, salary, deptName) { 
        super(deptName);
        this.role = role;
        this.salary = salary;
        }
        getRole() {
            console.log(`Name of Role: ${this.role}`)
            return this.role

        }
        getSalary() {
            console.log(`This Role has a salary: ${this.salary}`)
            return this.salary
        }
    }
    module.exports  = Roles;