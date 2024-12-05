import { Direction, Favorite, Message, Profile } from "models/types";

export type DashboardState = {
  profile: Profile;
  setData: (profile: Profile) => void;
  removeProfile: () => void;
  setFavorites: (favorites: Favorite[]) => void; // Definir setFavorites con el tipo correcto
  setProfileUser: (userData: Partial<Profile["genericResponseUser"]>) => void;
  addOrUpdateUserDirection: (updatedDirection: Direction) => void;
  setMessages: (messages: Message[]) => void;
};
