import { Injectable } from "@nestjs/common";

@Injectable()
export class EducationFindCorrectBuyer {
  public findCorrectBuyer(resultDocument, result_id) {

    let buyer_id: string;

    /*
    * Map through all the offers inside the offers array and findthe correct
    *  buyer
    * */
    resultDocument.offers.map((each) => {
      if (each.result_id === result_id) {
        buyer_id = each.buyer;
      }
    });

    return buyer_id;
  }
}
