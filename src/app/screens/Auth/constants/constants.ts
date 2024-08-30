const controllerEmailOptions = {
  required: 'Email is required',
  pattern: {
    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    message: 'Enter a valid email',
  },
};
const controllerUserNameOptions = {
  required: 'Username is required',
  pattern: {
    value: /^(?!.*\s)(?=.*\d)[a-zA-Z0-9]{3,20}$/,
    message: 'Invalid username',
  },
};

const controllerCreatePostOptions = {
  required: 'Post content is required',
  pattern: {
    value: /\S/,
    message: 'Invalid post content',
  },
};

export {
  controllerCreatePostOptions,
  controllerEmailOptions,
  controllerUserNameOptions,
};
