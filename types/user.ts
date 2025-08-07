
import Story from "./story";

 export default interface User {
  _id: string;
  email: string;
  profileName: string;
  stories: Story[];
  image?:string
}