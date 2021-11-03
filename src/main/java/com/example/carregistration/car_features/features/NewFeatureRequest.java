package com.example.carregistration.car_features.features;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
public class NewFeatureRequest {
    private final String type;
    private final List<String> featuresList;

    @Override
    public String toString() {
        return "NewFeatureRequest{" +
                "type='" + type + '\'' +
                ", featuresList=" + featuresList +
                '}';
    }
}
