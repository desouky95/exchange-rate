import { PropsWithChildren, createContext, useContext } from "react";

type SelectContextArgs<ITEM> = {
  value?: ITEM;
  onChange: (value: ITEM) => void;
  selectedRef?: React.RefObject<HTMLDivElement | null>;
  setSelectedRef: (ref: React.RefObject<HTMLDivElement | null>) => void;
};
/* eslint-disable  @typescript-eslint/no-explicit-any */
const SelectContext = createContext<SelectContextArgs<any> | null>(null);

const SelectProvider = <ITEM,>({
  children,
  value,
  onChange,
  setSelectedRef,
  selectedRef,
}: PropsWithChildren<SelectContextArgs<ITEM>>) => (
  <SelectContext.Provider
    value={{ value, onChange, selectedRef, setSelectedRef }}
  >
    {children}
  </SelectContext.Provider>
);

const useSelect = <ITEM,>() => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("useSelect must be used within a SelectProvider");
  }
  return context as unknown as SelectContextArgs<ITEM>;
};

export { SelectProvider, useSelect };
