import { v4 as uuidv4 } from 'uuid';
export const data = [
  {
    id: '1',
    Task: 'Anh',
    Due_Date: '25-May-2020',
  },
  {
    id: '2',
    Task: 'Nợ',
    Due_Date: '26-May-2020',
  },
  {
    id: '3',
    Task: 'Em',
    Due_Date: '27-May-2020',
  },
  {
    id: '4',
    Task: 'Còn',
    Due_Date: '23-Aug-2020',
  },
];

export const columnsFromBackend = {
  [uuidv4()]: {
    title: 'Đề bài',
    items: data,
  },
  [uuidv4()]: {
    title: 'Đáp án',
    items: [{id: '11'},{id: '12'},{id: '13'},{id: '14'}],
  },
};
