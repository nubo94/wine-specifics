import { Grid as GD, GridProps } from "@material-ui/core";

interface IGridProps extends GridProps {}

export default function Grid({ ...props }: IGridProps) {
  return <GD {...props} />;
}
