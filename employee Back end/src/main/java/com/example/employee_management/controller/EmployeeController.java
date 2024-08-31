package com.example.employee_management.controller;

import com.example.employee_management.entity.Employee;
import com.example.employee_management.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    @GetMapping("/list")
    public List<Employee> getAllEmployees() {
        return service.getAllEmployees();
    }

    @GetMapping("details/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Optional<Employee> employee = service.getEmployeeById(id);
        return employee.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public Employee createEmployee(@RequestBody Employee employee) {
        return service.createOrUpdateEmployee(employee);
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employee) {
        Optional<Employee> existingEmployee = service.getEmployeeById(id);
        if (existingEmployee.isPresent()) {
            employee.setId(id);
            return ResponseEntity.ok(service.createOrUpdateEmployee(employee));
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        service.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
}
