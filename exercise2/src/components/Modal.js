import { useState } from "react";
import { useFormik } from "formik";
import { styled } from "@mui/material/styles";
import * as Yup from "yup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl } from "@mui/base";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const Modal = () => {
  const [show, setShow] = useState(true);
  const open = () => setShow(true);
  const close = () => setShow(false);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      gender: "",
      message: "",
      email: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Required"),
      gender: Yup.string(),
      email: Yup.string().email("Invalid email address").required("Required"),
      message: Yup.string(),
    }),
    onSubmit: (values) => {
      fetch("http://localhost:3001/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      close();
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <Button variant="contained" color="success" onClick={() => open()}>
        Open Modal
      </Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={show}
        onClose={close}
        onSubmit={formik.handleSubmit}
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Send Message</DialogTitle>
          <IconButton
            onClick={() => close()}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  type="text"
                  name="fullName"
                  fullWidth
                  variant="outlined"
                  defaultValue={formik.values.fullName}
                  error={
                    formik.touched.fullName && Boolean(formik.errors.fullName)
                  }
                  helperText={formik.touched.fullName && formik.errors.fullName}
                  onChange={formik.handleChange}
                  placeholder="FullName"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl>
                  <Select
                    fullWidth
                    id="gender"
                    name="gender"
                    label="gender"
                    labelId="gender-label"
                    value={formik.values.gender}
                    defaultValue={formik.values.gender}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={"Man"}>Man</MenuItem>
                    <MenuItem value={"Woman"}>Woman</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  fullWidth
                  name="email"
                  variant="outlined"
                  defaultValue={formik.values.email}
                  error={
                    formik.touched.fullName && Boolean(formik.errors.fullName)
                  }
                  helperText={formik.touched.fullName && formik.errors.fullName}
                  onChange={formik.handleChange}
                  placeholder="Enter your email!"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  multiline
                  fullWidth
                  name="message"
                  variant="outlined"
                  defaultValue={formik.values.message}
                  onChange={formik.handleChange}
                  placeholder="Send your message!"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="error" onClick={() => close()}>
              Cancel
            </Button>
            <Button variant="contained" color="success" type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Modal;
