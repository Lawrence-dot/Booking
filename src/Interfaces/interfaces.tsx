export interface dataType {
  Email: string;
  Tel: number;
  Username: string;
  Balance: number;
  Bank?: account[];
  Type?: string;
}

export interface account {
  type: string;
  name: String;
  number: number;
}

export interface gifttype {
  name: string;
  country: { name: string; rate: number; need: string }[];
}

export interface history {
  type: string;
  name: String;
  card: string;
  id: string;
  status: string;
  date: string;
  amount?: number;
  mail?: string;
  bank?: account;
  remark?: string;
  adminremark?: string;
}

export type HomeType = {
  login: boolean;
  setlogin: (b: boolean) => void;
};

export type navtype = {
  open: boolean;
  setOpen: (b: boolean) => void;
};

export type Apptype = {
  showPreloader: () => void;
  isloggedin: boolean;
  theme: string;
  toggleTheme: () => void;
};

export interface bartype {
  signout: () => void;
}

export interface booking {
  visitorname: string;
  bookingdate: string;
  bookingtime: string;
  id: string;
}
