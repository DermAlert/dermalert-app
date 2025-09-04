export type FormForgotPassData = {
  cpf?: string;
}

export type FormLoginData = {
  cpf?: string;
  password?: string;
}

export type FormUserEditEmailData = {
  email?: string;
}

export type FormUserEditPassData = {
  actualPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

export type FormPatientEditEmailData = {
  user?: {
    email?: string;
  }
}

export type FormPatientEditPhoneData = {
  phone_number?: string;
}

export type PatientProps = {
  sus_number?: string,
  phone_number?: string,
  gender?: string,
  other_gender?: string | null,
  date_of_birth?: string,
  user?: {
    id?: number,
    cpf?: string,
    email?: string,
    name?: string
  }
  terms_photos?: string[]
}


export type GeneralHealthProps = {
  surgeries?: string;
  physical_activity_frequency?: string;
  chronic_diseases?: string[];
  medicines?: string[];
  allergies?: string[];
}


export type PersonalFamilyHistoryProps = {
  family_history?: string[];
  family_history_types?: string[];
  patient_cancer_type?: string[];
  removed_injuries?: boolean;
  injuries_treatment?: string[];
}

export type PhototypeAssessmentProps = {
  skin_color?: string;
  eyes_color?: string;
  hair_color?: string;
  freckles?: string;
  sun_exposed?: string;
  tanned_skin?: string;
  sun_sensitive_skin?: string;
  phototype?: string;
  score?: number;
}


export type RiskProtectiveFactorsProps = {
  sun_exposure_period?: string;
  sun_burn?: string;
  uv_protection?: string;
  hat_use?: boolean;
  artifitial_tan?: boolean;
  checkups_frequency?: string;
  cancer_campaigns?: boolean;
}


export type CancerResearchProps = {
  suspicious_moles?: boolean;
  bleed_itch?: boolean;
  how_long?: string;
  lesion_aspect?: boolean;
  diagnosis?: string;
}


export type LesaoOncodermatoProps = {
  lesion_local?: {
    body_part?: string;
    location?: string;
  }
  lesion_images?: string[];
  asymmetry?: string;
  border?: string;
  color_variation?: string;
  diameter?: string;
  evolution?: string;
}


export type LesaoUlceraProps = {
  lesion_local?: {
    body_part?: string;
    location?: string;
  }
  lesion_images?: string[];
  lesion_dimension?: string;
  depth_of_tissue_injury?: string;
  wound_edges?: string;
  wound_bed_tissue?: string;
  exudate_type?: string;
  inflamacao?: string[];
}

export type UlceraHealthHistoryProps = {
  hypertension?: string;
  diabetes?: string;
  deep_vein_thrombosis?: string;
  chronic_venous_insufficiency?: string;
  compression_stockings_use?: string;
}

export type UlceraRiskLifestyleProps = {
  long_periods_posture?: string;
  leg_foot_trauma?: string;
  smoking?: string;
  physical_activity?: string;
}

export type UlceraFamilyHistoryProps = {
  family_leg_ulcers?: string;
  family_varicose_or_circulatory?: string;
}

export type UlceraUlcerInfoProps = {
  how_long?: string;
  treated_elsewhere?: string;
  used_antibiotics?: string;
}

export type UlceraCareSupportProps = {
  has_dressings_available?: string;
  has_help_at_home?: string;
}

export type TagsProps = {
  id?: number,
  name?: string
}

export type LesionProps = {
  id: number,
  user: number,
  location: string,
  type: string,
  created_at: string,
  updated_at: string,
  wounds: [],
  cancer_forms: LesionOncoProps[]
}

export type LesionOncoProps = {
  id: number,
  created_at: string,
  skin_condition: number,
  asymmetry: string,
  border: string,
  color_variation: string,
  diameter: string,
  evolution: string,
  images: LesionImagesProps[]
}

export type LesionUlcerProps = {
  id: number,
  created_at: string,
  skin_condition: number,
  height_mm: number,
  width_mm: number,
  wound_edges: string,
  wound_bed_tissue: string,
  depth_of_tissue_injury: string,
  exudate_type: string,
  increased_pain: boolean,
  perilesional_erythema: boolean,
  perilesional_edema: boolean,
  heat_or_warm_skin: boolean,
  increased_exudate: boolean,
  purulent_exudate: boolean,
  friable_tissue: boolean,
  stagnant_wound: boolean,
  biofilm_compatible_tissue: boolean,
  odor: boolean,
  hypergranulation: boolean,
  wound_size_increase: boolean,
  satallite_lesions: boolean,
  grayish_wound_bed: boolean,
  total_score: number,
  images: LesionImagesProps[]
}

export type LesionImagesProps = {
  id?: number,
  cancer?: number,
  wound?: number,
  image: string
}