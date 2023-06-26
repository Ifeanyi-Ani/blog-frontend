import { Form } from "react-bootstrap";
type UserData = {
  password: string;
  confirm_password: string;
};
type UserFormPasswordProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
};
export function UserFormPassword({
  password,
  confirm_password,
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
          value={confirm_password}
          onChange={e => updateFields({ confirm_password: e.target.value })}
        />
      </Form.Group>
    </>
  );
}
