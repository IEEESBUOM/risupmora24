export type RegistrationFormDataType = {
  firstName: string;
  lastName: string;
  nameWithInitials: string;
  universityID: string;
  contactNo: string;
  degree: string;
  department: string;
  cv: FileList;
  photo: FileList;
  email: string;
};

export type RegistrationFormDataSendType = {
  firstName: string;
  lastName: string;
  nameWithInitials: string;
  universityID: string;
  contactNo: string;
  degree: string;
  department: string;
  cvUrl: string;
  imgUrl: string;
  userId: string;
};

export interface CV {
  cv: FileList;
}

export interface Candidate {
  candidate_id: string;
  firstName: string;
  lastName: string;
  nameWithInitials: string;
  universityID: string;
  contactNo: string;
  department: string;
  degree: string;
  cvUrl: string;
  imgUrl: string;
  createdAt: string;
  updatedAt: string;
  prefCompany1: string | null;
  prefCompany2: string | null;
  prefCompany3: string | null;
  prefCompany4: string | null;
  user: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: string;
  image: string | null;
  password: string;
  emailVerifyStatus: boolean;
  createdAt: string;
  updatedAt: string;
  passwordResetToken: string;
  passwordResetTokenExpire: string;
  role: string;
}
