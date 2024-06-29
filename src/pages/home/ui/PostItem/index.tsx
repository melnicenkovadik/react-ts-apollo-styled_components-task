import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { IPostItem } from '../../../../shared/types/posts';
import {
  UPDATE_POST_BODY,
  UPDATE_POST_TITLE,
} from '../../../../shared/mutations/updatePost.ts';
import { useMutation } from '@apollo/client';
import { notify, notifyError } from '../../../../utils/notifications.ts';
import { setHeight } from '../../../../utils/setHeight.ts';

import {
  PostItemWrapper,
  PostInfo,
  PostTitle,
  PostDescription,
  PostButtons,
  LikeIcon,
  LikeIconActive,
  TrashIcon,
} from './styles';

const PostItem: FC<IPostItem> = ({ post, toggleLike, deletePost }) => {
  const [title, setTitle] = useState(post.title);
  const [titleError, setTitleError] = useState<string | null>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const [updatePostTitle, { loading: isPostTitleUpdating }] =
    useMutation(UPDATE_POST_TITLE);

  const [body, setBody] = useState(post.body);
  const [bodyError, setBodyError] = useState<string | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [updatePostBody, { loading: isPostBodyUpdating }] =
    useMutation(UPDATE_POST_BODY);

  const validateTitle = (title: string) => {
    if (!title) {
      setTitleError('Title cannot be empty.');
      return false;
    }
    if (title.length > 100) {
      setTitleError('Title cannot exceed 100 characters.');
      return false;
    }
    setTitleError(null);
    return true;
  };

  const validateBody = (body: string) => {
    if (!body) {
      setBodyError('Body cannot be empty.');
      return false;
    }
    setBodyError(null);
    return true;
  };

  const updateTitle = async () => {
    if (!validateTitle(title)) return;
    await updatePostTitle({
      variables: {
        id: +post.id,
        input: {
          title: title,
        },
      },
    })
      .then(() => {
        localStorage.removeItem(`title-${post.id}`);
        setUnsavedChanges({
          ...unsavedChanges,
          title: null,
        });
        notify(`Post title with id ${post.id} updated successfully!`);
      })
      .catch(e => {
        notifyError(e.message);
      });
  };

  const updateDescription = async () => {
    if (!validateBody(body)) return;

    await updatePostBody({
      variables: {
        id: +post.id,
        input: {
          body: body,
        },
      },
    })
      .then(() => {
        // reset unsaved changes
        localStorage.removeItem(`body-${post.id}`);
        setUnsavedChanges({
          ...unsavedChanges,
          body: null,
        });
        notify(`Post description with id ${post.id} updated successfully!`);
      })
      .catch(e => {
        notifyError(e.message);
      });
  };

  useEffect(() => {
    if (descriptionRef.current) {
      setHeight(descriptionRef.current);
    }
    if (titleRef.current) {
      setHeight(titleRef.current);
    }
  }, [title, body]);

  function onChangeTitle(e: ChangeEvent<HTMLTextAreaElement>) {
    setTitle(e.target.value);
    if (titleRef.current) {
      setHeight(titleRef.current);
    }
  }

  function onChangeDescription(e: ChangeEvent<HTMLTextAreaElement>) {
    setBody(e.target.value);
    if (descriptionRef.current) {
      setHeight(descriptionRef.current);
    }
  }

  // unsaved changes

  const [unsavedChanges, setUnsavedChanges] = useState<{
    title: string | null;
    body: string | null;
  }>({
    title: null,
    body: null,
  });

  useEffect(() => {
    if (title !== post.title) {
      localStorage.setItem(`title-${post.id}`, title);
    }
    if (body !== post.body) {
      localStorage.setItem(`body-${post.id}`, body);
    }
  }, [title, body, post.id, post.title, post.body]);

  useEffect(() => {
    const savedTitle = localStorage.getItem(`title-${post.id}`);
    if (savedTitle) {
      setUnsavedChanges(prev => ({
        ...prev,
        title: savedTitle,
      }));
    }
  }, [post.id]);
  useEffect(() => {
    const savedBody = localStorage.getItem(`body-${post.id}`);
    if (savedBody) {
      setUnsavedChanges(prev => ({
        ...prev,
        body: savedBody,
      }));
    }
  }, [post.id]);

  function onReturnUnsavedChangesClick() {
    if (unsavedChanges.title) {
      setTitle(unsavedChanges.title);
      localStorage.removeItem(`title-${post.id}`);
      setUnsavedChanges({
        ...unsavedChanges,
        title: null,
      });
    }
    if (unsavedChanges.body) {
      setBody(unsavedChanges.body);
      localStorage.removeItem(`body-${post.id}`);
      setUnsavedChanges({
        ...unsavedChanges,
        body: null,
      });
    }
  }

  return (
    <PostItemWrapper>
      <PostInfo>
        {titleError && <div style={{ color: 'red' }}>{titleError}</div>}
        <PostTitle
          data-testid="post-title"
          style={{
            opacity: isPostTitleUpdating ? '0.5' : '1',
          }}
          ref={titleRef}
          value={title}
          onChange={onChangeTitle}
          onBlur={updateTitle}
        />
        <PostDescription
          data-testid="post-description"
          style={{
            opacity: isPostBodyUpdating ? '0.5' : '1',
          }}
          ref={descriptionRef}
          value={body}
          onChange={onChangeDescription}
          onBlur={updateDescription}
        />
        {bodyError && <div style={{ color: 'red' }}>{bodyError}</div>}
      </PostInfo>
      <PostButtons>
        <button
          data-testid={`like-button-${post.id}`}
          onClick={() => toggleLike(post.id)}
        >
          {post.liked ? (
            <LikeIconActive data-testid="like-icon-active" size={20} />
          ) : (
            <LikeIcon size={20} />
          )}
        </button>
        <button
          data-testid={`delete-button-${post.id}`}
          onClick={() => deletePost(post.id)}
        >
          <TrashIcon size={20} />
        </button>
        {unsavedChanges.title ? (
          <button
            data-testid={`apply-unsaved-changes-button-${post.id}`}
            onClick={onReturnUnsavedChangesClick}
          >
            <span>Return unsaved</span>
            <span> {unsavedChanges.title ? 'title ' : null}</span>
          </button>
        ) : null}
        {unsavedChanges.body ? (
          <button
            data-testid={`apply-unsaved-changes-button-${post.id}`}
            onClick={onReturnUnsavedChangesClick}
          >
            <span>Return unsaved</span>
            <span> {unsavedChanges.body ? 'description ' : null}</span>
          </button>
        ) : null}
      </PostButtons>
    </PostItemWrapper>
  );
};

export default PostItem;
