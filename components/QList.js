import React, { memo } from 'react'
import {
    makeStyles,
    Box,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Typography,
    Chip
} from '@material-ui/core'
import { lightGreen } from '@material-ui/core/colors'
import Link from 'next/link'
import moment from 'utils/moment'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    tags: {
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    answers: {
        color: theme.palette.getContrastText(lightGreen[300]),
        backgroundColor: lightGreen[300],
    },
    link: {
        cursor: 'pointer',
        textDecoration: 'none',
        color: theme.palette.primary.main
    }
}))

const QItem = memo(({ item }) => {
    const classes = useStyles()
    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar variant="rounded" className={classes.answers}>
                    {item.question?.answersCount || 0}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Link href={`/question/${item.id}`} passHref>
                        <a className={classes.link}>
                            <Typography>{item.question.title}</Typography>
                        </a>
                    </Link>
                }
                secondary={
                    <Box display="flex">
                        <Box paddingY={1} flexGrow={1} className={classes.tags}>
                            <Tags tags={item.tags} />
                        </Box>
                        <Box marginY={'auto'}>
                            {item.createdAt ? moment(item.createdAt).fromNow() : 'غير معروف'}
                        </Box>
                    </Box>
                }
            />
        </ListItem>
    )
})

function Tags({ tags = [] }) {
    return tags.map(e => 
        <Link href={`/tag/${e.slug}`} passHref key={e.id}>
            <a>
                <Chip label={e.name} color="secondary" variant="default" size="small"/>
            </a>
        </Link>
    )
}

export default function QList({ items = [] }) {
    return (
        <List>
            {
                items.map((e) => (
                    <div key={e.id}>
                        <QItem item={e}/>
                        <Divider variant="inset" component="li"/>
                    </div>
                ))
            }
        </List>
    )
}
