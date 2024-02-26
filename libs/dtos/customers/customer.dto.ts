export interface CustomerDto {
    IdentityUserId: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    Username: string;
    Email: string;
    NationalIdentityNumber: string;
    AvatarUrl: string;
    Status: number;
    BirthYear: number;
    BirthDay: number;
    BirthMonth: number;
    BirthDate: string;  
    ReferralId: string | null;
  }