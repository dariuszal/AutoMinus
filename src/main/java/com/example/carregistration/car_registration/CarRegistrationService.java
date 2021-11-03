package com.example.carregistration.car_registration;

import com.example.carregistration.car.Car;
import com.example.carregistration.car.CarService;
import com.example.carregistration.car_features.CarFeatures;
import com.example.carregistration.car_features.CarFeaturesService;
import com.example.carregistration.car_features.features.Feature;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CarRegistrationService {

    private final CarService carService;
    private final CarFeaturesService carFeaturesService;

    public String register(CarRegistrationRequest request) {
        Car newCar = new Car(
                request.getMake(),
                request.getModel(),
                request.getFirstRegistration(),
                request.getMileage(),
                request.getPower(),
                request.getFuelType(),
                request.getTransmissionType(),
                request.getPrice(),
                request.getImageUrl()
        );
            carService.register(newCar);

            for (int i = 0; i < request.getFeatures().size(); i++){
                CarFeatures newFeature = new CarFeatures(newCar.getId(),request.getFeatures().get(i));
                carFeaturesService.addCarFeature(newFeature);
            }
        return "Car registered";
    }
}
