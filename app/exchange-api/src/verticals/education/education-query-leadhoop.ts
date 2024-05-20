import {
  BadRequestException,
  Injectable,
  RequestTimeoutException
} from "@nestjs/common";
import { HttpService } from "@nestjs/axios";


/*
* User created modules
* */
import { User } from "../../users/schemas";
import { EducationEncodeAuthorization } from "./education-encode-authorization";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";


export enum QueryType {
  searches = "searches",
  results = "results",
  lead_requests = "lead_requests"
}

@Injectable()
export class EducationQueryLeadhoop {

  constructor(
    /*
    * Injecting HttpService to use Axios for sending request
    * */
    private readonly httpService: HttpService,
    /*
    * Inject the Authorization header encoding service
    * */
    private readonly educationEncodeAuthorization: EducationEncodeAuthorization
  ) {
  }

  public async queryLeadhoop(
    type: QueryType,
    queryString: string,
    buyer: User,
    requestType: "get" | "post"
  ) {

    /*
    * Check if the buyer does not have the required properties assigned to it
    * */
    if (!buyer.leadhoop_partner_code || !buyer.leadhoop_partner_username || !buyer.leadhoop_partner_password || !buyer.leadhoop_service_url) {
      throw new BadRequestException("The Buyer is not configured correctly." +
        " Please contact the admin to ensure the buyer is setup properly");
    }

    /*
    * Make a request to the LeadHoop API
    * */
    let finalData;

    if (requestType == "post") {
      const { data } = await firstValueFrom(
        this.httpService.post(
          `${buyer.leadhoop_service_url}/v2/${type}?${queryString}`,
          null,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": `Basic ${this.educationEncodeAuthorization.encode(buyer)}`
            }
          }
        ).pipe(
          catchError((error: AxiosError) => {
            throw new RequestTimeoutException({
              error: error,
              message: "There was an error getting a response from LeadHoop",
              query: `${buyer.leadhoop_service_url}/v2/${type}?${queryString}`
            });
          })
        )
      );
      finalData = data;
    } else {
      const { data } = await firstValueFrom(
        this.httpService.get(
          `${buyer.leadhoop_service_url}/v2/${type}?${queryString}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": `Basic ${this.educationEncodeAuthorization.encode(buyer)}`
            }
          }
        ).pipe(
          catchError((error: AxiosError) => {
            throw new RequestTimeoutException({
              error: error,
              message: "There was an error getting a response from LeadHoop",
              query: `${buyer.leadhoop_service_url}/v2/${type}?${queryString}`
            });
          })
        )
      );
      finalData = data;
    }

    /*
    * Finally return the response
    * */
    return finalData;
  }
}
