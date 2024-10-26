import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../app/hook';
import { CreatePostForm } from '../features/posts/CreatePostForm';
import { BackBtn } from '../ui/shared/BackBtn';
import { GlowHeading } from '../ui/shared/GlowHeading';

const CreatePostPage = () => {
  const { currentUser } = useAppSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/auth/login" replace />;
  }
  return (
    <>
      <div className="mb-8">
        <BackBtn text="Back" />
      </div>

      <CreatePostForm />
    </>
  );
};

export default CreatePostPage;
