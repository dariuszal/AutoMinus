package com.example.carregistration.car_features;


import com.example.carregistration.car.Car;
import lombok.*;

import javax.persistence.*;

@Entity
@Setter
@Getter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Table(name = "cars_features")


public class CarFeatures {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "car_id", referencedColumnName = "id")
    private Long carId;
    private String title;

    public CarFeatures(Long carId, String title) {
        this.carId = carId;
        this.title = title;
    }

}

