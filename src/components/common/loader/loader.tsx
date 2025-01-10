import css from "./loader.module.css";
import { Icon } from "..";
export const Loader = () => {
  return (
    <span className={css.spin}>
      <Icon.Primitive color="primary">
        <Icon.Loading />
      </Icon.Primitive>
    </span>
  );
};
