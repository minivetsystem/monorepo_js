import { Injectable } from "@nestjs/common";

/*
* Import user declared modules
* */
import { User } from "../../users/schemas";

@Injectable()
export class EducationEncodeAuthorization {
  public encode(buyer: User) {
    return Buffer.from(buyer.leadhoop_partner_username + ":" + buyer.leadhoop_partner_password).toString("base64");
  }
}
