import { type FandomWiki } from 'mw.js'
import type { RecentChangesResponse } from '../types'

export const getRecentChanges = async ( wiki: Required<FandomWiki>, from: Date, to: Date ): Promise<RecentChangesResponse[]> => {
	const recentchanges: RecentChangesResponse[] = []

	const activity = wiki.iterQueryList( {
		list: 'recentchanges',
		rcdir: 'newer',
		rcend: to.toISOString(),
		rclimit: 'max',
		rcprop: [
			'comment', 'ids', 'redirect', 'sizes', 'timestamp', 'title', 'user', 'flags'
		],
		rcshow: '!bot',
		rcstart: from.toISOString(),
		rctype: [
			'categorize', 'edit', 'new'
		]
	} )
	for await ( const item of activity ) {
		const rc = item as unknown as RecentChangesResponse
		rc.wiki = wiki.interwiki
		recentchanges.push( rc )
	}

	return recentchanges
}
