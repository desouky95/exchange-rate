import { Input } from "..";
import css from "./form-control.module.css";
export const FormControl = ({ label, ...props }: FormControlProps) => {
  return (
    <div className={css.formControl}>
      {label && <label className={css.label}>{label}</label>}
      {props.children && <>{props.children}</>}
      {!props.children && <Input {...props} />}
    </div>
  );
};
