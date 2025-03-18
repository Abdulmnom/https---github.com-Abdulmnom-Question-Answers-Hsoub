
import auth from '../../../utils/auth'
import Post from '../../../models/post'
import User from '../../../models/user'



const handler = async (req, res) => {

    if (req.method !== 'POST') return res.status(405).json()

    const user = req.user.id

    const {content, question} = req.body

    await Post.create({
        parent: question,
        content,
        user,
    })

    await Post.findByIdAndUpdate(question, {
        $inc: {
            'question.answersCount': 1
        }
    })

    // Check if the user wants to receive notifications
    const questionAuthor = await User.findById(question.user);
    // if (questionAuthor.notificationPreferences) {
    //     // Logic to send notification to the user
    //     sendNotification(questionAuthor.email, 'New answer to your post');
    // }

    res.status(201).json();

}

export default auth(handler)