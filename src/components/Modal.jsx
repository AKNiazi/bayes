import React from 'react';
import { withStyles } from '@material-ui/styles';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

const defaultProps = {
  label: 'Tournaments',
};

const styles = {
  paper: {
    position: 'absolute',
    width: 600,
    border: '2px solid #000',
    padding: '10px',
  },
};

class DetailModal extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  
  componentWillReceiveProps (np) {
    if(np.data) {
      this.setState({
        open: true,
      });
    }
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  }

  getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  renderDetails(label, data) {
    if (data) {
      return Object.keys(data).map(key => {
        if (typeof data[key] === 'object') {
          return this.renderDetails(key, data[key]);
        }
        return (
          <React.Fragment>
            <div>{label} {key}: {data[key]}</div>
          </React.Fragment>
        )
      });
    }
    return null;
  }

  render() {
    const { data, label } = this.props; 
    const modalStyle = this.getModalStyle();
    const { classes } = this.props;
    return (
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={this.state.open}
        onClose={this.handleClose}
      >
        <Paper style={modalStyle} className={classes.paper}>
          <Grid container justify="space-around">
            <Grid item xs={12} id="modal-title">
              <h2 >Details</h2>
              <Divider/>
            </Grid>  
            <Grid item xs={12} id="modal-description" className="mt-20">
              {
                this.renderDetails(label, data)
              }
            </Grid>
          </Grid>
        </Paper>  
      </Modal>
    );
  }
}

DetailModal.propTypes = propTypes;
DetailModal.defaultProps = defaultProps;


export default withStyles(styles)(DetailModal);
