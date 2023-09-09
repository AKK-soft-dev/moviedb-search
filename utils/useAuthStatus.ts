import { useSession } from "next-auth/react";

export default function useAuthStatus() {
  const { status } = useSession();

  const authenticating = status === "loading";
  const authenticated = status === "authenticated";
  const unauthenticated = status === "unauthenticated";
  return { authenticating, authenticated, unauthenticated };
}
