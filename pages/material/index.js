import { Container, Box, Grid } from '@material-ui/core'
import { makeStyles, styled } from '@material-ui/core/styles'
import Header from '../../layouts/Main'

const useStyles = makeStyles({
    root: {
        background: 'gray',
        padding: '50px'
    },
    first: {
        background: 'green',
        color: 'white',
        margin: '16px' // spacing 1 = 8px   
    }
})

const MyContainer = styled(Container)({
    background: props => props.bg,
    padding: '50px'
})

const Index = () => {
    const classes = useStyles()
    return (
        <>
            <Header />
            <MyContainer maxWidth='lg' bg='cyan'>
                <Grid container direction='row'>
                    <Grid item md={6} xl={8} xs={12}>
                        <Box className={classes.first}>
                            <h1>First</h1>
                        </Box>
                    </Grid>
                    <Grid item md={6} xl={4} xs={12}>
                        <Box m={2} color='white' bgcolor='blue'>
                            <h1>Second</h1>
                        </Box>
                    </Grid>
                </Grid>
            </MyContainer>
        </>
    )
}

export default Index