export const categoryAction = (payload, cmd, opts) => ({
  type: 'epic/UPDATE',
  list: 'categories',
  payload,
  cmd, // add, update, del, replace
  opts,
})
