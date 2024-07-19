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
  nameWithInitials: string;
  universityID: string;
  contactNo: string;
  degree: string;
  department: string;
  cvUrl: string;
  imgUrl: string;
  firstName: string;
  lastName: string;
  user: {
    email: string;
  };
}
