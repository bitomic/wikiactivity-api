import { DiscussionsItem } from './DiscussionsItem'
import type { FandomWiki } from 'mw.js'

export class MessageWallItem extends DiscussionsItem {
	public get wall(): string {
		return this.forumName.replace( 'Message Wall', '' ).trim()
	}

	public getUrl( wiki: Required<FandomWiki> ): string {
		let url = `${ wiki.server }${ wiki.scriptpath }/wiki/Message Wall:${ this.wall }?threadId=${ this.threadId }`
		if ( this.isReply ) url += `#${ this.id }`
		return url.replace( / /g, '_' )
	}
}
