import { ActivityItem, ActivityType } from '../ActivityItem'
import type { LogAction, LogEventParameters, LogEventsResponse, LogType } from '../../types'
import type { BlockEventItem } from './BlockEventItem'
import type { MoveEventItem } from './MoveEventItem'
import type { ProtectEventItem } from './ProtectEventItem'
import type { RightsEventItem } from './RightsEventItem'
import type { UploadEventItem } from './UploadEventItem'

export class LogEventsItem<Type extends LogType = LogType, Action extends LogAction = LogAction> extends ActivityItem implements LogEventsResponse<Type, Action> {
	protected _type = ActivityType.LOGEVENTS

	public readonly logid: number
	public readonly ns: number
	public readonly title: string
	public readonly pageid: number
	public readonly logpage: number
	public readonly type: Type
	public readonly action: Action
	public readonly user: string
	public readonly timestamp: string
	public readonly comment: string
	public readonly params: LogEventParameters<Type, Action>

	public constructor( data: LogEventsResponse ) {
		super( data.wiki )
		this.logid = data.logid
		this.ns = data.ns
		this.title = data.title
		this.pageid = data.pageid
		this.logpage = data.logpage
		// @ts-expect-error - im not dealing with this
		this.type = data.type
		// @ts-expect-error - im not dealing with this
		this.action = data.action
		this.user = data.user
		this.timestamp = data.timestamp
		this.comment = data.comment
		// @ts-expect-error - im not dealing with this
		this.params = data.params
	}

	public get date(): Date {
		return new Date( this.timestamp )
	}

	public isBlock(): this is BlockEventItem<'block' | 'reblock' | 'unblock'> {
		return this.type === 'block'
	}

	public isMove(): this is MoveEventItem {
		return this.type === 'move'
	}

	public isProtect(): this is ProtectEventItem<'modify' | 'protect' | 'unprotect'> {
		return this.type === 'protect'
	}

	public isRights(): this is RightsEventItem {
		return this.type === 'rights'
	}

	public isUpload(): this is UploadEventItem<'overwrite' | 'revert' | 'upload'> {
		return this.type === 'upload'
	}
}
