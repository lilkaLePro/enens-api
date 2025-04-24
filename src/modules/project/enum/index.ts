import { registerEnumType } from "@nestjs/graphql";

export enum PROJECT_TYPE {
  PROMO_CAMPAGNE = "PROMO_CAMPAGNE",
  FUND_RAISING_CAMPAGNE = "FUND_RAISING_CAMPAGNE"
}

registerEnumType(PROJECT_TYPE, {name: "PROJECT_TYPE"});