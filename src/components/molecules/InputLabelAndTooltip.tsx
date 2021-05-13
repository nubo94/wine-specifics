import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core";
import { Input, Text, Tooltip, Box, Select } from "@/core/atoms";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

export default function InputWithLabels({
  name,
  label,
  value,
  selects,
  isReady,
  variants,
  typeField,
  isLoading,
  _onChange,
  isRequired,
  placeholder,
  description,
  hasDependencies,
}: IInputWithLabelsProps) {
  const classes = useStyles();

  function _onChangeHandle(e) {
    const v = e.target.value;
    const err = { ...value?.errs, [name]: !_errs(name, v) };
    _onChange({
      fields: {
        ...value?.fields,
        [name]: v.toLowerCase() === "other" ? "" : v,
      },
      errs: isRequired ? Object.keys(err).every((k) => !err[k]) : false,
    });
  }

  function _errs(n: string, v: any) {
    switch (n) {
      case "name":
        return v === null || v === undefined ? null : v.length ? false : true;
      case "vintage":
        return v === null || v === undefined ? null : v.length ? false : true;
      case "color":
        return v === null || v === undefined ? null : v.length ? false : true;
      case "style":
        return v === null || v === undefined ? null : v.length ? false : true;
      default:
        break;
    }
  }

  return (
    <Box display="flex" alignItems="center">
      <Box className={classes.textWrapper}>
        <Text
          label={label}
          styles="paragraph"
          className={classes.label}
          isLoading={label ? true : hasDependencies ? true : false}
        />
        &nbsp;
        {isRequired && (
          <Text
            label="*&nbsp;"
            isLoading={true}
            styles="paragraph"
            className={classes.isRequired}
          />
        )}
      </Box>
      <Box width="100%" display="flex">
        <Box position="relative" top={6} right={6}>
          <Tooltip
            arrow={false}
            placement="left-end"
            interactive={false}
            title={description}
            disabled={!description ? true : false}
          >
            <HelpOutlineIcon fontSize="small" className={classes.helpIcon} />
          </Tooltip>
        </Box>
        <Box
          className={clsx(classes.inputWrapperDefault, {
            [classes.inputWrapperErr]: isRequired
              ? _errs(name, value?.fields?.[name])
              : false,
          })}
        >
          {typeField === "text" ? (
            <Input
              rows={6}
              id={name}
              rowsMax={6}
              name={name}
              type="text"
              placeholder={placeholder}
              className={classes.input}
              onChange={_onChangeHandle}
              multiline={variants === "expand"}
              value={value?.fields?.[name] || ""}
              disabled={isLoading ? true : false || !isReady ? true : false}
              endAdornment={
                isRequired ? (
                  _errs(name, value?.fields?.[name]) ? (
                    <CancelIcon className={classes.iconErr} />
                  ) : (
                    _errs(name, value?.fields?.[name]) === false && (
                      <CheckCircleIcon className={classes.iconSuccess} />
                    )
                  )
                ) : null
              }
            />
          ) : (
            <Select items={selects} _onChange={_onChangeHandle} />
          )}
        </Box>
      </Box>
    </Box>
  );
}

interface IInputWithLabelsProps {
  value?: any;
  label?: string;
  selects?: any[];
  isReady?: Boolean;
  isLoading?: Boolean;
  description?: string;
  placeholder?: string;
  isRequired?: Boolean;
  hasDependencies?: Boolean;
  _onChange?: (v: any) => void;
  typeField?: "text" | "select";
  variants?: "simple" | "expand";
  name:
    | "name"
    | "note"
    | "color"
    | "style"
    | "body"
    | "vintage"
    | "typeOfWine"
    | "testingNote";
}

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    fontSize: 14,
  },
  isRequired: {
    color: theme.status.danger,
  },
  description: {
    fontSize: 10,
  },
  textWrapper: {
    display: "flex",
    alignItems: "center",
    minWidth: 400,
    maxWidth: 400,
    paddingRight: theme.spacing(2),
  },
  inputWrapperDefault: {
    width: "100%",
    minHeight: 40,
    borderWidth: 1,
    display: "flex",
    transition: "0.3s",
    alignItems: "center",
    borderStyle: "solid",
    marginTop: theme.spacing(0.7),
    borderRadius: theme.spacing(1),
    borderColor: theme.palette.divider,
    padding: theme.spacing(0.3, 2, 0.3, 2),
  },
  inputWrapperErr: {
    minHeight: 40,
    borderWidth: 1,
    display: "flex",
    transition: "0.3s",
    alignItems: "center",
    borderStyle: "solid",
    marginTop: theme.spacing(0.7),
    borderRadius: theme.spacing(1),
    borderColor: theme.status.danger,
    padding: theme.spacing(0.3, 2, 0.3, 2),
  },
  input: {
    width: "100%",
    fontSize: "0.8rem",
  },
  iconSuccess: {
    transition: "0.3s",
    fontSize: theme.spacing(2),
    color: theme.status.success,
  },
  iconErr: {
    transition: "0.3s",
    fontSize: theme.spacing(2),
    color: theme.status.danger,
  },
  helpIcon: {
    transition: "0.3s",
    color: theme.palette.text.disabled,
    "&:hover": {
      transition: "0.3s",
      color: theme.palette.text.primary,
    },
  },
}));
