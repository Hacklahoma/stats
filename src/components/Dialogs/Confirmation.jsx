import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@material-ui/core';

/**
 * TODO
 * @param {*} param0
 */
function Confirmation({ open, setModal, confirmationButton, setConfirmed, title }) {
  /**
   * Closes this modal
   */
  const handleClose = () => {
    setModal(null);
  };

  /**
   * Tells caller that user has pressed confirmed
   */
  const handleConfirm = () => {
    setConfirmed(true);
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button variant="contained" style={{ fontWeight: 'bold' }} onClick={handleConfirm} color="secondary">
          {confirmationButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Confirmation;
