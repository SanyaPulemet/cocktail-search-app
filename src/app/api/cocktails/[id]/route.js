import prisma from '../../../../lib/prisma';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get('id'));

  if (!id) {
    return new Response('lost id... somehow', { status: 400 });
  }

  const cocktail = await prisma.cocktail.findUnique({
    where: { id },
    include: {
      ingredients: {
        include: {
          ingredient: true,
        },
      },
    },
  });

  if (!cocktail) {
    return new Response('cocktail not found', { status: 404 });
  }

  return new Response(JSON.stringify(cocktail), { status: 200 });
}//api/cocktails/[id]?id={cocktailId}

export async function PUT(request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get('id'));
  const data = await request.formData();

  if (!id) {
    return new Response('Invalid request', { status: 400 });
  }

  try {
    const updatedCocktail = await prisma.cocktail.update({
      where: { id },
      data: {
        name: data.get('name'),
        description: data.get('description'),
        recipe: data.get('recipe'),
        image: data.get('image'),
      },
    });

    return new Response(JSON.stringify(updatedCocktail), { status: 200 });
  } catch (error) {
    return new Response('Error updating cocktail', { status: 500 });
  }
}//api/cocktails/[id]?id={cocktailId}
