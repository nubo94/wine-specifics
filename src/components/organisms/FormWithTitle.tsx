import { Text, Box } from "@/core/atoms";
import InputLabelAndTooltip from "@/core/molecules/InputLabelAndTooltip";

export default function FormWithTitle({
  title,
  items,
  forms,
  spacing,
  _onChange,
  isLoading,
}: FormWithTitleProps) {
  return (
    <Box mb={spacing}>
      <Box mt={2.6}>
        <Text styles="h6" label={title} isLoading={title ? true : false} />
      </Box>
      <Box pl={2}>
        {items
          .filter((f) => f.show)
          .map((i, k) => (
            <InputLabelAndTooltip
              key={k}
              isReady
              value={forms}
              name={i?.type}
              label={i.label}
              isLoading={isLoading}
              _onChange={_onChange}
              variants={i?.variant}
              typeField={i?.typeField}
              isRequired={i?.isRequired}
              description={i.description}
              selects={i?.selects?.map((i) => i.label)}
              hasDependencies={i?.depend ? true : false}
            />
          ))}
      </Box>
    </Box>
  );
}

interface FormWithTitleProps {
  forms: any;
  title: string;
  spacing?: number;
  isLoading: Boolean;
  _onChange?: (v: any) => void;
  items: {
    show: Boolean;
    label: string;
    selects?: any[];
    depend?: Boolean;
    isRequired: Boolean;
    description: string;
    variant: "simple" | "expand";
    typeField?: "text" | "select";
    type:
      | "body"
      | "name"
      | "note"
      | "color"
      | "style"
      | "vintage"
      | "typeOfWine"
      | "testingNote";
  }[];
}
