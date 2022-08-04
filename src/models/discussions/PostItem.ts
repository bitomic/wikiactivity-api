import { DiscussionsItem } from './DiscussionsItem'
import type { FandomWiki } from 'mw.js'
import { getDiscussionsUrl } from '../../utils'

export class PostItem extends DiscussionsItem {
	public get category(): string {
		return this.forumName
	}

	public getUrl( wiki: Required<FandomWiki> ): string {
		return getDiscussionsUrl( wiki, this.threadId, this.isReply ? this.id : undefined )
	}
}
