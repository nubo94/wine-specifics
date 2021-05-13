import { useState, useEffect } from "react";
import flatten from "lodash/flatten";
import values from "lodash/values";
import compact from "lodash/compact";

// Components
import { Text, Grid, Button, Box } from "@/core/atoms";
import FormWithTitle from "@/core/molecules/FormWithTitle";

// Functions
import { _score, _createDoc, _updateDoc, _showFieldsHidden } from "@/functions";

export default function HomeTemplate({ title, items, storage }) {
  const [elements, setElements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ errs: true, fields: null });

  useEffect(() => {
    __init__();
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
    const data = {
      doc: "form",
      collection: "winesForms",
      field: { ...form.fields, score: _getScore() },
    };
    try {
      form?.fields?.score
        ? await _updateDoc(data as any)
        : await _createDoc(data as any);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  async function __init__() {
    setElements(items);
    storage && setForm({ errs: false, fields: storage });
  }

  return (
    <Grid container spacing={0}>
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
