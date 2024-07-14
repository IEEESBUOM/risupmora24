export type RegistrationFormDataType = {
  firstName: string;
  lastName: string;
  nameWithInitials: string;
  universityID: string;
  contactNo: number;
  degree: string;
  department: string;
  cv: FileList;
  photo: FileList;
  email: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
};

export type Candidate={
 candidate_id: string;
  firstName: string;
  lastName: string;
  nameWithInitials: string;
  universityID: string;
  contactNo: number;
  department: string;
  degree: string;
  cvUrl: string;
  imgUrl: string;
  user: User;
};

