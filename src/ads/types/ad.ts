export interface Photo  {
  url: string;
  description: string;
};

export interface Ad {
  id: number;
  title: string;
  datePublication: Date;
  price: number;
  area: number;
  nbRooms: number;
  photos: Photo[];
  address: {
    street: string;
    town: string;
    postCode: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  applicationUserId: string;
  description: string;
  isPublished: boolean;
}
