import { photoMan, photoWoman } from "../pages/constants";

export const loadPhotos = (photo, gender) => {
    if (photo === "" && gender === "mujer") {
      return photoWoman;
    } else if(photo === "" && gender === "hombre"){
      return photoMan;
    } else {
      return photo;
    }
  }