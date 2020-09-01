import React,{useState} from "react";
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

function WhatsAppButton({userName}) {
  const [open, setOpen] = useState(false);
  const [message] = useState(`https://wa.me/+523123204287?text=Hola maestra Adriana buen día! Soy ${userName} tengo una duda sobre...`)

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
      <h2 className="name">Maestra Adriana</h2>
      <img src={require('../assets/teacher.png')} alt="Teacher" className="teacher"></img>
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
          <a href={message} target="_blank" rel="noopener noreferrer">
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
