import React from 'react'

import { ApiWebService } from '../../services/generic-service';
import PostsService from '../../services/posts-service';

export type IApiProviderContext<T> = ApiWebService<T>

// TODO: make configuration for urls
export const ApiServices = {
  postService: new PostsService(`https://localhost:5001/api/posts`)
}

/**
 * Context used to provide context for making Api calls
 * 
 * Initially set as undefined, type will be specified as the provider is delcared
 * 
   // TODO: use more defined type than any
 */
export const ApiServiceContext = React.createContext(ApiServices);