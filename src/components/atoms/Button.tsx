import { FC } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { CircularProgress } from "@material-ui/core";
import Button, { ButtonProps } from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";
import makeStyles from "@material-ui/core/styles/makeStyles";

export interface IButton extends ButtonProps {
  label?: string;
  isReady: boolean;
  isLoading?: boolean;
  width?: number | string;
  styles?: "primary" | "secondary" | "third";
  variant?: "text" | "outlined" | "contained";
}

const ButtonComponent: FC<IButton> = ({
  label,
  width,
  styles,
  variant,
  isReady,
  children,
  isLoading,
  disableElevation,
  ...rest
}) => {
  const classes = useStyles();
  const locale = useRouter()?.locale;
  return isReady ? (
    <Button
      name={label}
      aria-label={label}
      lang={locale || "en"}
      data-testid="button-c1"
      variant={variant || "contained"}
      disableElevation={disableElevation || true}
      className={clsx(classes.default, {
        [classes.primary]: styles === "primary",
        [classes.secondary]: styles === "secondary",
        [classes.third]: styles === "third",
      })}
      {...rest}
    >
      {isLoading ? (
        <CircularProgress size={20} className={classes.progress} />
      ) : (
        label
      )}
    </Button>
  ) : (
    <Skeleton
      height={40}
      variant="rect"
      width={width}
      className={classes.load}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  default: {},
  primary: {
    width: "100%",
    fontWeight: "bold",
    height: theme.spacing(4.5),
    borderRadius: theme.spacing(1),
    color:
      theme.palette.type === "dark"
        ? theme.palette.background.paper
        : theme.palette.common.white,
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.common.white
        : theme.palette.primary.main,
    "&:hover": {
      transition: "0.3s",
      backgroundColor:
        theme.palette.type === "dark"
          ? theme.palette.common.white
          : theme.palette.primary.dark,
    },
  },
  secondary: {
    width: "100%",
    fontWeight: "bold",
    height: theme.spacing(4.5),
    borderRadius: theme.spacing(0),
    color:
      theme.palette.type === "dark"
        ? theme.palette.common.white
        : theme.palette.primary.main,
    borderColor:
      theme.palette.type === "dark"
        ? theme.palette.common.white
        : theme.palette.primary.main,
    "&:hover": {
      transition: "0.3s",
      borderColor:
        theme.palette.type === "dark"
          ? theme.palette.common.white
          : theme.palette.primary.main,
    },
  },
  third: {},
  load: {
    width: 150,
    height: theme.spacing(4.5),
    borderRadius: theme.spacing(0),
  },
  progress: {
    color:
      theme.palette.type === "dark"
        ? theme.palette.common.white
        : theme.palette.primary.main,
  },
}));

export default ButtonComponent;
