import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: Inter, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
`;

const SearchInput = styled.input`
  display: flex;
  margin: 0 auto;
  width: 400px;
  padding: 10px;
  margin-bottom: 20px;
`;

export { Container, Title, SearchInput };
