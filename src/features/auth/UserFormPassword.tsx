import { Form } from "react-bootstrap";
type UserData = {
  password: string;
  passwordConfirm: string;
};
type UserFormPasswordProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
};
export function UserFormPassword({
  password,
  passwordConfirm,
  updateFields,
}: UserFormPasswordProps) {
  return (
    <>
      {" "}
      <div className='text-center my-3'>
        Welcome to your corner of the internet. Glad you're here.
      </div>
      <Form.Group>
        <Form.Control
          type='password'
          placeholder='Set a password'
          required
          value={password}
          onChange={e => updateFields({ password: e.target.value })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type='password'
          placeholder='Repeat password'
          required
          value={passwordConfirm}
          onChange={e => updateFields({ passwordConfirm: e.target.value })}
        />
      </Form.Group>
    </>
  );
}
