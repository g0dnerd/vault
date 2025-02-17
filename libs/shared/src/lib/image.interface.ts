export enum ImageType {
  CheckIn = 'CHECKIN',
  CheckOut = 'CHECKOUT',
}

export interface Image {
  id: number;
  url: string;
  draftPlayerId: number;
  imageType: ImageType;
}
