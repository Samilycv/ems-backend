//import db.js
const db = require('./db')

//get all employees details from mongodb
const allEmployees = () => {
    return db.Employee.find().then((result) => {
        if (result) {
            return {
                statusCode: 200,
                employee: result
            }
        }
        else {
            return {
                statusCode: 404,
                message: "No Data Found"
            }
        }
    })
}

//add all employees details to mongodb
const addEmployee = (id, name, age, designation, salary) => {
    return db.Employee.findOne({ id }).then((result) => {
        if (result) {
            return {
                statusCode: 401,
                message: "Employee already exist"
            }
        }
        else {
            const newEmployee = new db.Employee({ id, name, age, designation, salary })
            newEmployee.save()//To save new employee details into the database
            return {
                statusCode: 200,
                message: "Employee added successfully"
            }
        }
    })
}

//delete a particular employee from the database
const deleteEmployee = (id) => {
    return db.Employee.deleteOne({ id }).then((result) => {
        if (result) {
            return {
                statusCode: 200,
                message: 'Employee deleted successfully'
            }
        }
        else {
            return {
                statusCode: 404,
                message: 'Employee not found'
            }
        }
    })
}

//get a particular employee details
const getAnEmp=(id)=>{
    return db.Employee.findOne({id}).then((result)=>{
        if(result){
            return{
                statusCode:200,
                employee:result
            }
        }
    })

}

//update a particular employee
const updateAnEmp=(empId,id,name,age,designation,salary)=>{
    return db.Employee.findOne({id:empId}).then((result)=>{
        if(result){
            result.id=id;//(fun para)
            result.name=name;
            result.age=age
            result.designation=designation;
            result.salary=salary;
            result.save();//to update in mongodb
            return{
                statusCode:200,
                message:"Employee details has been updated successfully"
            } 
        }
        else{
            return{
                statusCode:401,
                message:"Invalid Operation"
            }
        }
    })
}


module.exports = {
    allEmployees,
    addEmployee,
    deleteEmployee,
    getAnEmp,
    updateAnEmp
}