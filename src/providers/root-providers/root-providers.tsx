import { ReactQueryProvider } from "../react-query-provider";

const RootProviders = ({ children }: { children: React.ReactNode }) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

export { RootProviders };
