import IB, { InputBaseProps } from "@material-ui/core/InputBase";

export default function InputBase({ ...props }: IInputBaseProps) {
  return <IB {...props} />;
}

interface IInputBaseProps extends InputBaseProps {}
