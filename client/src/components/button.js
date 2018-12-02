import styled from 'react-emotion';
import { lighten } from 'polished';

const height = 40;
export default styled('button')({
  display: 'block',
  minWidth: 100,
  height,
  margin: '0 auto',
  padding: '3px',
  border: 'none',
  borderRadius: '1px',
  fontFamily: 'arial',
  fontSize: 12,
  lineHeight: '12px',
  fontWeight: 700,
  color: 'white',
  textTransform: 'uppercase',
  backgroundColor: 'purple',
  cursor: 'pointer',
  outline: 'none',
  ':hover': {
    backgroundColor: lighten(0.1, 'purple'),
  },
  ':active': {
    backgroundColor: lighten(0.2, 'purple'),
  },
});
