import React, { useState } from "react";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AssignmentReturnedIcon from "@material-ui/icons/AssignmentReturned";
import BackupIcon from "@material-ui/icons/Backup";
import { db } from "../firebase";

function Task({ title, description , userName,id }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const sendHomeWork = async ()=>{
    let temp = [];
    const docRef = db.collection("students").doc(userName.toUpperCase());
      docRef.get().then((doc)=>{
        if(doc.exists){
          temp = [...doc.data().doneTasks];
          temp.push({
            title:title,
            description:description,
            id:id
          })
          db.collection("students").doc(userName.toUpperCase()).update({
            doneTasks: temp
        })
        }
      })
  }
  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h6" className="title">
          {title}
        </Typography>

        <Typography color="textSecondary" className="margin">
          Fecha de entrega: 22/08/2020
        </Typography>
        <Typography color="textSecondary">{description}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AssignmentReturnedIcon />}
                className="margin"
              >
                TAREA.DOCX
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AssignmentReturnedIcon />}
                className="margin"
              >
                PRESENTACION.PPT
              </Button>
              <Button
                variant="outlined"
                color="primary"
                href="#outlined-buttons"
              >
                Enlace
              </Button>
            </Grid>
          </Grid>
          <Button variant="outlined" color="primary" className="upload">
            <BackupIcon style={{ fontSize: 40 }} />
          </Button>
          <Button variant="contained" color="primary" className="center" onClick={sendHomeWork}>
            Entregar
          </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "red[500]",
  },
}));

export default Task;
