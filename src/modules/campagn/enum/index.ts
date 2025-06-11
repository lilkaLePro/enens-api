import { registerEnumType } from "@nestjs/graphql";

export enum CAMPAGN_TYPE {
  PROMO_CAMPAGNE = "PROMO_CAMPAGNE",
  FUND_RAISING_CAMPAGNE = "FUND_RAISING_CAMPAGNE"
}

registerEnumType(CAMPAGN_TYPE, {name: "CAMPAGN_TYPE"});