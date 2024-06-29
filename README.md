# Test Task for Frontend Developer

## Installation

### Install my-project with npm

```bash 
  npm install
```

## Usage/Examples
    
```javascript
    import Component from './styles'

    function App() {
        return <Component />
    }
```

## Feature Slice Design Pattern

### The project is built using the feature slice design pattern. Each feature is a separate folder with its own components, hooks, and styles.

```bash
    src
    ├── components
    │   ├── Button
    │   │   ├── Button.tsx
    │   │   ├── Button.styled.ts
    │   │   └── index.ts
    │   └── Input
    │       ├── Input.tsx
    │       ├── Input.styled.ts
    │       └── index.ts
    ├── features
    │   ├── Item
    │   │   ├── components
    │   │   │   ├── Item.tsx
    │   │   │   ├── Item.styled.ts
    │   │   │   └── index.ts
    │   │   ├── hooks
    │   │   │   ├── useItem.ts
    │   │   │   └── index.ts
    │   │   ├── pages
    │   │   │   ├── ItemPage.tsx
    │   │   │   └── index.ts
    │   │   ├── slices
    │   │   │   ├── itemSlice.ts
    │   │   │   └── index.ts
    │   │   ├── styles
    │   │   │   ├── Item.styled.ts
    │   │   │   └── index.ts
    │   │   └── index.ts
    │   └── index.ts
    ├── hooks
    │   ├── useApp.ts
    │   └── index.ts
    ├── pages
    │   ├── HomePage.tsx
    │   └── index.ts
    ├── store
    │   ├── store.ts
    │   └── index.ts
    ├── App.tsx
    └── index.tsx
```

## Query and Mutation

This is a simple GraphQL API that allows you to get, add, update, and delete items.

## API Reference

#### Get all items

```http
  query {
  item(id: '1') {
    id
    name
  }
}
```

#### Get item

```http
 query {
    item(id: '1') {
      id
      name
    }
  }
```

#### Add item

```http
 mutation {
    updateItem(id: '1', name: 'New Item Name') {
      id
      name
    }
  }
```

#### Update item

```http
 mutation {
    updateItem(id: '1', name: 'New Item Name') {
      id
      name
    }
  }
```

#### Delete item

```http
 mutation {
    deleteItem(id: '1') {
      id
      name
    }
  }
```

## Runnig Tests
### To run tests, run the following command

```bash
  npm run test
```

## Authors

- [@melnicenkovadik](https://www.github.com/melnicenkovadik)

## License

[MIT](https://choosealicense.com/licenses/mit/)
```
# react-ts-apollo-styled_components-task
