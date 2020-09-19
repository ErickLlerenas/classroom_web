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
import ImageIcon from '@material-ui/icons/Image';

export default function SentTask({ title, description, deliveryDate,urls,links}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  console.log("URLS: ",urls);

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
        {urls.map((url,index)=>(
          <a download href={url} key={index}>
        <Button variant="outlined"
                color="secondary"
                startIcon={<ImageIcon />}
        className="margin-top-btn">Foto {index+1}</Button>
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
