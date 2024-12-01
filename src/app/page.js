'use client';

function UploadForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const response = await fetch('/api/cocktails', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('!response.ok');
      alert('cocktail created');
    } catch (error) {
      console.error(error);
      alert('error creating cocktail');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name='name' placeholder='name' required />
      <br />
      <textarea name='description' placeholder='description'></textarea>
      <br />
      <textarea name='recipe' placeholder='recipe'></textarea>
      <br />
      <textarea
        name='ingredients'
        placeholder='ingredients json format'
      ></textarea>
      <br />
      <input type='file' name='image' accept='image/*' />
      <br />
      <button type='submit'>submit</button>
    </form>
  );
}

export default UploadForm;