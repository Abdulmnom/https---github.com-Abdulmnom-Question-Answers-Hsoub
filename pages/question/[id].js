import MainLayout from "layouts/Main";
import Router, { useRouter } from "next/router";
import dbConnect from "utils/dbConnect";
import Head from "next/head";
import Posts from "models/post"; 
import { useEffect, useState } from "react";
import usePost from "hooks/usePost";
import { Content, Tags, Vote } from "components/question";
import { Box, Avatar, Typography, makeStyles, Divider, Button } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import { Editor } from "components/inputs";
import useAuth from "hooks/useAuth";
import moment from 'utils/moment'

const useStyles = makeStyles((theme) => ({
    answersTitle: {
        background: theme.palette.background.title,
        padding: theme.spacing(2)
    },
    answerForm: {
        '& > *': {
            margin: theme.spacing(0, 0, 2, 0),
        },
        background: theme.palette.background.title
    }
}));

export default function Show({ params }) {
    const router = useRouter();
    const id = router.query.id;

    useEffect(() => {
        if (!params?.id) Router.replace('/404');
    }, [params]);

    const { data: post, loading, answer, vote } = usePost(params?.id);
    const { user } = useAuth();

    useEffect(() => {
        if (!loading) {
            console.log('Post:', post);
            console.log('Answers:', post?.answers);
            console.log("Vote:", post?.votes);
        }
    }, [loading, post]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!post) {
        return <div>Post not found</div>;
    }
    return (
        <MainLayout title={post?.question?.title} loading={loading}>
            <Head>
                <title>{params?.question?.title || "Post"}</title>
            </Head>
            <Box display='flex' m={2}>
                <Vote votesTotal={post?.votesTotal} vote={type => vote(post?.id, type)} />
                <Content html={post?.content} />
            </Box>
            <QuestionFooter user={post?.user} tags={post?.question?.tags} />
            <Answers items={post?.answers} vote={answer} />
            {user && <AnswerForm onSubmit={answer} />}
        </MainLayout>
    );
}


export async function getStaticPaths() {
    await dbConnect();
    const posts = await Posts.find({ parent: null }).exec();
    const paths = posts.map(e => ({ params: { id: e.id.toString() } }));

    return {
        paths,
        fallback: true
    };
}

export async function getStaticProps({ params }) {
    await dbConnect();

    if(!params?.id) {
        return {notFound: true}
    }
    const post = await Posts.findById(params.id).exec();

    if (!post) {
        return { notFound: true }; // إعادة صفحة 404 إذا لم يتم العثور على المنشور
    }

    return {
        props: {
            params: JSON.parse(JSON.stringify(post))
        },
       
    };
}

function QuestionFooter({ user, tags }) {
    return (
        <Box display='flex' justifyContent='space-between' alignItems='center' p={2}>
            <Box display='flex' alignItems='center'>
                <Avatar src={user?.avatar} alt={user?.name} />
                <Box ml={1}>
                    <strong>{user?.name}</strong>
                </Box>
            </Box>
            <Tags tags={tags} />
        </Box>
    );
}

function Answer({ data: { id, content, user, createdAt, votesTotal }, vote }) {
    return (
        <Box p={2}>
            <Box display="flex">
                <Vote votesTotal={votesTotal} vote={vote} />
                <Content html={content} />
            </Box>
            <Box display="flex" marginTop={2}>
                <Avatar>{user?.name.charAt(0)}</Avatar>
                <Box margin="auto" flexGrow={1} marginRight={1}>
                    {user?.name}
                </Box>
                <Typography variant="caption" display="block" margin="auto">
                {moment(createdAt).fromNow()}
                </Typography>
            </Box>
        </Box>
    );
}

function Answers({items, vote}) {
    const classes = useStyles()
    return (
        <>
            <Box className={classes.answersTitle}>
                <Typography variant='h6'>
                    <FormattedMessage id='post.answers' />
                </Typography>
            </Box>
            <Divider />
            {
                items?.map((answer, index) => (
                    <div key={index}>
                        <Answer data={answer} vote={type => vote(answer.id, type)} />
                        <Divider />
                    </div>
                ))
            }
        </>
    );
}


function AnswerForm({ onSubmit }) {
    const classes = useStyles();
    const [content, setContent] = useState('');
    
    const handleSubmit = async () => {
        if (!content.trim()) {
            console.error('Content is required');
            return;
        }

        try {
            await onSubmit({ content });
            setContent(''); // تفريغ الحقل بعد الإرسال
        } catch (error) {
            console.error('Error submitting answer:', error);
        }
    };

    return (
        <Box p={2} className={classes.answerForm}>
            <Editor onChange={setContent} content={content} />
            <Button color="primary" variant="contained" onClick={handleSubmit}>
                <FormattedMessage id='btn.share' />
            </Button>
        </Box>
    );
}




