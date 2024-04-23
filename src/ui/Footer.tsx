import { Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
export function Footer() {
  return (
    <div className=''>
      <Stack direction='horizontal' gap={3}>
        <Link to='/#'>About</Link>
        <Link to='/#'>Apps</Link>
        <Link to='/#'>Legal</Link>
        <Link to='/#'>Privacy</Link>
      </Stack>
    </div>
  );
}
