package com.example.carregistration.car_features.features;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class FeaturesService {

    private final FeaturesRepository featuresRepository;

    @Transactional
    public List<Feature> getFeatures() {
        return featuresRepository.findAll();
    }

    public void saveFeature(Feature feature) {
        featuresRepository.save(feature);
    }


}
