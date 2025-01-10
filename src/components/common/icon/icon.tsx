import { ArrowRightLeft, ChevronDown, LoaderCircle } from "lucide-react";
const Primitive = ({ color = "primary", ...props }: IconProps) => {
  return (
    <span
      {...props}
      style={{ color: `var(--${color}` }}
      className={"text-primary"}
    >
      {props.children}
    </span>
  );
};

export const Icon = {
  Primitive,
  Swap: ArrowRightLeft,
  Loading: LoaderCircle,
  ChevronDown: ChevronDown,
};
