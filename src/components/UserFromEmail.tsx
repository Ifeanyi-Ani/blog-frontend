import { Form } from "react-bootstrap";
type UserData = {
  email: string;
};
type UserEmailProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
};

export function UserFromEmail({ email, updateFields }: UserEmailProps) {
  return (
    <>
      <div className='text-center my-3'>
        Enter your email to log in or register:
      </div>
      <Form.Group>
        <Form.Control
          type='email'
          placeholder='Email'
          required
          value={email}
          onChange={e => updateFields({ email: e.target.value })}
        />
      </Form.Group>
    </>
  );
}
