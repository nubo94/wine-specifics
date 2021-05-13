import { FC } from "react";
import clsx from "clsx";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import { _getRandomInt } from "@/functions";

export interface IText extends TypographyProps {
  className?: any;
  label: string | number;
  height?: number | string;
  isLoading: boolean | string;
  styles:
    | "h1"
    | "h6"
    | "disable"
    | "paragraph"
    | "disableBold"
    | "titlePrimary"
    | "titleSecondary"
    | "h6-primary-color"
    | "paragraphDisable";
}

const Text: FC<IText> = ({
  label,
  height,
  styles,
  className,
  isLoading,
  ...rest
}) => {
  const classes = useStyles();
  return isLoading ? (
    <Typography
      className={clsx(className, classes.default, {
        [classes.h1]: styles === "h1",
        [classes.h6]: styles === "h6",
        [classes.disable]: styles === "disable",
        [classes.paragraph]: styles === "paragraph",
        [classes.disableBold]: styles === "disableBold",
        [classes.titlePrimary]: styles === "titlePrimary",
        [classes.h6PrimaryColor]: styles === "h6-primary-color",
        [classes.paragraphDisable]: styles === "paragraphDisable",
      })}
      {...rest}
    >
      {label}
    </Typography>
  ) : (
    <Skeleton
      variant="text"
      height={height}
      width={`${_getRandomInt(50, 100)}%`}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  default: {},
  disable: {
    color: theme.palette.text.disabled,
  },
  disableBold: {
    lineHeight: 0,
    fontSize: "0.8rem",
    color: theme.palette.text.disabled,
    fontWeight: theme.typography.fontWeightBold,
  },
  h1: {
    lineHeight: 1.4,
    fontSize: "1.5rem",
  },
  h6: {
    lineHeight: 1.4,
    fontSize: "1rem",
    fontWeight: theme.typography.fontWeightBold,
  },
  titlePrimary: {
    fontSize: "0.9rem",
    fontWeight: theme.typography.fontWeightBold,
    color:
      theme.palette.type === "dark"
        ? theme.palette.common.white
        : theme.palette.primary.main,
  },
  titleSecondary: {
    fontSize: "0.9rem",
    fontWeight: theme.typography.fontWeightBold,
    color:
      theme.palette.type === "dark"
        ? theme.palette.common.white
        : theme.palette.text.primary,
  },
  paragraph: {
    fontSize: "0.8rem",
    fontWeight: theme.typography.fontWeightRegular,
    color:
      theme.palette.type === "dark"
        ? theme.palette.common.white
        : theme.palette.text.primary,
  },
  paragraphDisable: {
    fontSize: "0.8rem",
    color: theme.palette.text.disabled,
    fontWeight: theme.typography.fontWeightRegular,
  },
  h6PrimaryColor: {
    lineHeight: 1.4,
    color:
      theme.palette.type === "dark"
        ? theme.palette.common.white
        : theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export default Text;
