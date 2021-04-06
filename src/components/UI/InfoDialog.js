import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  textoCenter: {
    textAlign: 'center',
  },
}));

function InfoDialog(props) {
  const {
    open,
    title,
    text,
    agreeText,
    disagreeText,
    agreeAction,
    disagreeAction,
  } = props;

  const classes = useStyles();
  const AgreeButton = () => {
    return agreeText ? 
    (
      <Button onClick={agreeAction} color="primary">
        {agreeText}
      </Button>
    ) : (null)
  }

  const DisagreeButton = () => {
    return disagreeText ? 
    (
      <Button onClick={disagreeAction} color="primary">
        {disagreeText}
      </Button> 
    ) : (null)
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={disagreeAction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.textoCenter}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"> {text} </DialogContentText>
        </DialogContent>
        <DialogActions>
          <DisagreeButton></DisagreeButton>
          <AgreeButton></AgreeButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default InfoDialog;
