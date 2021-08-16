import { createTheme } from '@material-ui/core/styles';
import { amber } from '@material-ui/core/colors/';
import { lightBlue } from '@material-ui/core/colors/';

const theme = createTheme({
	palette: {
		primary: amber,
		secondary: lightBlue,
	},
	colors: {
		bgColor: '#3e3e3e',
		bgLightColor: '#888',
		bgLighterColor: '#DADADA',
		mainAccentColor: '#fecc01',
		mainAccentHover: '#ff9800',
	},
});

export default theme;
