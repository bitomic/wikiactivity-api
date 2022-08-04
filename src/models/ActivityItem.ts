import type { RecentChangesItem } from './RecentChangesItem'

export enum ActivityType {
	LOGEVENTS,
	RECENTCHANGES
}

export abstract class ActivityItem {
	protected abstract _type: ActivityType

	public isRecentChanges(): this is RecentChangesItem {
		return this._type === ActivityType.RECENTCHANGES
	}
}
