import { DiscussionsItem } from './DiscussionsItem'
import type { FandomWiki } from 'mw.js'

export class CommentItem extends DiscussionsItem {
	public get article(): string {
		return this._embedded.thread[ 0 ].containerId
	}

	public getUrl( wiki: Required<FandomWiki> ): string {
		let url = `${ wiki.server }${ wiki.scriptpath }/wiki/${ this.article }?commentId=${ this.threadId }`
		if ( this.isReply ) url += `#${ this.id }`
		return url.replace( / /g, '_' )
	}
}
