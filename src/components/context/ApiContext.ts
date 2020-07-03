import React from 'react'

import { ApiWebService } from '../../services/generic-service';
import PostsService from '../../services/posts-service';

export const ApiPostService = new PostsService();

/**
 * Context used to provide context for making Api calls
 * 
 * Initially set as undefined, type will be specified as the provider is delcared
 */
export const ApiServiceContext = React.createContext<ApiWebService<unknown> | unknown>(undefined);