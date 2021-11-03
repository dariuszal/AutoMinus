package com.example.carregistration.car_registration;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@EqualsAndHashCode
@ToString
public class CarRegistrationRequest {
    private final String make;
    private final String model;
    private final int firstRegistration;
    private final int mileage;
    private final int power;
    private final String fuelType;
    private final String transmissionType;
    private final int price;
    private final String imageUrl;
    private final List<String> features;

    public CarRegistrationRequest(String make, String model, int firstRegistration, int mileage, int power, String fuelType, String transmissionType, int price, String imageUrl, List<String> features) {
        this.make = make;
        this.model = model;
        this.firstRegistration = firstRegistration;
        this.mileage = mileage;
        this.power = power;
        this.fuelType = fuelType;
        this.transmissionType = transmissionType;
        this.price = price;
        this.imageUrl = imageUrl;
        this.features = features;
    }
}
