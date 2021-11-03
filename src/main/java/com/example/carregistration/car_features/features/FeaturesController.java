package com.example.carregistration.car_features.features;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/features")
public class FeaturesController {

    private final FeaturesService featuresService;

    @GetMapping
    public List<Feature> getFeatures() {
        return featuresService.getFeatures();
    }

    @PostMapping
    public void addNewFeature(@RequestBody NewFeatureRequest newFeatureRequest) {
        for (int i = 0; i<newFeatureRequest.getFeaturesList().size(); i++) {
            Feature newFeature = new Feature(newFeatureRequest.getType(),newFeatureRequest.getFeaturesList().get(i));
            featuresService.saveFeature(newFeature);
        }
    }

}
