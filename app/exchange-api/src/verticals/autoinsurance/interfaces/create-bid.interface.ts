/**
 * This interface is used for saving the bid in db.
 */
export interface ICreateBid {
  /**
   * This represents ping_id which needs to be saved in db for the bid.
   */
  ping_id: string;
  /**
   * This represents client_id which has sent the bid.
   */
  client_id: string;
  /**
   * This represents price which needs to be saved in db for the bid.
   */
  price: number;

  vendor_share: number;

  revenue_share: number;
}
