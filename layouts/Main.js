import { makeStyles, Container, Paper, Box, Typography, Divider, Backdrop, CircularProgress } from '@material-ui/core'
import Footer from './/partials/Footer'
import Header from './partials/Header'
import { FormattedMessage } from 'react-intl'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    },
    container: {
        flexGrow: 1,
        display: 'flex',
        padding: 0
    },
    title: {
        padding: theme.spacing(2),
        background: theme.palette.background.title
    },
    content: {
        flexGrow: 1,
        borderBottom: 'none'
    },
    Backdrop: {
        opacity: 0.5,
        background: '#ffffff',
        color: theme.palette.primary.main,
        zIndex: theme.zIndex.drawer +1,
    },
    container: {
        flexGrow:1,
        display:'flex',
        padding: 0
    }
}))

export default function MainLayout({children, title ,loading}) {
const classes = useStyles()

    if(loading) 
        return (
            <Backdrop className={classes.Backdrop} open={loading}>
                <CircularProgress color='inherit'/>
            </Backdrop>
    )
    
    return (
        <div className={classes.root}>
            <Header/>
            <Container maxWidth="lg" component="main" className={classes.container}>
                <Paper square variant="outlined" className={classes.content}>
                    {
                        title &&
                        <>
                            <Box className={classes.title}>
                                <Typography variant="h5">
                                    <FormattedMessage id={title} defaultMessage={title}/>
                                </Typography>
                            </Box>
                            <Divider/>
                        </>
                    }
                    {children}
                </Paper>
            </Container>
            <Footer/>
        </div>
    )
}