import { usePosts } from 'hooks/usePost';
import { MainLayout } from 'layouts';
import QList from 'components/QList';
import Pages from 'components/Pages';
import { makeStyles, Button, Box, Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Tag from 'models/tag';
import dbConnect from 'utils/dbConnect';

const useStyles = makeStyles((theme) => ({
    titleContainer: {
        display: 'flex',
        padding: theme.spacing(2),
        background: theme.palette.background.title,
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Show({ tag }) {
    const classes = useStyles();
    const router = useRouter();
    const page = router.query.page || 1;

    if (router.isFallback) {
        return <Typography variant="h5">جاري التحميل...</Typography>;
    }

    const { data } = usePosts({ page, tag: tag?.id });

    return (
        <MainLayout>
            <Head>
                <title>{tag?.name}</title>
            </Head>
            <Box className={classes.titleContainer}>
                <Typography variant="h5" className={classes.title}>
                    {tag?.name}
                </Typography>
                <Box marginY="auto">
                    <Link href="/question/ask" passHref>
                        <Button color="secondary" variant="contained" disableElevation size="small">
                            <FormattedMessage id="btn.ask" />
                        </Button>
                    </Link>
                </Box>
            </Box>
            <QList items={data?.items || []} />
            <Pages count={data?.pages} page={Number(page)} />
        </MainLayout>
    );
}

export async function getStaticPaths() {
    try {
        await dbConnect();
        const items = await Tag.find({}).exec();
        const paths = items
        .filter(e => e.slug)
        .map(e => ({ params: { slug: String(e.slug) } }));

        return {
            paths,
            fallback: 'blocking', // استخدم 'blocking' لتحسين التحميل

        };
    } catch (error) {
        console.error('Error fetching tags for static paths:', error);
        return {
            paths: [],
            fallback: true,
        };
    }
}

export async function getStaticProps({ params }) {
    try {
        await dbConnect();
        const tag = await Tag.findOne({ slug: params.slug }).lean();

        if (!tag) {
            return { notFound: true };
        }

        return {
            props: {
                tag: JSON.parse(JSON.stringify(tag)),
            },
            revalidate: 10,
        };
    } catch (error) {
        console.error('Error fetching tag for static props:', error);
        return {
            notFound: true,
        };
    }
}

