import React, { useReducer } from "react";
import { Box, Button, Icon, TextField, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Webcam from "react-webcam";

const useStyles = makeStyles(theme => ({
    cont: {
        height: 'calc(100vh - 90px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        margin: theme.spacing(2)
    },
    leftIcon: {
        marginRight: theme.spacing(1)
    },
    rightIcon: {
        marginLeft: theme.spacing(1)
    },
    iconSmall: {
        fontSize: 20
    },
    root: {
        padding: theme.spacing(3, 2),
        '& form': {
            marginTop: theme.spacing(2),
            display: 'flex',
            flexDirection: 'column'
        },
        '& img': {
            borderRadius: 8
        }
    },
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        margin: theme.spacing(1),
        width: 400
    }
}));

const UserRegister = () => {
    const classes = useStyles();
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);

    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            name: "",
            pin: ""
        }
    );

    const handleSubmit = async evt => {
        evt.preventDefault();

        let farm = { formInput };
        if (!farm.formInput.name || !farm.formInput.pin || !imgSrc) return
        console.log(farm)

        let data1 = new FormData();
        let data2 = new FormData();
        data1.append('name', farm.formInput.name);
        data1.append('pin', farm.formInput.pin);
        data2.append('file', imgSrc);

        try {
            let data = await fetch('http://localhost:5000/register_customer', {
                method: 'POST',
                body: data1
            })
            console.log(await data.text())
            data = await fetch('http://localhost:5000/register_customer_face', {
                method: 'POST',
                body: data2
            })
            console.log(await data.text())
        } catch (error) {
            console.log(error)
        }
    };

    const handleInput = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput({ [name]: newValue });
    };


    const capture = React.useCallback(
        () => {
            const newImageSrc = webcamRef.current.getScreenshot();
            setImgSrc(newImageSrc)
        },
        [webcamRef]
    );

    return (
        <Box className={classes.cont}>
            <Paper className={classes.root}>
                <Typography variant="h5" component="h3">
                    New User Registration
                </Typography>
                <Typography component="p">Lets being your journey towards new normal...</Typography>
                <form onSubmit={handleSubmit}>
                    {!imgSrc &&
                        (<>
                            <Webcam
                                audio={false}
                                height={200}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                width={400}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={capture}
                                className={classes.button}
                            >
                                Capture image
                            </Button>
                        </>)
                    }
                    {imgSrc &&
                        (<>
                            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img
                                    height={200}
                                    src={imgSrc}
                                // width={400}
                                />
                            </Box>
                            <Button
                                type="submit"
                                variant="outlined"
                                color="primary"
                                onClick={() => setImgSrc(null)}
                                className={classes.button}
                            >
                                Capture again
                            </Button>
                        </>)
                    }
                    <TextField
                        label="Name"
                        id="margin-normal"
                        name="name"
                        defaultValue={formInput.email}
                        className={classes.textField}
                        helperText="Enter your full name"
                        onChange={handleInput}
                    />
                    <TextField
                        label="Pin"
                        id="margin-normal"
                        name="pin"
                        defaultValue={formInput.pin}
                        className={classes.textField}
                        helperText="4 digit pin."
                        onChange={handleInput}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Join
                    </Button>
                </form>
            </Paper>
        </Box>
    )
}

export default UserRegister

const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}