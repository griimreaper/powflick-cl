import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "services/Login";
import { registerUser } from "services/Register";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const response = await login(email, password);

          return {
            id: response.name + '|' + response.tokenExpiration,
            name: response.token,
            email: response.user.rol,
            image: response.image,
          };
        } catch (error: any) {
          throw new Error(`${error.response.data.message}`);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({user, account, profile}) {
      let token: string = '';
      // Se ejecuta después de que un usuario se haya autenticado con éxito
      if (account?.provider === "google") {
        // Si la autenticación se realizó con Google, registra al usuario en tu servidor
        await registerUser({
          email: profile?.email,
          firstName: profile?.name?.split(' ')[0],
          lastName: profile?.name?.split(' ').pop(),
          image: profile?.image,
          provider: "google", // Marcar como autenticado con Google
        });

        const loginResponse = await login(String(profile?.email), null);

        token = loginResponse.token
        user.name = token + '|' + loginResponse.tokenExpiration
        user.email = loginResponse.user.rol
      }
      return true;
    },
  },
  theme: {
    colorScheme: "light",
    brandColor: "#FF0000",
    logo: "/assets/images/logo/SportZone2.png",
  },

  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
