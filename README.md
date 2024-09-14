In Mongoose, hooks (also called middleware) are functions that run before or after certain events in the Mongoose lifecycle, like saving a document, updating, removing, validating, etc. Mongoose hooks allow you to run custom logic when certain actions are triggered.

Here are two types of hooks in Mongoose:
1. **Pre Hooks**: Execute before an event.
2. **Post Hooks**: Execute after an event.

### Commonly Used Hooks:
- `save`: When a document is saved.
- `validate`: When a document is validated.
- `remove`: When a document is removed.
- `update`: When a document is updated.
- `findOneAndUpdate`: When a document is updated using `findOneAndUpdate`.

### Example Usage:

#### Pre Hook:
```js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// Pre-save hook to hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  // Hash the password
  user.password = await someHashFunction(user.password);
  next();
});

const User = mongoose.model('User', userSchema);
```

#### Post Hook:
```js
userSchema.post('save', function (doc) {
  console.log('%s has been saved', doc._id);
});
```

### Other Hook Types:
- `pre('validate')` / `post('validate')`
- `pre('remove')` / `post('remove')`
- `pre('find')` / `post('find')`
- `pre('update')` / `post('update')`
