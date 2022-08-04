import { Fandom, type FandomWiki } from 'mw.js'
import type { DiscussionsResponse } from '../types'
import { getDiscussionsPages } from './get-discussions-pages'
import { request } from 'undici'

export const getDiscussionsActivity = async ( wiki: Required<FandomWiki>, from: Date, to: Date ) => {
	const path = Fandom.interwiki2path( wiki.interwiki )
	const url = `${ path }/wikia.php?controller=DiscussionPost&method=getPosts&sortDirection=descending&sortKey=creation_date&limit=100&includeCounters=false`
	const { body, statusCode } = await request( url )
	if ( statusCode !== 200  ) return []

	const fromMs = from.getTime()
	const toMs = to.getTime()

	const response = await body.json() as DiscussionsResponse
	const posts = response._embedded[ 'doc:posts' ].filter( post => {
		const created = post.creationDate.epochSecond * 1000
		return created > fromMs && created < toMs
	} )

	const pagesIds = posts.filter( i => i._embedded.thread[ 0 ].containerType === 'ARTICLE_COMMENT' )
		.map( i => i._embedded.thread[ 0 ].containerId )
	const pagesByIds = await getDiscussionsPages( wiki, pagesIds )
	return posts.map( post => {
		if ( post._embedded.thread[ 0 ].containerType === 'ARTICLE_COMMENT' ) {
			const id = post._embedded.thread[ 0 ].containerId
			post._embedded.thread[ 0 ].containerId = pagesByIds[ id ] ?? id
			post.wiki = wiki.interwiki
		}
		return post
	} )
}
