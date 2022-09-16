export interface RecentChangesResponse {
	anon?: boolean
	comment: string
	minor: boolean
	new: boolean
	newlen: number
	ns: number
	old_revid: number
	oldlen: number
	rcid: number
	redirect?: boolean
	revid: number
	timestamp: string
	title: string
	type: 'edit' | 'new'
	user: string
	wiki: string
}
