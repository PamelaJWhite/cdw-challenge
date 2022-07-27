//define the data type for User
export default interface UserType {
  id?: string | null;
  created: string;
  followers: number;
  following: number;
  link: string;
  name: string;
  repos: number;
  gists: number;
  username: string;

  // these will need to be all the fields from the Github API
}