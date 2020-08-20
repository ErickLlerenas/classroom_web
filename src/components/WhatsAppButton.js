import React from 'react';
import Fab from "@material-ui/core/Fab";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

function WhatsAppButton(){
    return(
        <Fab color="primary" className="fab">
        <WhatsAppIcon fontSize="large" style={{ color: "white" }} />
      </Fab>
    );
}

export default WhatsAppButton;