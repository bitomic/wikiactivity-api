import { Fandom, type FandomWiki } from 'mw.js'
import { request } from 'undici'

interface DiscussionsPagesResponse {
	articleNames: {
		[ key in `${ number }` ]: {
			relativeUrl: string
			title: string
		}
	}
}

export const getDiscussionsPages = async ( wiki: Required<FandomWiki>, ids: string[] ): Promise<Record<string, string>> => {
	const path = Fandom.interwiki2path( wiki.interwiki )
	const url = `${ path }/wikia.php?controller=FeedsAndPosts&method=getArticleNamesAndUsernames&stablePageIds=${ ids.join( ',' ) }&format=json`
	const { body, statusCode } = await request( url )
	if ( statusCode !== 200 ) return {}

	const response = await body.json() as DiscussionsPagesResponse
	return Object.entries( response.articleNames ).reduce( ( list, [ pageId, item ] ) => {
		list[ pageId ] = item.title
		return list
	}, {} as Record<string, string> )
}
