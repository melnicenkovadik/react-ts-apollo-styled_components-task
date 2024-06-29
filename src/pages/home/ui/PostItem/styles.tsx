import styled from 'styled-components';
import { Like, Trash } from '@styled-icons/boxicons-regular';

const TrashIcon = styled(Trash)`
  color: #ff9494;

  &:hover {
    color: red;
  }
`;
const LikeIcon = styled(Like)`
  color: white;
`;
const LikeIconActive = styled(Like)`
  color: green;
`;
const PostItemWrapper = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const PostInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  height: auto;
`;

const PostTitle = styled.textarea`
  all: unset;
  margin: 0;
  font-size: 1.4em;
  width: 100%;
  min-height: 10px;
  height: auto;
  color: white;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
  padding-bottom: 10px;
`;

const PostDescription = styled.textarea`
  all: unset;
  margin: 0;
  font-size: 1em;
  width: 100%;
  resize: none;
  overflow: hidden;
  min-height: 10px;
  height: auto;
  box-sizing: border-box;
  color: rgb(207, 255, 255);
`;

const PostButtons = styled.div`
  padding-top: 10px;
  margin-top: 10px;
  border-top: 1px solid #ddd;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  height: 100%;
`;

export {
  PostItemWrapper,
  PostInfo,
  PostTitle,
  PostDescription,
  PostButtons,
  LikeIcon,
  LikeIconActive,
  TrashIcon,
};
