package com.example.carregistration.car;

import com.example.carregistration.car_features.features.Feature;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
@Table(name = "cars")

public class Car {

    @SequenceGenerator(
            name = "vehicle_sequence",
            sequenceName = "vehicle_sequence",
            allocationSize = 1
    )
    @Id

    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "vehicle_sequence"
    )
    private Long id;
    private String make;
    private String model;
    private int firstRegistration;
    private int mileage;
    private int power;
    private String fuelType;
    private String transmissionType;
    private int price;
    private String imageUrl;
    private LocalDateTime created;
    @Transient
    private List<String> features = new ArrayList<String>();

    public Car(
            String make,
            String model,
            int firstRegistration,
            int mileage,
            int power,
            String fuelType,
            String transmissionType,
            int price,
            String imageUrl
    ) {
        this.make = make;
        this.model = model;
        this.firstRegistration = firstRegistration;
        this.mileage = mileage;
        this.power = power;
        this.fuelType = fuelType;
        this.transmissionType = transmissionType;
        this.price = price;
        this.imageUrl = imageUrl;
        this.created = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "Car{" +
                "id=" + id +
                ", make='" + make + '\'' +
                ", model='" + model + '\'' +
                ", firstRegistration=" + firstRegistration +
                ", mileage=" + mileage +
                ", power=" + power +
                ", fuelType='" + fuelType + '\'' +
                ", transmissionType='" + transmissionType + '\'' +
                ", price=" + price +
                ", imageUrl='" + imageUrl + '\'' +
                ", created=" + created +
                '}';
    }
}
