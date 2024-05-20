export const offersMockData = [
  {
    result_id : 535 ,
    details : {
      name : "Independence University" ,
      logo_url :
        "https://storage.googleapis.com/leadhoop-uploads-exports/development/uploads/student/school/logo/52/IULogo.png" ,
      external_name : "Independence University" ,
      offer_type : "internal-shared" ,
      description : "This is the long description." ,
      short_description : "This is the short description." ,
      identifier : 360 ,
      is_warm_transfer : false ,
      is_exclusive : false ,
      internal_offer_id : 52 ,
      internal_advertiser_id : 408 ,
      form_fields : [
        {
          id : 1648 ,
          name : "address2" ,
          prefilled_value : "" ,
          form_field_type_name : "text-field" ,
          post_key : "lead_address[address2]" ,
          required : {
            type : "conditional" ,
            conditions : [
              {
                program_ids : [ 3448 ]
              }
            ]
          } ,
          label_text : "Apt/Floor/Suite" ,
          sequence : 105 ,
          form_list_items : null
        } ,
        {
          id : 1692 ,
          name : "tcpa_consent" ,
          prefilled_value : "1" ,
          form_field_type_name : "only-label-text-with-value" ,
          post_key : "lead_consent[tcpa_consent]" ,
          required : {
            type : "required" ,
            conditions : []
          } ,
          label_text :
            "By providing us with your phone number, you consent to be contacted by Independence University or its affiliated schools about our educational programs.  This contact may be by phone, autodialer, recorded message or text.  You may still enroll without providing this consent." ,
          sequence : 501 ,
          form_list_items : null
        } ,
        {
          id : 1685 ,
          name : "program_id" ,
          prefilled_value : "" ,
          form_field_type_name : "program-dropdown" ,
          post_key : "lead_education[program_id]" ,
          required : {
            type : "required" ,
            conditions : []
          } ,
          label_text : "Program of Interest" ,
          sequence : 304 ,
          form_list_items : null
        } ,
        {
          id : 12668 ,
          name : "campus_id" ,
          prefilled_value : "" ,
          form_field_type_name : "campus-dropdown" ,
          post_key : "lead_education[campus_id]" ,
          required : {
            type : "required" ,
            conditions : []
          } ,
          label_text : "Campus" ,
          sequence : 305 ,
          form_list_items : null
        }
      ] ,
      campuses : [
        {
          id : 15082 ,
          name : "Independence University" ,
          school_type : "Online" ,
          programs : [
            {
              id : 14472 ,
              name : "A.O.S. - Medical Specialties (AOS)" ,
              payout : "8.4" ,
              estimated_payout : true ,
              degree_name : "Associate of Occupational Science"
            } ,
            {
              id : 14478 ,
              name : "B.S. - Business Administration - Technology (BS)" ,
              payout : "8.4" ,
              estimated_payout : true ,
              degree_name : "Bachelor of Science"
            }
          ]
        }
      ]
    } ,
    expires_at : "2023-03-24T10:48:17.736-03:00"
  }
];
