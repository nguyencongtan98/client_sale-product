import React from "react";
import classNames from "classnames";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { ProductInfo } from "../../types/task";
import { dateToString } from "../../utils/getData";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "#QE8EDED",
      border: "1px solid gray",
      margin: "5px",
      height: "550px",
    },
    card: {
      cursor: "pointer",
      "&:hover": {
        background: "#D8EBE1",
      },
    },
    media: {
      height: 0,
      paddingTop: "70%", // 16:9
      margin: "10px",
      borderRadius: "5px",
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
      backgroundColor: red[500],
    },
  })
);

type ProductInfoProps = {
  product: ProductInfo;
  onAddToCart: (event: React.MouseEvent<HTMLElement>) => void;
};

export const Product = (props: ProductInfoProps): JSX.Element => {
  const classes = useStyles();

  const {
    product: { id, name, description, createDate, image_link },
    onAddToCart,
  } = props;

  return (
    <Card className={classNames(classes.root, classes.card)}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image={image_link}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions style={{ textAlign: "center" }}>
        <Button style={{ background: "gray" }} color="default">
          View detail
        </Button>
        <Button
          id={id as unknown as string}
          onClick={onAddToCart}
          style={{ background: "blue" }}
        >
          Add to cart
        </Button>
        <Button style={{ background: "green" }}>Mua ngay</Button>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
      </CardActions>
    </Card>
  );
};
