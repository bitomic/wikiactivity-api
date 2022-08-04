import type { DiscussionsPostResponse, LogEventsResponse, RecentChangesResponse } from '../types'
import type { FandomWiki } from 'mw.js'
import { getDiscussionsActivity } from './get-discussions-activity'
import { getLogEvents } from './get-logs'
import { getRecentChanges } from './get-recentchanges'

type ResponseItem = RecentChangesResponse | LogEventsResponse | DiscussionsPostResponse

export const getActivity = async ( wiki: Required<FandomWiki>, from: Date, to: Date ): Promise<ResponseItem[]> => {
	const data: ResponseItem[] = []
	const recentchanges = await getRecentChanges( wiki, from, to )
	const logevents = await getLogEvents( wiki, from, to )
	const discussions = await getDiscussionsActivity( wiki, from, to )
	data.push( ...recentchanges, ...logevents, ...discussions )

	const getTime = ( item: ResponseItem ): number => {
		if ( 'timestamp' in item ) {
			return new Date( item.timestamp ).getTime()
		} else {
			return item.creationDate.epochSecond * 1000
		}
	}

	data.sort( ( a, b ) => {
		const timeA: number = getTime( a )
		const timeB: number = getTime( b )
		return timeA - timeB
	} )

	return data
}
