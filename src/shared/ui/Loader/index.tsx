import { Container, LoaderWrapper } from './styles.tsx';

function Loader() {
  return (
    <Container data-testid="loader">
      <LoaderWrapper />
    </Container>
  );
}

export default Loader;
