import { BlockEventItem, DeleteEventItem, MoveEventItem, ProtectEventItem, RightsEventItem, UploadEventItem } from './logevents'
import { CommentItem, PostItem } from './discussions'
import type { DiscussionsPostResponse, LogEventsResponse, RecentChangesResponse } from '../types'
import type { ActivityItem } from './ActivityItem'
import { MessageWallItem } from './discussions/MessageWallItem'
import { RecentChangesItem } from './recentchanges'

export const createActivityItem = ( data: RecentChangesResponse | LogEventsResponse | DiscussionsPostResponse ): ActivityItem => {
	if ( 'params' in data ) {
		if ( data.type === 'block' ) {
			return new BlockEventItem( data )
		} else if ( data.type === 'delete' ) {
			return new DeleteEventItem( data )
		} else if ( data.type === 'move' ) {
			return new MoveEventItem( data )
		} else if ( data.type === 'protect' ) {
			return new ProtectEventItem( data )
		} else if ( data.type === 'rights' ) {
			return new RightsEventItem( data )
		} else {
			return new UploadEventItem( data )
		}
	} else if ( '_embedded' in data ) {
		const type = data._embedded.thread[ 0 ].containerType
		if ( type === 'ARTICLE_COMMENT' ) {
			return new CommentItem( data )
		} else if ( type === 'FORUM' ) {
			return new PostItem( data )
		} else {
			return new MessageWallItem( data )
		}
	} else {
		return new RecentChangesItem( data )
	}
}
