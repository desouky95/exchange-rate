
declare type SelectProps<T> = Omit<
  import("react").HTMLProps<HTMLSelectElement>,
  "onChange" | "value"
> & {
  value?: T;
  onChange?: (value: T) => void;
  renderPlaceholder?: () => React.ReactNode;
  renderValue?: (value: T) => React.ReactNode;
  closeOnChange?: boolean;
  triggerProps?: import("react").ButtonHTMLAttributes;
};
declare type OptionProps = import("react").HTMLProps<HTMLInputElement>;
