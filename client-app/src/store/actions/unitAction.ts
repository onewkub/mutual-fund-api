export const CHANGE_UNIT = 'CHANGE_UNIT'

export const changeUnitAction = (payload: any) => ({
  type: CHANGE_UNIT,
  payload,
})

export function changeUnit(val: any) {
  return (dispatch: any) => {
    dispatch(changeUnitAction(val))
  }
}
