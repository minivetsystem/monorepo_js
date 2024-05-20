/**
 * This interface is used for saving the lead in db.
 */
export interface ICreateLead {
  /**
   * This represents post_id which needs to be saved in db for the lead.
   */
  post_id: string;

  /**
   * This represents client_id which needs to be saved in db for the lead.
   */
  client_id: string;
}
