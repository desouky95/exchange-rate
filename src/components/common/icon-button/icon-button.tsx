import css from "./icon-button.module.css";
import clsx from "clsx";
export const IconButton = ({ size = "md", ...props }: IconButtonProps) => {
  const classNames = clsx(css.iconButton, css[size]);
  return (
    <button className={classNames} {...props}>
      {props.children}
    </button>
  );
};
