import { LogEventsItem } from './LogEventsItem'
import type { LogEventsResponse } from '../../types'

export class MoveEventItem extends LogEventsItem<'move', 'move'> {
	public constructor( data: LogEventsResponse ) {
		super( data )
	}

	public get from(): string {
		return this.title
	}

	public get to(): string {
		return this.params.target_title
	}
}
