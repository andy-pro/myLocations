export const locationAction = (payload, cmd, opts) => ({
  type: 'epic/UPDATE',
  list: 'locations',
  payload,
  cmd, // add, update, del, replace
  opts,
})
