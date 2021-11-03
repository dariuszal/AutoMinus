package com.example.carregistration.car_features.features;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional(readOnly = true)

public interface FeaturesRepository extends JpaRepository<Feature,Integer> {

}
