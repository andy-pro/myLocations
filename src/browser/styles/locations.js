import { /*opts,*/ colors } from '../../common/const';

export const locationsCSS = {
  // header: {
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   marginTop: 20,
  //   marginBottom: 6,
  // },
  // item: {
  //   borderBottomColor: '#ccc',
  //   borderBottomWidth: 1,
  //   paddingVertical: 4,
  //   paddingHorizontal: 10,
  //   color: '#555',
  // },
  // itemRow: {
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  title: {
    fontSize: 15,
    // color: '#555',
    fontWeight: '600',
  },
  sectionTitle: {
    color: colors.main,
    fontWeight: '600',
    fontSize: 15,
  },
  section: {
    // backgroundColor: '#ffa',
    backgroundColor: '#e0f0d8',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    padding: 5,
    // marginVertical: 5
  },
  groupMaster: {
    paddingVertical: 5,
  },
  groupInfo: {
    paddingLeft: 10,
  },
  amount: {
    fontSize: 13,
    color: colors.main,
    fontWeight: 'normal',
    marginLeft: 10,
  },
  aux: {
    fontSize: 12,
    fontStyle: 'italic',
    // display: 'inline-block'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  meaning: {
    fontSize: 12,
    color: '#383',
    // paddingRight: 10,
  },
  income: {
    color: '#4a4',
    // fontWeight: 'bold',
  },

  resumeTitle: {
    fontSize: 14,
    // fontStyle: 'italic',
    // fontWeight: '600',
    display: 'block',
  },
  resume: {
    fontSize: 13,
    fontStyle: 'italic',
    // color: '#888'
  },

  badge: {
    color: '#555',
    fontSize: 11,
    backgroundColor: '#ddd',
    paddingHorizontal: 3,
    paddingVertical: 1,
    // marginLeft: 10,
    marginVertical: 2,
    borderRadius: 3,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  summary: {
    fontSize: 14,
    color: '#fff',
    padding: 5,
    borderRadius: 6,
    // borderColor: '#fff',
    // borderWidth: 1,
  },
  summaryR: {
    backgroundColor: '#e99',
  },
  summaryG: {
    backgroundColor: '#6b6',
  },
  summaryView: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 20,
  },
};
