import { useState, ChangeEvent } from "react";
import {
  Theme,
  makeStyles,
  withStyles,
  createStyles,
} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { Input } from "@/core/atoms";

export default function Select({ items, _onChange }: SelectProps) {
  const classes = useStyles();
  const [value, setValue] = useState("");

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;
    setValue(value);
    _onChange(event);
  };

  return (
    <FormControl className={classes.root}>
      <NativeSelect
        value={value}
        id="select-native"
        input={<InputStyle />}
        onChange={handleChange}
      >
        {items?.map((i, k) => (
          <option value={i} key={k}>
            {i}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}

interface SelectProps {
  items: string[];
  _onChange: (v: any) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
  })
);

const InputStyle = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      height: "100%",
      fontSize: "0.8rem",
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  })
)(Input);
