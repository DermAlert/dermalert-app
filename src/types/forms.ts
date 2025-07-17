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
  email?: string;
}

export type FormPatientEditPhoneData = {
  phone?: string;
}

export type PatientProps = {
  name?: string;
  cpf?: string;
  date_of_birth?: string;
  gender?: string;
  email?: string;
  phone_number?: string;
  sus_number?: string;
}

export type GeneralHealthProps = {
  surgeries?: string;
  physical_activity_frequency?: string;
  chronic_diseases?: string[];
  medicines_ids?: string[];
  allergies_ids?: string[];
}


export type PersonalFamilyHistoryProps = {
  family_history?: string[];
  family_history_cancer?: string[];
  cancer_type?: string[];
  removed_injuries?: string;
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
}


export type RiskProtectiveFactorsProps = {
  sun_exposure_period?: string;
  sun_burn?: string;
  uv_protection?: string;
  hat_use?: string;
  artifitial_tan?: string;
  checkups_frequency?: string;
  cancer_campaigns?: string;
}


export type CancerResearchProps = {
  suspicious_moles?: string;
  bleed_itch?: string;
  how_long?: string;
  lesion_aspect?: string;
  doctor_assistance?: string;
}


export type LesaoOncodermatoProps = {
  lesion_local?: string;
  lesion_images?: string[];
  symmetry?: string;
  borders?: string;
  color_variation?: string;
  size?: string;
  changed?: string;
}