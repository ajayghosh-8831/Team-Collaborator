import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import OrganizationBoard from './OrganizationBoard';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  fab: {
    position: 'absolute',
    top: theme.spacing(4),
    right: theme.spacing(6),
    minHeight: 80,
    minWidth: 80,
    color: 'black',
    '&:hover': {
      backgroundColor: '#9AB39A',
    }
  }
});

function WorkContent(props) {
  const { classes } = props;

  return (
    <div className={classes.contentWrapper}>
      
        <OrganizationBoard />
      </div>
  );
}

WorkContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WorkContent);