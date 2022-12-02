import type { User } from "@prisma/client";
import type { JSXElement } from "solid-js";
import { createContext, useContext } from "solid-js";

const UserContext = createContext<User | null>(null);

export const UserProvider = (props: { children: JSXElement; user: User }) => {
  const user = () => props.user;
  return (
    <UserContext.Provider value={user()}>{props.children}</UserContext.Provider>
  );
};

export function useUser() {
  const user = useContext(UserContext);
  if (user == null) {
    throw new Error(
      "UserProvider#useUser() - context UserContext not initialized"
    );
  }
  return user;
}
