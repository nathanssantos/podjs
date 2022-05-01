type FetchStatus = "idle" | "fetching" | "success" | "empty" | "error";

type ProviderProps = {
  children: ReactNode;
};

type MessageResponse = { message: string };

type User = {
  id: number;
  email: string;
  username: string;
  avatar: string;
};
