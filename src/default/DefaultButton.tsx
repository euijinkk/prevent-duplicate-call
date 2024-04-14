import { ComponentProps } from "react";

export default function Button(props: ComponentProps<"button">) {
  return (
    <button type="button" {...props}>
      DefaultButton
    </button>
  );
}
