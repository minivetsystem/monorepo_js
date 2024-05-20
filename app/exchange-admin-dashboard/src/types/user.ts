export interface IUser {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
    security_question?: string;
    security_question_id?: string;
    security_answer?: string;
    accessToken?: string;
    _id?: string;
  }
  
  export interface IUserStore {
    userData: IUser;
    questions: IQuestion[];
    countries: ICountry[];
    setCountries: (countries: ICountry[]) => void;
    setQuestions: (questions: IQuestion[]) => void;
    updateUserInfo: (data: IUser) => void;
  }
  
  export interface IQuestion {
    _id: string;
    security_question: string;
  }
  
  export interface ICountry {
    _id: string;
    name: string;
    states: {
      _id: string;
      name: string;
    }[];
  }

  export interface GenericResponse {
    status: string;
    message: string;
  }
  
  export interface ILoginResponse {
    status: string;
    access_token: string;
  }
  
  export interface IUserResponse {
    status: string;
    data: {
      user: IUser;
    };
  }