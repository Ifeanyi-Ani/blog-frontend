import { Container, Stack } from "react-bootstrap";

export function ProfileAction() {
  return (
    <Container>
      <Stack direction='vertical' gap={2}>
        <div className='d-flex justify-content-between align-items-center nameCon'>
          <div>
            <span>i-ani</span> <br />
            <span style={{ color: "#acac9e" }}>untitled</span>
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-center nameCon'>
          <div>Posts</div>
          <div style={{ color: "#acac9e" }}>1</div>
        </div>
        <div className='d-flex justify-content-between align-items-center nameCon'>
          <div>Followers</div>
          <div style={{ color: "#acac9e" }}>1</div>
        </div>
        <div className='d-flex justify-content-between align-items-center nameCon'>
          <div>Activity</div>
          <div style={{ color: "#acac9e" }}>_____</div>
        </div>
        <div className='d-flex justify-content-between align-items-center nameCon'>
          <div>Drafts</div>
        </div>
        <div className='d-flex justify-content-between align-items-center nameCon'>
          <div>Queue</div>
        </div>
        <div className='d-flex justify-content-between align-items-center nameCon'>
          <div>Tumblr Blaze</div>
        </div>
        <div className='d-flex justify-content-between align-items-center nameCon'>
          <div>Blog settings</div>
          <div></div>
        </div>
        <div className='d-flex justify-content-between align-items-center nameCon'>
          <div>Mass Post Editor</div>
        </div>
      </Stack>
    </Container>
  );
}
