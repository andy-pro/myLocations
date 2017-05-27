import * as CONST from './_const'

const categories = {
  container: {
    // paddingHorizontal: 15,
    // maxHeight: 450,
    maxHeight: 'calc(100vh - 260px)',
    overflow: 'auto',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#484',
    cursor: 'pointer',
    backgroundColor: '#eee',
    paddingVertical: 4,
    paddingHorizontal: 15,
    display: 'block',
    marginBottom: 6,
  },
  list: {
  },
  sub: {
    marginLeft: 15
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  item: {
    fontSize: 14,
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginBottom: -1,
    // marginVertical: 2,
    // display: 'inline-block',
    // borderRadius: 5,
    border: '1px solid #ddd',
    cursor: 'pointer',
  },
}

export default categories
