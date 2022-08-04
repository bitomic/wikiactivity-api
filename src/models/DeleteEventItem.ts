import { LogEventsItem } from './LogEventsItem'
import type { LogEventsResponse } from '../types'

export class DeleteEventItem<Action extends 'delete' | 'restore'> extends LogEventsItem<'delete', Action> {
	public constructor( data: LogEventsResponse ) {
		super( data )
	}

	public isDeleting(): this is DeleteEventItem<'delete'> {
		return this.action === 'delete'
	}

	public isRestoring(): this is DeleteEventItem<'restore'> {
		return this.action === 'restore'
	}
}
