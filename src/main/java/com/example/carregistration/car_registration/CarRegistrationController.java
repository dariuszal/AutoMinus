package com.example.carregistration.car_registration;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/registration")
@AllArgsConstructor
public class CarRegistrationController {

    private CarRegistrationService carRegistrationService;

    @PostMapping
    public String register(@RequestBody CarRegistrationRequest request) {
        return carRegistrationService.register(request);
    }
}
