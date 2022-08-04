import { LogEventsItem } from './LogEventsItem'
import type { LogEventsResponse } from '../../types'

export class ProtectEventItem<Action extends 'protect' | 'modify' | 'unprotect'> extends LogEventsItem<'protect', Action> {
	public constructor( data: LogEventsResponse ) {
		super( data )
	}

	public isProtecting(): this is ProtectEventItem<'protect'> {
		return this.action === 'protect'
	}

	public isModifying(): this is ProtectEventItem<'modify'> {
		return this.action === 'modify'
	}

	public isUnprotecting(): this is ProtectEventItem<'unprotect'> {
		return this.action === 'unprotect'
	}
}
