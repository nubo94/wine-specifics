import { Box as BX, BoxProps } from "@material-ui/core";

interface IBoxProps extends BoxProps {}

export default function Box({ ...props }: IBoxProps) {
  return <BX {...props} />;
}
