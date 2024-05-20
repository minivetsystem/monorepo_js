import { Injectable } from "@nestjs/common";

@Injectable()
export class EducationCheckDuplicatePostRequest {
  public  checkDuplicate(existingPostRequests, request): boolean {
    let hasDuplicate = false;

    /*
    * loop and check for duplicates
    * */
    existingPostRequests.map((each) => {
      if (each.result_id === request.result_id) {
        hasDuplicate = true;
      }
    });

    return hasDuplicate;
  }
}
