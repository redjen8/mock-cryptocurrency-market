package com.redjen.mockcryptocurrencyserver.controller;

import java.time.Duration;
import java.time.Instant;

import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.redjen.mockcryptocurrencyserver.dto.LiveCryptoDataDto;
import reactor.core.publisher.Flux;

@RestController
public class CryptoDataController {

    @GetMapping("/crypto/live")
    public Flux<ServerSentEvent<LiveCryptoDataDto>> getLiveCryptoData() {
        return Flux.interval(Duration.ofSeconds(1))
            .map(interval -> ServerSentEvent.<LiveCryptoDataDto>builder()
                .id(String.valueOf(interval))
                .data(LiveCryptoDataDto.builder()
                    .code("sample")
                    .name("테스트 코인")
                    .currentPrice(interval.doubleValue())
                    .createdAt(Instant.now().getEpochSecond())
                    .build())
                .build()
            );
    }
}
