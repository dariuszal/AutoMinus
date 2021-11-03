package com.example.carregistration.car;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class CarService {

    private final CarRepository carRepository;

    public void register(Car car) {
        carRepository.save(car);
    }

    @Transactional
    public List<Car> getCars() {
       return carRepository.findAll();
    }
}
