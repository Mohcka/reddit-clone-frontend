import axios from 'axios'
import BaseService from './generic-service'
import { PostModel } from '../models/post-model'

export default class PostsService extends BaseService<PostModel> {
  constructor() {
    super(`https://localhost:5001/api/posts`)
  }
}
