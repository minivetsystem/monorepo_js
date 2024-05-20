
export const PHONE_VALIDATION_REGEX = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
export enum PERMISSION_ACTION {
  Manage = 'manage',
  Create = 'create',
  View = 'view',
  Update = 'update',
  Delete = 'delete',
}

export enum ENTITIES {
  User = 'User',
  Campaign = 'Vendor'
}

export enum ROLE {
  Admin = 'Admin',
  Vendor = 'Vendor'
}
/**
 * Represents all the besttimes contact types.
 */
export const BESTTIMES_CONTACT = {
  best_time_to_contact_afternoon : 'best_time_to_contact_afternoon',
  best_time_to_contact_anytime : 'best_time_to_contact_anytime',
  best_time_to_contact_evening : 'best_time_to_contact_evening',
  best_time_to_contact_morning : 'best_time_to_contact_morning'
}

/**
 * Represents all the education level types.
 */
export const EDUCATION_LEVELS = {
  education_level_associates_degree : 'education_level_associates_degree',
  education_level_bachelors_degree : 'education_level_bachelors_degree',
  education_level_doctorates_phd : 'ducation_level_doctorates_phd',
  education_level_ged : 'education_level_ged',
  education_level_high_school_diploma : 'education_level_high_school_diploma',
  education_level_masters_degree : 'education_level_masters_degree',
  education_level_no_high_school_diploma : 'education_level_no_high_school_diploma',
  education_level_some_college_1_29_credits : 'education_level_some_college_1_29_credits',
  education_level_some_college_30_59_credits : 'education_level_some_college_30_59_credits',
  education_level_some_college_60_credits : 'education_level_some_college_60_credits'
}

/**
 * Represents all the start date types.
 */
export const START_DATES = {
  desired_start_date_1_3_months: 'desired_start_date_1_3_months',
  desired_start_date_4_6_months: 'desired_start_date_4_6_months',
  desired_start_date_7_12_months: 'desired_start_date_7_12_months',
  desired_start_date_immediately: 'desired_start_date_immediately',
  desired_start_date_more_than_1_year: 'desired_start_date_more_than_1_year',
  desired_start_date_not_sure: 'desired_start_date_not_sure'
}

/**
 * Represents all the school types.
 */
export const SCHOOL_TYPES = {
  online: 1,
  campus: 2,
  both: 3
}

/**
 * Represents all the level of interest types.
 */
export const LEVEL_OF_INTERESTS = {
  level_of_interest_1: 'level_of_interest_1',
  level_of_interest_2: 'level_of_interest_2',
  level_of_interest_3: 'level_of_interest_3',
  level_of_interest_4: 'level_of_interest_4',
  level_of_interest_5: 'level_of_interest_5',
  level_of_interest_6: 'level_of_interest_6',
  level_of_interest_7: 'level_of_interest_7',
  level_of_interest_8: 'level_of_interest_8',
  level_of_interest_9: 'level_of_interest_9',
  level_of_interest_10: 'level_of_interest_10'
}

/**
 * Represents all the military types.
 */
export const MILITARY_TYPES = {
  military_af_active_duty_ad: 'military_af_active_duty_ad',
  military_af_civilian: 'military_af_civilian',
  military_af_selective_reserve_sr: 'military_af_selective_reserve_sr',
  military_af_spouse_of_ad_or_sr: 'military_af_spouse_of_ad_or_sr',
  military_af_veteran: 'military_af_veteran',
  military_ar_active_duty_ad: 'military_ar_active_duty_ad',
  military_ar_civilian: 'military_ar_civilian',
  military_ar_selective_reserve_sr: 'military_ar_selective_reserve_sr',
  military_ar_spouse_of_ad_or_sr: 'military_ar_spouse_of_ad_or_sr',
  military_ar_veteran: 'military_ar_veteran',
  military_cg_active_duty_ad: 'military_cg_active_duty_ad',
  military_cg_civilian: 'military_cg_civilian',
  military_cg_selective_reserve_sr: 'military_cg_selective_reserve_sr',
  military_cg_spouse_of_ad_or_sr: 'military_cg_spouse_of_ad_or_sr',
  military_cg_veteran: 'military_cg_veteran',
  military_mc_active_duty_ad: 'military_mc_active_duty_ad',
  military_mc_civilian: 'military_mc_civilian',
  military_mc_selective_reserve_sr: 'military_mc_selective_reserve_sr',
  military_mc_spouse_of_ad_or_sr: 'military_mc_spouse_of_ad_or_sr',
  military_mc_veteran: 'military_mc_veteran',
  military_no_military_affiliation: 'military_no_military_affiliation',
  military_nv_active_duty_ad: 'military_nv_active_duty_ad',
  military_nv_civilian: 'military_nv_civilian',
  military_nv_selective_reserve_sr: 'military_nv_selective_reserve_sr',
  military_nv_spouse_of_ad_or_sr: 'military_nv_spouse_of_ad_or_sr',
  military_nv_veteran: 'military_nv_veteran'
}

