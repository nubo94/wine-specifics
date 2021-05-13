import { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core";

// Components
import Form from "@/core/organisms/Form";
import { Grid } from "@/core/atoms";

// Functions
import { _getDoc } from "@/functions";

export default function HomeTemplate({ title, items }) {
  const [storage, setStorage] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    __init__();
  }, []);

  async function __init__() {
    try {
      const data = await _getDoc({ collection: "winesForms", doc: "form" });
      data && setStorage(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Grid container spacing={0} className={classes.root}>
      <Grid item xs={12}>
        <Form title={title} items={items} storage={storage} />
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(8, 30, 0, 30),
    [theme.breakpoints.only("md")]: {
      padding: theme.spacing(8, 20, 0, 20),
    },
    [theme.breakpoints.only("sm")]: {
      padding: theme.spacing(8, 8, 0, 8),
    },
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(8, 2, 0, 2),
    },
  },
}));
