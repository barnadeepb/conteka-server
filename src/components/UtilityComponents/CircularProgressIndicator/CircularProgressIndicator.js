import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import './CircularProgressIndicator.css';

const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
      color: '#fff'
    },
}));

function CircularProgressIndicator() {
    const classes = useStyles();
    const [progress, setProgress] = React.useState(0);
  
    React.useEffect(() => {
      function tick() {
        // reset when reaching 100%
        setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
      }
  
      const timer = setInterval(tick, 20);
      return () => {
        clearInterval(timer);
      };
    }, []);
  
    return (
      <div>
        <CircularProgress className={classes.progress} variant="determinate" value={progress} />
      </div>
    );
  }

export default CircularProgressIndicator;