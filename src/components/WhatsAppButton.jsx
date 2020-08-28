import React from "react";
import Fab from "@material-ui/core/Fab";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function WhatsAppButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Fab color="primary" className="fab" onClick={handleClickOpen}>
        <WhatsAppIcon fontSize="large" style={{ color: "white" }} />
      </Fab>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      > 
      <DialogContent>
      <h2 className="name">Adriana Josefina Michelle Lopez</h2>
      <img src={require('../assets/teacher.jpeg')} alt="Teacher" className="teacher"></img>
      </DialogContent>
        <h2 className="center-text">
          Hola, ¿Tienes alguna duda?
        </h2>
        <DialogContent>
          <p className="center-text">
            Mándame un mensaje a mi WhatsApp
          </p>
        </DialogContent>
        <DialogActions>
          <a href="https://wa.me/+523121811727?text=Hola Soy Erick me interesa saber blablablabla" target="_blank" rel="noopener noreferrer">
          <Button onClick={handleClose} color="primary" variant="contained" endIcon={<Icon>send</Icon>} className="button">
            Mensajear
          </Button>
          </a>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default WhatsAppButton;
