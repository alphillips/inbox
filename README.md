# Inbox

Inbox as reusable component


## Usage

### Install
```
npm i @react-ag-components/inbox --save
```
### Use in your project
```
import {Inbox} from '@react-ag-components/inbox'
```
Your page should look like this
```
constructor(props) {
  super(props);
  this.state = {
    id:props.params.id || null,
    success:props.success,
    error:props.error,
  }
}

componentWillReceiveProps(nextProps){
  this.setState((prevState, props) => ({
    success:'',
    id:nextProps.params.id || null
  }))
}

handleIdChange = (id) => {
  hashHistory.push('/inbox/')
}

render() {
  return (
    <div>

      <Inbox />

    </div>
  )
}
```


## Contributing

Get the repository
```
git clone https://github.com/alphillips/inbox.git
```

Update dependencies
```
npm install
```

Run the project
```
npm start
```

### Deploy to npm
#### Build
`npm run build -- --copy-files`

#### Publish
`npm publish --access public`
