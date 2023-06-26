import { Form } from "react-bootstrap";
type UserData = {
  username: string;
};
type UsernameProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
};

export function UserFormUsername({ username, updateFields }: UsernameProps) {
  return (
    <>
      <div className='text-center my-3'>
        What should we call you? <br />
        This will be how you appear to others on Tumblr, and your URL. Don't
        worry, you can change this later.
      </div>
      <Form.Group>
        <Form.Control
          type='text'
          placeholder='௹ Blog name'
          required
          value={username}
          onChange={e => updateFields({ username: e.target.value })}
        />
      </Form.Group>
    </>
  );
}
