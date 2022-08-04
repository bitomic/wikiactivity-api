import type { DiscussionsItem } from './discussions'
import type { LogEventsItem } from './logevents'
import type { RecentChangesItem } from './recentchanges'

export enum ActivityType {
	DISCUSSIONS,
	LOGEVENTS,
	RECENTCHANGES
}

export abstract class ActivityItem {
	protected abstract _type: ActivityType

	public isDiscussions(): this is DiscussionsItem {
		return this._type === ActivityType.DISCUSSIONS
	}

	public isLogEvents(): this is LogEventsItem {
		return this._type === ActivityType.LOGEVENTS
	}

	public isRecentChanges(): this is RecentChangesItem {
		return this._type === ActivityType.RECENTCHANGES
	}
}
