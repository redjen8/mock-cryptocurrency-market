package com.redjen.mockcryptocurrencyserver.controller;

import java.time.Duration;
import java.time.Instant;

import com.redjen.mockcryptocurrencyserver.service.RandomService;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.redjen.mockcryptocurrencyserver.dto.LiveCryptoDataDto;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api")
public class CryptoDataController {

    private final RandomService randomService;

    CryptoDataController(RandomService randomService) {
        this.randomService = randomService;
    }

    @GetMapping(value="/crypto/live", produces = "text/event-stream")
    public Flux<ServerSentEvent<LiveCryptoDataDto>> getLiveCryptoData() {
        return Flux.interval(Duration.ofSeconds(1))
            .map(interval -> ServerSentEvent.<LiveCryptoDataDto>builder()
                .id(String.valueOf(interval))
                .data(LiveCryptoDataDto.builder()
                    .code("TST")
                    .currentPrice(randomService.getNextRandomValue())
                    .createdAt(Instant.now().getEpochSecond())
                    .build())
                .build()
            );
    }
}
