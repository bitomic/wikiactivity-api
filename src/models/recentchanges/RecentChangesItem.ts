import { ActivityItem, ActivityType } from '../ActivityItem'
import type { RecentChangesResponse } from '../../types'

export class RecentChangesItem extends ActivityItem implements RecentChangesResponse {
	protected _type = ActivityType.RECENTCHANGES

	public readonly anon: boolean
	public readonly comment: string
	public readonly minor: boolean
	public readonly new: boolean
	public readonly newlen: number
	public readonly ns: number
	public readonly old_revid: number
	public readonly oldlen: number
	public readonly rcid: number
	public readonly redirect: boolean
	public readonly revid: number
	public readonly timestamp: string
	public readonly title: string
	public readonly type: 'edit' | 'new'
	public readonly user: string

	public constructor( data: RecentChangesResponse ) {
		super( data.wiki )
		this.anon = data.anon ?? false
		this.comment = data.comment
		this.minor = data.minor
		this.new = data.new
		this.newlen = data.newlen
		this.ns = data.ns
		this.old_revid = data.old_revid
		this.oldlen = data.oldlen
		this.rcid = data.rcid
		this.redirect = data.redirect ?? false
		this.revid = data.revid
		this.timestamp = data.timestamp
		this.title = data.title
		this.type = data.type
		this.user = data.user
	}

	public get date(): Date {
		return new Date( this.timestamp )
	}

	public get sizediff(): number {
		return this.newlen - this.oldlen
	}
}
