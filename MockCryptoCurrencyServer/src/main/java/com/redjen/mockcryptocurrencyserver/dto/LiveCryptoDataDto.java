package com.redjen.mockcryptocurrencyserver.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class LiveCryptoDataDto {
    private String code;
    private String name;
    private Double currentPrice;
    private Long createdAt;
}
