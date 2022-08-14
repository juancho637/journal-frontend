import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { setActiveNote } from "../../../store/journal";

export const SideBarItem = ({ id, title, body, date, imageUrls = [] }) => {
  const dispatch = useDispatch();
  const shortTitle = useMemo(() => {
    return title.length > 22 ? title.substring(0, 22) + "..." : title;
  }, [title]);

  const onSelectNote = () => {
    dispatch(setActiveNote({ id, title, body, date, imageUrls }));
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onSelectNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={shortTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
