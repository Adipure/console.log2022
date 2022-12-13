import AppHeader from '../../components/AppHeader'
import AppFooter from '../../components/AppFooter'
import Container from '@mui/material/Container'
import MainSidebar from '../../components/MainSidebar'
import RightSidebar from '../../components/RightSidebar'
import UserHomepage from '../../components/UserHomepage'
import {
  Grid, Box, FormControlLabel, Typography, TextField, Button, Checkbox,
  List, ListItem, Link, ListItemIcon, ListItemText, Divider
} from '@mui/material'
import {
  Send as SendIcon,
  Chat as ChatIcon,
  Search as SearchIcon
} from '@mui/icons-material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import PostCard from '../../components/PostCard'

// Axios
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

const Home = (props) => {
  const navigate = useNavigate();
  const [pagePosts, setPagePosts] = useState([]);
  const [postState, setPostState] = useState({ content: '', topics: [] });

  const handlePostSubmit = (event) => {
    event.preventDefault();
    if (postState.topics.length == 0) {
      alert("Must select atleast 1 topic before posting.");
      return;
    }

    if (postState.content.length == 0) {
      alert("Post must include some text.");
      return;
    }

    //console.log(postState.content);
    axios.post('/api/post',
      {
        content: postState.content,
        topics: postState.topics
      },
      {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` }
      }).then((res) => {
        setPostState({ ...postState, content: '' });
        window.location = '/';
      }).catch(err => {
        console.log(err)
        alert("Failed to make post.");
      })
  }

  const handlePostChange = ({ target: { name, value } }) => setPostState({ ...postState, content: value })

  const handleTopicChange = ({ target: { name, value } }) => {
    let topicsCopy = JSON.parse(JSON.stringify(postState.topics));
    let item = topicsCopy.find((item) => item === name)
    if (item) {
      topicsCopy.splice(topicsCopy.indexOf(name), 1);
    } else {
      topicsCopy.push(name);
    }
    setPostState({ ...postState, topics: topicsCopy });
  }

  useEffect(() => {
    axios.get('/api/post', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then(({ data }) => {
      setPagePosts(data);
    })

  }, [])

  return (
    <>
      <AppHeader />
      <Container>
        <Box sx={{
          display: 'grid',
          columnGap: 3,
          rowGap: 2,
          gridTemplateColumns: 'repeat(5, 1fr)',
        }}>


          <Box sx={{ gridColumn: 'span 5' }}>
            <Typography variant="h4">New post</Typography>
            <TextField
              fullWidth
              sx={{ mt: "1em" }}
              id="outlined-textarea fullWidth"
              label="Send a Post"
              multiline
              rows={4}
              placeholder="Text"
              onChange={handlePostChange}
              className="backgroundColor"
            />
            <FormControlLabel label="APIs" componentsProps={{ typography: { variant: 'h6' } }} control={
              <Checkbox color="success" name="APIs" onChange={handleTopicChange} />
            } />

            <FormControlLabel label="React" componentsProps={{ typography: { variant: 'h6' } }} control={
              <Checkbox name="React" color="default" onChange={handleTopicChange} />
            } />
            <FormControlLabel label="Javascript" componentsProps={{ typography: { variant: 'h6' } }} control={
              <Checkbox name="Javascript" color="secondary" onChange={handleTopicChange} />
            } />
            <FormControlLabel label="MongoDB" componentsProps={{ typography: { variant: 'h6' } }} control={
              <Checkbox name="MongoDB" color="warning" onChange={handleTopicChange} />
            } />


            <Button variant="contained" endIcon={<SendIcon />} onClick={handlePostSubmit}>
              Send
            </Button>
          </Box>

          <Box sx={{ gridColumn: 'span 4' }}>
            {pagePosts.map((elem, i) => <PostCard key={i} post={elem} />)}
          </Box>
          <Box>
            <List>
              <ListItem>
                <ListItemText>Topics</ListItemText>
              </ListItem>
              <Divider />
              <Box>
                <ListItem>
                  <ListItemIcon><ChatIcon /></ListItemIcon>
                  <ListItemText><Link onClick={() => navigate('/topic/APIs')} underline='none' sx={{ cursor: 'pointer', color: 'black' }}>APIs</Link></ListItemText>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon><ChatIcon /></ListItemIcon>
                  <ListItemText><Link onClick={() => navigate('/topic/React')} underline='none' sx={{ cursor: 'pointer', color: 'black' }}>React</Link></ListItemText>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon><ChatIcon /></ListItemIcon>
                  <ListItemText><Link onClick={() => navigate('/topic/Javascript')} underline='none' sx={{ cursor: 'pointer', color: 'black' }}>Javascript</Link></ListItemText>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon><ChatIcon /></ListItemIcon>
                  <Link onClick={() => navigate('/topic/MongoDB')} underline='none' sx={{ cursor:'pointer', color: 'black' }}>MongoDB</Link>
                </ListItem>
                </Box>
              </List>
          </Box>
        </Box>
      </Container>
      <AppFooter />
    </>
  );
}

export default Home
