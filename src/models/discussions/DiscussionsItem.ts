import { ActivityItem, ActivityType } from '../ActivityItem'
import type { CommentItem } from './CommentItem'
import type { DiscussionsPostResponse } from '../../types'
import type { MessageWallItem } from './MessageWallItem'
import type { PostItem } from './PostItem'

export abstract class DiscussionsItem extends ActivityItem implements DiscussionsPostResponse  {
	protected _type = ActivityType.DISCUSSIONS

	public readonly createdBy: {
		avatarUrl: string
		badgePermission: string
		id: `${ number }`
		name: string
	}
	public readonly creationDate: {
		epochSecond: number
	}
	public readonly creatorId: string
	public readonly creatorIp: string
	public readonly forumId: `${ number }`
	public readonly forumName: string
	public readonly id: `${ number }`
	public readonly isReply: boolean
	public readonly jsonModel: string
	public readonly position: number
	public readonly rawContent: string
	public readonly threadId: `${ number }`
	public readonly title: string
	public readonly _embedded: {
		thread: [
			{
				containerId: string
				containerType: 'ARTICLE_COMMENT' | 'FORUM' | 'WALL'
			}
		]
	}

	public constructor( data: DiscussionsPostResponse ) {
		super( data.wiki )
		this.createdBy = data.createdBy
		this.creationDate = data.creationDate
		this.creatorId = data.creatorId
		this.creatorIp = data.creatorIp
		this.forumId = data.forumId
		this.forumName = data.forumName
		this.id = data.id
		this.isReply = data.isReply
		this.jsonModel = data.jsonModel
		this.position = data.position
		this.rawContent = data.rawContent
		this.threadId = data.threadId
		this.title = data.title
		this._embedded = data._embedded
	}

	public get type(): 'ARTICLE_COMMENT' | 'FORUM' | 'WALL' {
		return this._embedded.thread[ 0 ].containerType
	}

	public isArticleComment(): this is CommentItem {
		return this.type === 'ARTICLE_COMMENT'
	}

	public isMessageWall(): this is MessageWallItem {
		return this.type === 'WALL'
	}

	public isPost(): this is PostItem {
		return this.type === 'FORUM'
	}
}
