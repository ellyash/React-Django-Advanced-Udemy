import { Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export const CssTextField = withStyles((theme) => ({
	root: {
		'& > *': {
			color: 'white',
			textAlign: 'center',
			fontSize: '1.2rem',
		},
		'& label': {
			color: theme.palette.primary.main,
		},
		'& label.Mui-focused': {
			color: theme.palette.primary.main,
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: theme.palette.primary.main,
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				color: 'white',
				borderColor: theme.palette.primary.main,
			},
			'&:hover fieldset': {
				borderColor: theme.palette.primary.main,
			},
			'&.Mui-focused fieldset': {
				borderColor: theme.palette.primary.main,
			},
		},
	},
}))(TextField);

export const AdminToolTip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: theme.palette.primary.main,
	},
}))(Tooltip);
