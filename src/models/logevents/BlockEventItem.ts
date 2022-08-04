import { LogEventsItem } from './LogEventsItem'
import type { LogEventsResponse } from '../../types'

export class BlockEventItem<Action extends 'block' | 'reblock' | 'unblock'> extends LogEventsItem<'block', Action> {
	public constructor( data: LogEventsResponse ) {
		super( data )
	}

	public get expiryDate(): Date | null {
		if ( this.isBlocking() || this.isReblocking() ) {
			return this.params.expiry ? new Date( this.params.expiry ) : null
		}
		return null
	}

	public isBlocking(): this is BlockEventItem<'block'> {
		return this.action === 'block'
	}

	public isReblocking(): this is BlockEventItem<'reblock'> {
		return this.action === 'reblock'
	}

	public isUnblocking(): this is BlockEventItem<'unblock'> {
		return this.action === 'unblock'
	}
}
