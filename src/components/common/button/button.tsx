import clsx from "clsx";
import css from "./button.module.css";
export const Button = (props: ButtonProps) => {
  const classNames = clsx(css.button, {
    [css.disabled]: props.disabled,
  });
  return (
    <button className={classNames} {...props}>
      {props.children}
    </button>
  );
};
