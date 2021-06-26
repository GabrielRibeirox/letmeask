import '../styles/button.scss'
import { ButtonHTMLAttributes } from "react";
// ButtonHtml fará com que passe todas as propriedades
// de um button html normal
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
};

export function Button({isOutlined = false, ...props}: ButtonProps) {
  return (
    <button 
    className={`button ${isOutlined ? 'outlined' : ''}`}
    {...props}/>


  )
}
