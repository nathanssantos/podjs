import Styles from "./Styles";
import { ButtonProps } from "@mui/material/Button";

export interface CustomButtonProps extends ButtonProps {
  component?: string;
  target?: string;
  rel?: string;
}

const Button = (props: CustomButtonProps) => {
  const {
    children,
    size = "large",
    component = "a",
    rel = "noreferrer",
    href,
    target,
  } = props;

  return (
    <Styles
      size={size}
      component={component}
      href={href}
      target={target}
      rel={rel}
    >
      <div className="background-cover" />
      <div className="children">{children}</div>
    </Styles>
  );
};

export default Button;
