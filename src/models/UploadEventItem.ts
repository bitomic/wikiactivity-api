import { LogEventsItem } from './LogEventsItem'
import type { LogEventsResponse } from '../types'

export class UploadEventItem<Action extends 'upload' | 'overwrite' | 'revert'> extends LogEventsItem<'upload', Action> {
	public constructor( data: LogEventsResponse ) {
		super( data )
	}

	public isUploading(): this is UploadEventItem<'upload'> {
		return this.action === 'upload'
	}

	public isOverwriting(): this is UploadEventItem<'overwrite'> {
		return this.action === 'overwrite'
	}

	public isReverting(): this is UploadEventItem<'revert'> {
		return this.action === 'revert'
	}
}
