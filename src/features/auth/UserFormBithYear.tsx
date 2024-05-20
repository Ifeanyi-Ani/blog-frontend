import { Form } from "react-bootstrap";
type UserData = {
  dob: string;
};
type UserFormDobProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
};
export function UserFormBithYear({ dob, updateFields }: UserFormDobProps) {
  return (
    <>
      <div className='text-center my-3'>
        <h5>When's your birthday?</h5>
        <span>
          We'll never share this with other users. We're just making sure you're
          old enough to use Tumblr.
        </span>
      </div>
      <Form.Group>
        <Form.Control
          type='date'
          required
          value={dob}
          onChange={e => updateFields({ dob: e.target.value })}
        />
      </Form.Group>
      <div className='text-center'>By clicking "Next":</div>
      <Form.Check
        required
        label='You agree to our Terms of Service and have read our Privacy Policy'
      />
    </>
  );
}
