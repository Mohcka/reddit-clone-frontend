import React, { useContext, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'


import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

import { PostModel } from '../../models/post-model'
import { ApiServiceContext } from '../context/ApiContext'
import Post, { PostProps } from '../posts/Post'
import { AuthContext } from '../context/AuthContext'
import { RoutesConfig } from '../../config/routes-config'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    button: {
      marginBottom: theme.spacing(1),
    },
    postsGrid: {
      flexGrow: 1,
    },
  })
)

/**
 * Home page of this application
 */
const Home = () => {
  const classes = useStyles()
  const history = useHistory()

  const { postService } = useContext(ApiServiceContext)
  const { isAuthenticated, userInfo } = useContext(AuthContext)

  const [posts, setPosts] = useState<PostModel[]>([])

  useEffect(() => {
    console.log('getting posts')
    postService
      .getAll()
      .then((resp) => {
        setPosts(resp)
      })
      .catch((err) => {
        console.log(posts)
      })
  }, [])

  const editRedirectHandler = (post: PostModel) => {
    history.push(`${RoutesConfig.posts.edit}/${post.id}`)
  }

  const showPostRedirectHandler = (post: PostModel) => {
    history.push(`${RoutesConfig.posts.show}/${post.id}`)
  }

  return (
    <Container>
      <Typography variant="h4" className={classes.title}>
        Welcome
      </Typography>

      <Link to="/create-post">
        <Button variant="contained" color="primary" className={classes.button}>
          Create a new post
        </Button>
      </Link>

      <Grid
        container
        direction="column"
        spacing={3}
        className={classes.postsGrid}
      >
        {posts.map((post: PostModel, key) => (
          <Grid item key={key}>
            <Post
              postId={post.id}
              postType="Post"
              title={post.postTitle}
              postScore={post.numVotes}
              content={post.postContent}
              userName={post.userName}
              canEdit={post.userId === userInfo.userId && isAuthenticated}
              editRedirectHandler={() => editRedirectHandler(post)}
              showPostRedirectHandler={() => showPostRedirectHandler(post)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Home
