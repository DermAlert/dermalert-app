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