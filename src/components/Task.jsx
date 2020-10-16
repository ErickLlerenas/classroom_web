import React, { useState } from "react";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AssignmentReturnedIcon from "@material-ui/icons/AssignmentReturned";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { db } from "../firebase";
import { storage } from "../firebase";
import Swal from "sweetalert2";
import Icon from "@material-ui/core/Icon";
import LinkIcon from "@material-ui/icons/Link";
import LinearProgress from "@material-ui/core/LinearProgress";

function Task({ title, description, deliveryDate, index, links, taskURL, id }) {
  const classes = useStyles();
  const [userName] = useState(localStorage.getItem("userName"));
  const [expanded, setExpanded] = useState(false);
  const [files, setFiles] = useState([]);
  const [options] = useState({
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [filesCount, setFilesCount] = useState(0);
  let hack = 0;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const sendHomeWork = async (url) => {
    let tempDoneTasks = [];
    let tempTasks = [];
    const docRef = db.collection("students").doc(userName.toUpperCase());
    docRef.get().then(async (doc) => {
      if (doc.exists) {
        tempDoneTasks = [...doc.data().doneTasks];
        tempTasks = [...doc.data().tasks];
        if (links !== undefined) {
          tempDoneTasks.push({
            title: title,
            description: description,
            deliveryDate: deliveryDate,
            id: id,
            ref: url,
            links: links,
          });
        } else {
          tempDoneTasks.push({
            title: title,
            description: description,
            deliveryDate: deliveryDate,
            id: id,
            ref: url,
          });
        }

        tempTasks.splice(index, 1);
        console.log(tempTasks,index);
        console.log(tempDoneTasks,index);

        await db.collection("students").doc(userName.toUpperCase()).update({
          doneTasks: tempDoneTasks,
          tasks: tempTasks,
        });

        setLoading(false);
        Swal.fire({
          title: "¡Tarea entregada!",
          text: "Tu tarea ha sido entregada correctamente",
          icon: "success",
          confirmButtonText: "Volver",
          onClose: refreshPage,
        });
      }
    });
  };

  const refreshPage = () => {
    window.location.reload();
  };
  const uploadFiles = async () => {
    let urls = [];
    setLoading(true);
    files.forEach((file, index) => {
      const uploadTask = storage
        .ref(title + "/" + userName + "/" + file.name)
        .put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          Swal.fire({
            title: "No se ha podido subir el archivo",
            text: "Revisa tu conexión a internet",
            icon: "warning",
            confirmButtonText: "Reintentar",
          });
        },
        (complete) => {
          setIsSent(true);
          storage
            .ref(title)
            .child(userName + "/" + file.name)
            .getDownloadURL()
            .then((url) => {
              urls.push(url);
              setFilesCount(urls.length);
              console.log(index, url, urls);
              if (urls.length === files.length) {
                if(hack===0){//There is an error that uploads the tasks twice, so I haven't really know what is going on, but this hack fixes it
                  hack++;
                  sendHomeWork(urls);
                }
              }
            });
        }
      );
    });
  };

  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      const files = [];
      for (let i = 0; i < e.target.files.length; i++) {
        files.push(e.target.files[i]);
      }
      setFiles(files);
      console.log(files);
    }
  };
  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h6" className="title">
          {title}
        </Typography>

        <Typography color="textSecondary" className="margin">
          Fecha de entrega:{" "}
          {deliveryDate !== undefined &&
            deliveryDate
              .toDate()
              .toLocaleTimeString("es-MX", options)
              .slice(0, -8)}
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
              {taskURL && (
                <Button
                  variant="outlined"
                  color="primary"
                  href={taskURL}
                  startIcon={<AssignmentReturnedIcon />}
                  className="margin"
                >
                  TAREA
                </Button>
              )}

              {links && (
                <Button
                  variant="outlined"
                  color="primary"
                  href={links}
                  target="_blank"
                  startIcon={<LinkIcon />}
                >
                  Enlace
                </Button>
              )}
            </Grid>
          </Grid>
          <Container maxWidth="xs">
            {files.length === 0 ? (
              <label htmlFor="upload-photo" className="upload-btn">
                <input
                  style={{ display: "none" }}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                  multiple
                  onChange={handleChange}
                />

                <Button
                  color="primary"
                  variant="contained"
                  component="span"
                  style={{ width: "100%" }}
                  startIcon={<CloudUploadIcon />}
                >
                  Subir fotos
                </Button>
              </label>
            ) : loading ? (
              <div>
                <LinearProgress
                  className="save-loading"
                  color="secondary"
                  style={{ width: "100%", margin: "20px 0px" }}
                />
                <p style={{ textAlign: "center" }}>
                  {filesCount}/{files.length}
                </p>
              </div>
            ) : (
              !isSent && (
                <div>
                  <Button
                    onClick={uploadFiles}
                    color="secondary"
                    variant="contained"
                    component="span"
                    style={{ width: "100%", margin: "20px 0px" }}
                    endIcon={<Icon>send</Icon>}
                  >
                    Entregar {files.length} fotos
                  </Button>
                </div>
              )
            )}
          </Container>
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
