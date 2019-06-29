import { createEntityStore } from '../entities'
import { dialogRoutines } from './actions'

export const dialogStore = createEntityStore('dialogs', {
  identAttr: 'ident',
  providedBy: [],
  on: {
    [dialogRoutines.close.TRIGGER]: dialog => ({ ...dialog, open: false }),
    [dialogRoutines.open.TRIGGER]: (dialog, { meta }) => ({
      ...dialog,
      meta,
      open: true
    })
  }
})

export function isDialogOpen (state, dialog) {
  return dialogStore.getFlag(state, dialog, 'open')
}

export function getDialogMeta (state, dialog) {
  return dialogStore.getProp(state, dialog, 'meta')
}
