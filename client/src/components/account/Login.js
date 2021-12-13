import { withStyles, makeStyles, Checkbox, Dialog, Box, Typography, ListItem, List } from '@material-ui/core';
import { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import { AccountContext } from '../context/AccountContext';
import { UserContext } from '../context/UserContext';
import addUser from '../service/api';

const style = {
    dialog: {
        width: 900,
        height: 900,
        maxHeight: '100%',
        maxWidth: '100%',
        marginTop: '12%',
        overflow: "hidden"
    }
}

const usestyles = makeStyles((theme) => ({
    component: {
        display: "flex",
        margin: "10vh 0 1vh 2vw"
    },
    typography: {
        [theme.breakpoints.down('md')]: {
            fontSize: 21
        },
        fontSize: 24,
        color: "#696969",
        marginBottom: 24,
        fontWeight: "lighter",
        marginLeft: 10
    },
    left: {
        margin: "0 2vw 0 0",
        width: "50vw",
        [theme.breakpoints.down('md')]: {
            width: "100vw"
        }
    },
    list: {
        '& > *': {
            [theme.breakpoints.down('md')]: {
                fontSize: 10
            },
            fontSize: 18,
            lineHeight: "28px"
        },
        [theme.breakpoints.down('md')]: {
            margin: 0,
        }
    },
    bold: {
        [theme.breakpoints.down('md')]: {
            fontSize: 10,
            fontWeight: 700
        },
        fontSize: 18,
        fontWeight: "bold",
        margin: "0 0.5vw 0 0.5vw"
    },
    right: {
        position: "relative"
    },
    qr: {
        width: '18vw',
        height: '35vh',
        margin: '0 3vw 0 0',
        [theme.breakpoints.down('md')]: {
            margin: "12vh 2vw 0 -5vw",
            width: '20vw',
            height: '20vh',

        }
    },
    link: {
        margin: "1vh 0 0 4vw",
        [theme.breakpoints.down('md')]: {
            margin: "1vh 0 0 -7vw",
            fontSize: 9
        }
    },
    checkbox: {
        color: "#00BFA5",
        '&.Mui-checked': {
            color: "#00BFA5",
        },
        '& .MuiSvgIcon-root': { fontSize: 18 },
        [theme.breakpoints.down('md')]: {
            '& .MuiSvgIcon-root': { fontSize: 12 },
        }
    },
    google: {
        position: "absolute",
        left: "40%",
        top: "35%",
        width: "3vw",
        height: "6vh",
        [theme.breakpoints.down('md')]: {
            width: "8vw",
            height: "6vh",
            left: "10%",
            top: "50%",
        }
    },
    bottomSection: {
        margin: "0 0 0 3vw",
        color: "#009688",
        cursor: "pointer",
        fontWeight: 300,
        fontSize: 15,
        [theme.breakpoints.down('md')]: {
            margin: "2vh 0 0 5.5vw",
            fontSize: 10

        }
    }
}))

const Login = ({ classes }) => {

    const classname = usestyles();
    const { setAccount } = useContext(AccountContext)
    const { setnewUser } = useContext(UserContext);

    const onLoginFailure = (response) => {
        console.log("failure", response)
    }

    const onLoginSuccess = async (res) => {
        await addUser(res.profileObj);
        setAccount(res.profileObj)
        setnewUser(prev => !prev)
    }

    return (
        <>
            <Dialog open={true} classes={{ paper: classes.dialog }}
                BackdropProps={{ style: { backgroundColor: "unset" } }}>
                <Box className={classname.component}>
                    <Box className={classname.left}>
                        <Typography className={classname.typography}>To use Whatsapp on your computer:</Typography>
                        <List className={classname.list}>
                            <ListItem key={1}>1. Open whatsapp on your phone</ListItem>
                            <ListItem key={2}>2. Tap <p className={classname.bold}>Menu</p> or<p className={classname.bold}>
                                Settings</p> and select <p className={classname.bold}>Linked Devices</p></ListItem>
                            <ListItem key={3}>3. Point your phone to this screen to capture the code</ListItem>
                        </List>
                    </Box>
                    <Box className={classname.right} >
                        <img className={classname.qr} src="https://www.ginifab.com/feeds/qr_code/img/qrcode.jpg" alt='QR'></img>
                        <GoogleLogin
                            className={classname.google}
                            clientId={"688604241486-hc6o1ob16gplotmgpt2eq9ik1e9orbqr.apps.googleusercontent.com"}
                            isSignedIn={true}
                            onSuccess={onLoginSuccess}
                            onFailure={onLoginFailure}
                            buttonText=""
                            cookiePolicy={'single_host_origin'}
                        />
                        {/*Use buttonText to add any text you want in signin button. 
                           ClientId is taken from console.cloud.google.com project*/}
                        <p className={classname.link}>
                            <Checkbox className={classname.checkbox} defaultChecked color="secondary" />
                            &nbsp;Keep me signed in
                        </p>

                    </Box>
                </Box>
                <Box className={classname.bottomSection}>
                    <Box className={classes.left}>
                        <p>Need help to get started?</p>

                    </Box>
                </Box>
            </Dialog>
        </>
    )
}

export default withStyles(style)(Login);