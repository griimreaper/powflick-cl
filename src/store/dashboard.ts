import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DashboardState } from "./interfaces/interface";
const profileOff = {
  genericResponseUser: {
    phone: "",
    firstName: "",
    email: "",
    lastName: "",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    orders: [],
    reviews: [],
    directions: [],
    couponUsers: [],
  },
  favorites: [],
  messages: [],
  token: null,
  rol: null,
};

export const useDashboardStore = create(
  persist<DashboardState>(
    (set) => ({
      profile: profileOff,
      setData: (profile) => set({ profile }),
      removeProfile: () => set({ profile: profileOff }),
      setFavorites: (favorites) =>
        set((state) => ({
          profile: {
            ...state.profile,
            favorites: favorites,
          },
        })),
      setProfileUser: (userData) =>
        set((state) => ({
          profile: {
            ...state.profile,
            genericResponseUser: {
              ...state.profile.genericResponseUser,
              ...userData,
            },
          },
        })),
      addOrUpdateUserDirection: (updatedDirection) =>
        set((state) => {
          const existingDirectionIndex =
            state.profile.genericResponseUser.directions.findIndex(
              (direction) => direction.id === updatedDirection.id
            );

          if (existingDirectionIndex !== -1) {
            // Si la dirección ya existe, actualizamos la dirección existente
            const updatedDirections = [
              ...state.profile.genericResponseUser.directions,
            ];
            updatedDirections[existingDirectionIndex] = updatedDirection;

            return {
              profile: {
                ...state.profile,
                genericResponseUser: {
                  ...state.profile.genericResponseUser,
                  directions: updatedDirections,
                },
              },
            };
          } else {
            // Si la dirección no existe, agregamos una nueva dirección
            return {
              profile: {
                ...state.profile,
                genericResponseUser: {
                  ...state.profile.genericResponseUser,
                  directions: [
                    ...state.profile.genericResponseUser.directions,
                    updatedDirection,
                  ],
                },
              },
            };
          }
        }),
    }),
    {
      name: "dashboard-storage", // Nombre para la clave de almacenamiento local
    }
  )
);
