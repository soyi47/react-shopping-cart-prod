import React from "react";
import cn from "classnames";

import Input from "../default/Input";
import styles from "./LabeledInput.module";

const LabeledInput = React.forwardRef(
  ({ id, label, className, feedback, ...rest }, ref) => {
    return (
      <div className={cn(styles.labeledInput, className)}>
        <label htmlFor={id}>{label}</label>
        <Input id={id} {...rest} ref={ref} />
        {feedback && <div className={styles.feedback}>{feedback}</div>}
      </div>
    );
  }
);

LabeledInput.displayName = "LabeledInput";

export default LabeledInput;
