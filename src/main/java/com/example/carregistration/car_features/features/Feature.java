package com.example.carregistration.car_features.features;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "features")
@Setter
@Getter
@NoArgsConstructor
@EqualsAndHashCode
public class Feature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String type;

    @Column(unique=true)
    private String title;

    public Feature(String type, String title) {
        this.type = type;
        this.title = title;
    }
}
