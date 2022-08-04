export type LogType = 'block' | 'delete' | 'move' | 'protect' | 'rights' | 'upload'
export type LogAction = 'block' | 'reblock' | 'restore' | 'protect' | 'modify' | 'unblock' | 'delete' | 'move' | 'unprotect' | 'upload' | 'overwrite' | 'revert' | 'rights'

export type LogEventParameters<Type extends LogType, Action extends LogAction> =
	Type extends 'block'
		? Action extends 'block' | 'reblock'
			? {
				duration: string
				expiry?: string
				flags: string[]
				sitewide: boolean
			}
			: Record<string, never>
	: Type extends 'delete'
		? Action extends 'restore'
			? {
				files: number
				revisions: number
			}
			: Record<string, never>
	: Type extends 'move'
		? {
			supressredirect: boolean
			target_ns: number
			target_title: string
		}
	: Type extends 'protect'
		? Action extends 'protect' | 'modify'
			? {
				cascade: boolean
				description: string
				details: Array<{
					cascade: boolean
					expiry: string
					level: string
					type: string
				}>
			}
		: Record<string, never>
	: Type extends 'rights'
		? {
			newgroups: string[]
			newmetadata: Array<{
				expiry: string
				group: string
			}>
			oldgroups: string[]
			oldmetadata: Array<{
				expiry: string
				group: string
			}>
		}
	: Type extends 'upload'
		? {
			img_sha1: string
			img_timestamp: string
		}
	: Record<string, never>

export interface LogEventsResponse<Type extends LogType = LogType, Action extends LogAction = LogAction> {
	logid: number
	ns: number
	title: string
	pageid: number
	logpage: number
	type: Type
	action: Action
	user: string
	timestamp: string
	comment: string
	params: LogEventParameters<Type, Action>
}
