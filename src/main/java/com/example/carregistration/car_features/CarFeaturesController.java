package com.example.carregistration.car_features;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/cars/features" )

public class CarFeaturesController {

    private final CarFeaturesService carFeaturesService;

    @Autowired
    public CarFeaturesController(CarFeaturesService carFeaturesService) {
        this.carFeaturesService=carFeaturesService;
    }

    @GetMapping
    public List<CarFeatures> getCarFeatures() {
        return carFeaturesService.getCarFeatures();
    }
}
