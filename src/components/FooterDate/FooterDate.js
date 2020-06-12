import React from "react";
import Typography from "@material-ui/core/Typography";

export default function FooterDate(props) {
  const { dateTime } = props;
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {dateTime}
      {"."}
    </Typography>
  );
}