/**
 * Represents all the is us citizen options.
 */
export const IS_US_CITIZEN = {
  citizenship_yes: 'citizenship_yes',
  citizenship_no: 'citizenship_no'
};

/**
 * Represents all the computer with internet types.
 */
export const COMPUTER_WITH_INTERNET = {
  computer_with_internet_yes: 'computer_with_internet_yes',
  computer_with_internet_no: 'computer_with_internet_no'
}

/**
 * Represents all the teaching licenses.
 */
export const TEACHING_LICENSE = {
  teaching_license_yes: 'teaching_license_yes',
  teaching_license_no: 'teaching_license_no'
}

/**
 * Represents all the registered nurses
 */
export const REGISTERED_NURSE = {
  registered_nurse_yes: 'registered_nurse_yes',
  registered_nurse_no: 'registered_nurse_no'
}

/**
 * Represents all the enrolled statuses.
 */
export const ENROLLED_STATUS = {
  enrolled_status_yes: 'enrolled_status_yes',
  enrolled_status_no: 'enrolled_status_no'
}

/**
 * Represents all the area of studies.
 */
export const AREA_OF_STUDIES = {
  art_design: 'art_design',
  business: 'business',
  computers_technology: 'computers_technology',
  education_teaching: 'education_teaching',
  engineering: 'engineering',
  health_medical: 'health_medical',
  law_criminal_justice: 'law_criminal_justice',
  liberal_arts_humanities: 'liberal_arts_humanities',
  nursing: 'nursing',
  science_math: 'science_math',
  social_science: 'social_science',
  trade_technical: 'trade_technical'
}

/**
 * Represents all the program names.
 */
