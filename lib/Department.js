class Department {
    constructor(deptName) { 
    this.deptName = deptName;
    }
    getDept() {
        console.log(`Dept Name: ${this.deptName}`)
        return this.deptName
    }
}
module.exports  = Department;