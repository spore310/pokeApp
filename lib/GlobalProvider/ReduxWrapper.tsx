import React from "react";

import { GlobalProvider } from "./ContextWrapper";
import { ReduxProviders } from "../redux/provider";
interface Props {
  children: React.ReactNode;
}
const Index = ({ children }: Props) => {
  return (
    <ReduxProviders>
      <GlobalProvider>{children}</GlobalProvider>
    </ReduxProviders>
  );
};

export default Index;
