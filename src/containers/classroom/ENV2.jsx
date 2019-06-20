import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";

import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import "./Editor/editor.css";

import bgImg from "../../../src/media/images/bg-01.jpg";
import Editor from "./Editor/Editor";

import Nav from "./Nav.jsx";
import Tab from './Chat/Tabs'
const drawerWidth = 350;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    backgroundImage: `url(${bgImg})`
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -(drawerWidth+900)
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: -900
  }
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }
  const handleEditorChange = () => {

  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Nav
        handleMenuIconClick={handleDrawerOpen}
        iconButton={clsx(classes.menuButton, open && classes.hide)}
        appbarclass={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
        title="classRoom Name"
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
  <Tab/>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}>
        <div className={classes.drawerHeader} />
        <Grid
          item
          direction="row"
          
          className={classes.editor}>
          <Grid item>
            <Editor value="<html></htm>" options={{
                mode: "html",
                theme: "material",
                lineNumbers: true
              }}
              change={(editor,data,value) =>handleEditorChange(editor,data,value)}
              />
            
          </Grid>
              <br/>
          <Grid item>
          <Editor value="<html></html>" options={{
                mode: "html",
                theme: "material",
                lineNumbers: true
              }}
              change={(editor,data,value) =>handleEditorChange(editor,data,value)}
              />
          </Grid>
      </Grid>
      </main>
    </div>
  );
}
