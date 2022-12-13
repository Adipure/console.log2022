import {
    Container,
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    Input,
    Button,
    Chip,
} from "@mui/material"
import { useNavigate, Link } from "react-router-dom";
import Moment from 'moment-timezone';
import ReactMarkdown from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const PostCard = (props) => {
    const { user, createdAt, content, topics, comments, _id } = props.post;
    const navigate = useNavigate();

    const postStyle = {
        border: "1px solid black",
        borderRadius: "8px",
        padding: "1em",
        marginBottom: "2em",
        bgcolor: "white",
        width: "95%"
    }

    const handleProfileClick = (event) => {
        event.preventDefault();
        navigate('/profile/' + user.username);
    }

    return (
        <Box sx={postStyle}>

            <Box align-items="flex-start" sx={{ display: "flex", cursor: "pointer" }} onClick={handleProfileClick}>
                <Avatar sx={{ margin: "0.5em" }} src={user.avatar}>{user.name[0]}</Avatar>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="h5">{user.name}</Typography>
                    <Typography variant="sub">at {Moment(createdAt).tz('America/Los_Angeles').format('LLLL')}</Typography>
                </Box>

            </Box>
            <ReactMarkdown children={content}

                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <SyntaxHighlighter
                                children={String(children).replace(/\n$/, '')}
                                style={materialDark}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                            />
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        )
                    }
                }}
            />


            <Box>
                <Link to={"/post/" + _id}>{comments.length} comments</Link>
                - Topics: {topics.map((topic, index) => {
                    return (<Chip key={index} label={topic} size="small" color="primary" onClick={() => navigate("/topic/" + topic)} />)
                })}
            </Box>
        </Box>
    )
}

export default PostCard