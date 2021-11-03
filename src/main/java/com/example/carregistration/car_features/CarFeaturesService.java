package com.example.carregistration.car_features;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CarFeaturesService {

    private final CarFeaturesRepository carFeaturesRepository;

    @Transactional
    public List<CarFeatures> getCarFeatures() {
       return carFeaturesRepository.findAll();
    }

    public String addCarFeature(CarFeatures carFeatures) {
        carFeaturesRepository.save(carFeatures);
        return "success";
    }
    public static <T> Predicate<T> distinctByKey(Function<? super T, ?> keyExtractor) {
        Set<Object> seen = ConcurrentHashMap.newKeySet();
        return t -> seen.add(keyExtractor.apply(t));
    }
}
