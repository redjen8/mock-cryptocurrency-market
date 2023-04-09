package com.redjen.mockcryptocurrencyserver.service;

import org.apache.commons.rng.UniformRandomProvider;
import org.apache.commons.rng.simple.RandomSource;
import org.springframework.stereotype.Service;

@Service
public class RandomService {

    private static final UniformRandomProvider randomProvider = RandomSource.XO_SHI_RO_256_PLUS.create();

    private static final Double LOWER_BOUND = 0.0;
    private static final Double UPPER_BOUND = 100.0;

    public Double getNextRandomValue() {
        return randomProvider.nextDouble(LOWER_BOUND, UPPER_BOUND);
    }
}
