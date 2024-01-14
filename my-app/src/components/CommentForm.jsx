import React from 'react';
import { useForm } from 'react-hook-form';

const CommentForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Comment:
        <textarea {...register('comment', { required: true })} />
      </label>
      <button type="submit">Submit Comment</button>
    </form>
  );
};

export default CommentForm;