export const PROGRAM_NAMES = {
  accounting: 'accounting',
  acquisition_contract_management: 'acquisition_contract_management',
  administrative_law: 'administrative_law',
  advertising_commercial_design: 'advertising_commercial_design',
  aerospace_engineering: 'aerospace_engineering',
  agricultural_engineering: 'agricultural_engineering',
  alternative_medicine: 'alternative_medicine',
  animal_care: 'animal_care',
  animation: 'animation',
  anthropology: 'anthropology',
  archaeology: 'archaeology',
  architectural_engineering: 'architectural_engineering',
  architecture: 'architecture',
  art_design: 'art_design',
  astronomy: 'astronomy',
  audiology: 'audiology',
  audio_production: 'audio_production',
  automotive_engineering: 'automotive_engineering',
  automotive_maintenance_repair: 'automotive_maintenance_repair',
  aviation: 'aviation',
  banking: 'banking',
  biochemistry: 'biochemistry',
  biology: 'biology',
  biomedical_engineering: 'biomedical_engineering',
  bridal_consulting: 'bridal_consulting',
  business: 'business',
  business_administration: 'business_administration',
  business_communications: 'business_communications',
  business_management_leadership: 'business_management_leadership',
  carpentry_construction: 'carpentry_construction',
  chemical_engineering: 'chemical_engineering',
  chemistry: 'chemistry',
  child_adult_development: 'child_adult_development',
  child_care: 'child_care',
  chiropractic_massage_therapy: 'chiropractic_massage_therapy',
  civil_engineering: 'civil_engineering',
  communications: 'communications',
  computer_engineering: 'computer_engineering',
  computer_information_sciences: 'computer_information_sciences',
  computer_science: 'computer_science',
  computers_technology: 'computers_technology',
  corrections: 'corrections',
  cosmetology: 'cosmetology',
  counseling_guidance: 'counseling_guidance',
  counseling_planning: 'counseling_planning',
  court_reporting: 'court_reporting',
  crime_scene: 'crime_scene',
  criminology: 'criminology',
  culinary_arts: 'culinary_arts',
  database_administration: 'database_administration',
  data_management: 'data_management',
  dentistry_oral_sciences: 'dentistry_oral_sciences',
  distance_education: 'distance_education',
  early_childhood_education: 'early_childhood_education',
  e_commerce_e_business: 'e_commerce_e_business',
  economics: 'economics',
  educational_administration: 'educational_administration',
  educational_technology: 'educational_technology',
  education_teaching: 'education_teaching',
  electrical_engineering: 'electrical_engineering',
  electrician: 'electrician',
  electronics_maintenance_repair: 'electronics_maintenance_repair',
  ems_paramedic: 'ems_paramedic',
  engineering: 'engineering',
  english: 'english',
  entrepreneurship: 'entrepreneurship',
  environmental_engineering: 'environmental_engineering',
  ethnic_gender_studies: 'ethnic_gender_studies',
  event_planning: 'event_planning',
  fashion: 'fashion',
  film_video_production: 'film_video_production',
  finance: 'finance',
  fine_art_crafts: 'fine_art_crafts',
  fitness_exercise_science: 'fitness_exercise_science',
  floral_design: 'floral_design',
  food_services: 'food_services',
  forensics: 'forensics',
  geography: 'geography',
  graphic_design: 'graphic_design',
  health_information_systems: 'health_information_systems',
  health_medical: 'health_medical',
  health_medical_administration: 'health_medical_administration',
  health_medical_technology: 'health_medical_technology',
  health_services: 'health_services',
  heavy_equipment_maintenance_repair: 'heavy_equipment_maintenance_repair',
  higher_education: 'higher_education',
  history: 'history',
  home_inspection: 'home_inspection',
  homeland_security: 'homeland_security',
  hospitality_management: 'hospitality_management',
  human_resources: 'human_resources',
  human_services: 'human_services',
  hvac: 'hvac',
  illustration_drawing: 'illustration_drawing',
  industrial_design: 'industrial_design',
  industrial_engineering: 'industrial_engineering',
  information_technology: 'information_technology',
  insurance_risk_management: 'insurance_risk_management',
  interdisciplinary_studies: 'interdisciplinary_studies',
  interior_design: 'interior_design',
  international_business: 'international_business',
  journalism: 'journalism',
  laboratory_sciences: 'laboratory_sciences',
  landscape_design: 'landscape_design',
  language: 'language',
  language_education: 'language_education',
  law_criminal_justice: 'law_criminal_justice',
  law_enforcement: 'law_enforcement',
  leatherworking_upholstery: 'leatherworking_upholstery',
  legal_paralegal_studies: 'legal_paralegal_studies',
  liberal_arts_humanities: 'liberal_arts_humanities',
  library_science: 'library_science',
  linguistics: 'linguistics',
  literature_studies: 'literature_studies',
  manufacturing_engineering: 'manufacturing_engineering',
  marketing_advertising: 'marketing_advertising',
  mathematics_statistics: 'mathematics_statistics',
  mechanical_engineering: 'mechanical_engineering',
  medical_billing_coding: 'medical_billing_coding',
  medical_specialist: 'medical_specialist',
  medical_technician: 'medical_technician',
  mental_health: 'mental_health',
  metal_work: 'metal_work',
  military_technologies: 'military_technologies',
  mortuary_funeral_services: 'mortuary_funeral_services',
  music: 'music',
  natural_resources_earth_sciences: 'natural_resources_earth_sciences',
  networking_security: 'networking_security',
  nursing: 'nursing',
  nursing_bsn_to_msn: 'nursing_bsn_to_msn',
  nursing_license_can: 'nursing_license_can',
  nursing_license_lpn: 'nursing_license_lpn',
  nursing_license_medical_assisting: 'nursing_license_medical_assisting',
  nursing_license_rn: 'nursing_license_rn',
  nursing_rn_to_bsn: 'nursing_rn_to_bsn',
  nursing_rn_to_msn: 'nursing_rn_to_msn',
  nutrition_food_science: 'nutrition_food_science',
  occupational_health_safety: 'occupational_health_safety',
  occupational_therapy: 'occupational_therapy',
  operations_process_management: 'operations_process_management',
  optical_optometric: 'optical_optometric',
  organizational_management: 'organizational_management',
  performing_arts: 'performing_arts',
  pharmacology: 'pharmacology',
  philosophy: 'philosophy',
  photography: 'photography',
  physical_health_education: 'physical_health_education',
  physical_therapy: 'physical_therapy',
  physician_assistant: 'physician_assistant',
  physics: 'physics',
  plumbing: 'plumbing',
  political_science_international_relations: 'political_science_international_relations',
  primary_education: 'primary_education',
  private_investigation: 'private_investigation',
  project_management: 'project_management',
  psychology: 'psychology',
  public_policy_administration: 'public_policy_administration',
  public_relations: 'public_relations',
  public_safety_management: 'public_safety_management',
  publishing: 'publishing',
  real_estate: 'real_estate',
  religious_studies: 'religious_studies',
  sales_merchandising: 'sales_merchandising',
  science_math: 'science_math',
  secondary_education: 'secondary_education',
  security_loss_prevention: 'security_loss_prevention',
  sign_language_and_interpretation: 'sign_language_and_interpretation',
  small_engine_maintenance_repair: 'small_engine_maintenance_repair',
  social_science: 'social_science',
  social_services: 'social_services',
  sociology: 'sociology',
  software_development: 'software_development',
  software_engineering: 'software_engineering',
  special_education: 'special_education',
  speech_pathology: 'speech_pathology',
  systems_analysis: 'systems_analysis',
  systems_engineering: 'systems_engineering',
  taxation: 'taxation',
  teacher_professional_development: 'teacher_professional_development',
  technical_support: 'technical_support',
  technician: 'technician',
  telecommunications: 'telecommunications',
  trade_technical: 'trade_technical',
  transportation_distribution: 'transportation_distribution',
  urban_studies: 'urban_studies',
  video_game_design: 'video_game_design',
  web_development_design: 'web_development_design',
  writing: 'writing'
}

/**
 * Permission checker key
 */
export const PERMISSION_CHECKER_KEY = "permission_checker_params_key";

/**
 * api x-api-key constant.
 */
export const X_API_KEY = 'x-api-key';

/**
 * api x-secret constant.
 */
export const X_SECRET = 'x-secret';
