import { AppBar, Toolbar, Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { Link } from 'react-router-dom'

const styles = makeStyles({
    appbar: {
        backgroundColor: "#1D2F71",
        borderBottom: '4px solid #fadf16',
        padding: "8px",
    },
    logo: {
        color: '#fadf16',
        fontFamily: "'Caveat', cursive",
        fontSize: "48px"
    }
})

const FacePayBar = () => {
    const classes = styles()
    return (
        <AppBar className={classes.appbar} position="static">
            <Toolbar>
                <Box className={classes.logo}>
                    FacePay
                </Box>
                <Link to="/" className={classes.menu}>
                    New Transaction
                </Link>
                <Link to="/userRegsiter" className={classes.menu}>
                    Register
                </Link>
                <Link to="/merchantRegister" className={classes.menu}>
                    Merchant Registration
                </Link>
            </Toolbar>
        </AppBar>
    )
}

export default FacePayBar