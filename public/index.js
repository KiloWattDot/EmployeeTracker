// Program Start 
console.log('Welcome to the Employee Tracker!')
console.log('Please follow the prompts')


// import packages
const inquirer = require('inquirer');
const fs = require('fs');
const Department = require('../lib/Department');
const Roles = require('../lib/Roles');
const Employee = require('../lib/Employee');

const listOfDepts = {}
const listOfRoles = {}
const listOfEmployees = {}


function pickAction() {
    inquirer.prompt([
     {    
        type: "list",
        name: "action",
        message: "Would like to:",
        choices: 
        [
            "View Department", 
            "View Role",
            "View Employee",
            "Add Department", 
            "Add Role",
            "Add Employee",
            "Update Employee"
        ]

      }

    ])
    .then((action) => {
        if(action === "View Department") { 
            // Function to view all deplts
            // Console.DeptTable 
        }
        if(action === "View Role") { 
            // Function to view all Roles
            // Console.RolesTable 
        }
        if(action === "View Employee") { 
            // Function to view all Employees
             // Console.EmployeeTable 
        }
        if(action === "Add Department") { 
            addDept();

        } 
        if(action === "Add Roles") { 
            addRole();
        }
        if(action === "Add Employee") { 
           addEmployee();
        }
        else { 
            UpdateEmployee()
        }

    })
}


function addDept() {
    let newDept = '';
    inquirer.prompt([
        {
            type: "input",
            name: "deptName",
            message: "What is the name of the Department?",
        }
    ])   
    
    newDept = new Department(deptName)
    listOfDepts.push(newDept)
}


function addRole() {
    let newRole = '';
    inquirer.prompt([
        {
            type: "input",
            name: "role",
            message: "What is the name of the role?",
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary for the role?",
        },
        {
            type: "input",
            name: "deptName",
            message: "What is the department for the role?",
        },

    ])   
    newRole = new Roles(role, salary, deptName)
    listOfRoles.push(newRoles)
  
}

function addEmployee() {
    let newEmployee = '';
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the first name of the employee?",
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the last name of the employee?",
        },
        {
            type: "input",
            name: "manager",
            message: "What is the department for the role?",
        },
        {
            type: "list",
            name: "role",
            message: "What is the role of the Employee?",
            // choices: [from db]
        },

    ])
    .then(({firstName, lastName, manager, role}) => {
        if(role) {
            getdept()
            
        }

        newEmployee = new Employee(firstName, lastName, manager, role, deptName, salary)

    })   



  
}