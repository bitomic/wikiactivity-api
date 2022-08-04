import { type FandomWiki } from 'mw.js'
import type { LogEventsResponse } from '../types'

export const getLogEvents = async ( wiki: Required<FandomWiki>, from: Date, to: Date ): Promise<LogEventsResponse[]> => {
	const logevents: LogEventsResponse[] = []

	const supportedTypes = new Set( [
		// block
		'block/block', 'block/reblock', 'block/unblock',

		// delete
		'delete/delete', 'delete/restore',

		// move
		'move/move',

		// protect
		'protect/protect', 'protect/modify', 'protect/unprotect',

		// rights
		'rights/rights',

		// upload
		'upload/upload', 'upload/overwrite', 'upload/revert'
	] )

	const activity = wiki.iterQueryList( {
		ledir: 'newer',
		leend: to.toISOString(),
		lelimit: 'max',
		leprop: [ 'comment', 'details', 'ids', 'tags', 'timestamp', 'title', 'type', 'user', 'userid' ],
		lestart: from.toISOString(),
		// letype: [ 'block', 'delete', 'move', 'protect', 'rights', 'upload' ],
		list: 'logevents'
	} )

	for await ( const item of activity ) {
		if ( !supportedTypes.has( `${ item.type }/${ item.action }` ) ) continue

		const log = item as unknown as LogEventsResponse
		log.wiki = wiki.interwiki
		logevents.push( log )
	}

	return logevents
}
