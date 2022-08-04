import { LogEventsItem } from './LogEventsItem'
import type { LogEventsResponse } from '../types'

export class RightsEventItem extends LogEventsItem<'rights', 'rights'> {
	public constructor( data: LogEventsResponse ) {
		super( data )
	}
}
