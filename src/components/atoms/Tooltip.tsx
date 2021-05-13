import { useState, FC } from "react";
import { Tooltip as TP, TooltipProps } from "@material-ui/core";

export interface ITooltip extends TooltipProps {
  disabled: boolean;
}

const Tooltip: FC<ITooltip> = ({ children, disabled, ...rest }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    if (!disabled) {
      setOpen(true);
    }
  };

  return (
    <TP
      arrow
      interactive
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      title={rest.title || ""}
      {...rest}
    >
      <span>{children}</span>
    </TP>
  );
};

export default Tooltip;
