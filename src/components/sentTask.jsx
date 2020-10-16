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
import Button from "@material-ui/core/Button";
import ImageIcon from "@material-ui/icons/Image";
import DeleteIcon from "@material-ui/icons/Delete";
import Swal from "sweetalert2";
import { db } from "../firebase";

export default function SentTask({
  title,
  description,
  deliveryDate,
  urls,
  links,
  id,
  index,
}) {
  const classes = useStyles();
  const [userName] = useState(localStorage.getItem("userName"));
  const [expanded, setExpanded] = useState(false);
  const [options] = useState({
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="card">
      <CardContent>
        <CardActions>
          <IconButton
            onClick={() => {
              Swal.fire({
                title: "¿Seguro que quieres eliminar esta tarea?",
                text: title,
                icon: "warning",
                confirmButtonText: "Eliminar",
                showCloseButton: true,
              }).then((value) => {
                if (value.isConfirmed) {
                  let tempDoneTasks = [];
                  let tempTasks = [];
                  const docRef = db
                    .collection("students")
                    .doc(userName.toUpperCase());
                  docRef.get().then(async (doc) => {
                    if (doc.exists) {
                      tempDoneTasks = [...doc.data().doneTasks];
                      tempTasks = [...doc.data().tasks];
                      
                      //get reference
                      const teacherTasks = db
                        .collection("tasks")
                        .doc(id);
                        teacherTasks.get().then((response)=>{
                          if (links !== undefined) {
                            tempTasks.push({
                              title: title,
                              description: description,
                              deliveryDate: deliveryDate,
                              id: id,
                              links: links,
                              ref: response.data().ref
                            });
                          } else {
                            tempTasks.push({
                              title: title,
                              description: description,
                              deliveryDate: deliveryDate,
                              id: id,
                              ref: response.data().ref
                            });
                          }
    
                          tempDoneTasks.splice(index, 1);
                          console.log(tempTasks, index);
                          console.log(tempDoneTasks, index);
    
                          db.collection("students").doc(userName.toUpperCase()).update({
                            doneTasks: tempDoneTasks,
                            tasks: tempTasks,
                          });
    
                          Swal.fire({
                            title: "Tarea eliminada",
                            text: "Tu tarea ha sido eliminada",
                            icon: "success",
                            confirmButtonText: "Ok",
                            onClose: () => window.location.reload(),
                          });
                       })    
                    }
                  });
                }
              });
            }}
            className={clsx(classes.expand)}
          >
            <DeleteIcon style={{ color: "#f8bb86" }} />
          </IconButton>
        </CardActions>
        <Typography variant="h6" className="title">
          {title}
        </Typography>

        <Typography color="textSecondary" className="margin">
          Fecha de entrega:{" "}
          {deliveryDate !== undefined &&
            deliveryDate.toDate().toLocaleTimeString("es-MX", options)}
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
          {urls.map((url, index) => (
            <a download href={url} key={index}>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<ImageIcon />}
                className="margin-top-btn"
              >
                Foto {index + 1}
              </Button>
            </a>
          ))}
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
