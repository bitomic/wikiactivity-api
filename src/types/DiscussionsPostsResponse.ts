export interface DiscussionsPostResponse {
	createdBy: {
		avatarUrl: string
		badgePermission: string
		id: `${ number }`
		name: string
	}
	creationDate: {
		epochSecond: number
	}
	creatorId: string
	creatorIp: string
	forumId: `${ number }`
	forumName: string
	id: `${ number }`
	isReply: boolean
	jsonModel: string
	position: number
	rawContent: string
	threadId: `${ number }`
	title: string
	_embedded: {
		thread: [
			{
				containerId: string
				containerType: 'ARTICLE_COMMENT' | 'FORUM' | 'WALL'
			}
		]
	}
	wiki: string
}

export interface DiscussionsResponse {
	_embedded: {
		'doc:posts': DiscussionsPostResponse[]
	}
}
