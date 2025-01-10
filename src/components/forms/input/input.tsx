import css from './input.module.css'
export const Input = (props : InputProps) => {

    return <input {...props} className={css.input} />
}