import BaseService from './generic-service'
import { VoteModel, VoteType } from '../models/vote-model'
import { VoteResponseDTO } from '../models/dto/votes/vote-response-dto'
import Axios from 'axios'

export default class VotesService extends BaseService<VoteModel> {
  constructor(apiUrl: string) {
    super(apiUrl)
  }

  
}
