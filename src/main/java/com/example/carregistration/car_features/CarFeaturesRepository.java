package com.example.carregistration.car_features;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
@Transactional(readOnly = true)

public interface CarFeaturesRepository extends JpaRepository<CarFeatures,Integer> {

}
