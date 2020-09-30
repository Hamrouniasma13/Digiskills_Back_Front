import React from "react";
import Chip from "@material-ui/core/Chip";
import BackspaceIcon from "@material-ui/icons/Backspace";
const CoursesTags = ({ course, DeleteCourse, index, setFieldValue }) => {
  return (
    <Chip
      label={course}
      onDelete={() => DeleteCourse(index, setFieldValue)}
      deleteIcon={<BackspaceIcon />}
      variant="outlined"
    />
  );
};

export default CoursesTags;
