import { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core";
import flatten from "lodash/flatten";
import values from "lodash/values";
import compact from "lodash/compact";

// Components
import { Text, Grid, Button, Box } from "@/core/atoms";
import FormWithTitle from "@/core/organisms/FormWithTitle";
import { _score, _showFieldsHidden } from "@/functions";
import { _createDoc } from "@/functions";

export default function HomeTemplate({ title, items }) {
  const classes = useStyles();
  const [elements, setElements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ errs: true, fields: null });

  useEffect(() => {
    setElements(items);
  }, []);

  useEffect(() => {
    const updated = _showFieldsHidden(elements, form.fields);
    updated && setElements(updated);
  }, [form.fields]);

  const _onChange = (value) => setForm(value);

  const _disable = () =>
    flatten(elements.map((i) => i.items))
      .filter((f) => f.isRequired)
      .map((i) => form?.fields && Object.keys(form?.fields).includes(i.type))
      .includes(false);

  function _getScore() {
    const length = flatten(elements.map((i) => i.items)).length;
    const value = compact(values(form.fields)).length;
    return _score(length, value, 10);
  }

  async function _handleSubmit() {
    setIsLoading(true);
    try {
      await _createDoc({
        doc: "form",
        collection: "winesForms",
        field: { ...form.fields, score: _getScore() },
      });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  return (
    <Grid container spacing={0} className={classes.root}>
      <Grid item xs={12}>
        <Text styles="h1" isLoading={true} label={`${title}: ${_getScore()}`} />
        {elements?.map((i, k) => (
          <FormWithTitle
            key={k}
            forms={form}
            title={i.title}
            items={i.items}
            isLoading={isLoading}
            _onChange={_onChange}
            spacing={items.length === k + 1 ? 6 : 15}
          />
        ))}
        {elements.length ? (
          <Box width="100%" display="flex" justifyContent="flex-end" mb={5}>
            <Box width={110}>
              <Button
                isReady
                label="Next"
                styles="primary"
                variant="contained"
                isLoading={isLoading}
                onClick={_handleSubmit}
                disabled={form.errs || _disable() || isLoading}
              />
            </Box>
          </Box>
        ) : null}
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(8, 32, 0, 32),
  },
}));
