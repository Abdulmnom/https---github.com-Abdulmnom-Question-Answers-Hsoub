import { useState } from 'react';
import { makeStyles, AppBar, Toolbar, Typography, Button, IconButton, Avatar, Menu, MenuItem } from '@material-ui/core';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';
import useAuth from 'hooks/useAuth';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        cursor: 'pointer',
    },
    link: {
        color: theme.palette.text.primary,
        marginLeft: theme.spacing(2),
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
}));

export default function Header() {
    const classes = useStyles();
    const { user, logout } = useAuth();

    return (
        <AppBar position="static" variant="outlined">
            <Toolbar>
                <Link href="/" passHref>
                    <Typography variant="h6" className={classes.title}>
                        <FormattedMessage id="app.name" />
                    </Typography>
                </Link>
                {user ? <UserMenu user={user} logout={logout} classes={classes} /> : <GuestMenu />}
            </Toolbar>
        </AppBar>
    );
}

function GuestMenu() {
    return (
        <Link href="/login" passHref>
            <Button color="inherit" variant="outlined">
                <FormattedMessage id="header.login" />
            </Button>
        </Link>
    );
}

function UserMenu({ user, logout, classes }) {
    const router = useRouter();
    const [menu, setMenu] = useState(null);

    const handleMenu = (event) => setMenu(event.currentTarget);
    const handleClose = () => setMenu(null);

    const handleLogout = async () => {
        setMenu(null);
        await logout();
        router.reload();
    };

    return (
        <div>
            {user?.name}
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <Avatar>{user.name?.charAt(0)}</Avatar>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={menu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                open={Boolean(menu)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => router.push('/profile')}>
                    <FormattedMessage id="header.profile" />
                </MenuItem>
                <MenuItem>
                    <Link href="http://localhost:3000/question/ask" passHref>
                        <a className={classes.link}>
                            <FormattedMessage id="btn.share" />
                        </a>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link href="/tag" passHref>
                      <a className={classes.link}>
                        <FormattedMessage id="btn.tag" />
                      </a>
                    </Link>
              
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <FormattedMessage id="header.logout" />
                </MenuItem>
                
            </Menu>
        </div>
    );
}
