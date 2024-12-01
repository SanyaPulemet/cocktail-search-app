import prisma from '../../../../lib/prisma';

export async function GET() {
  try {
    const ingredients = await prisma.ingredient.findMany();
    return new Response(JSON.stringify(ingredients), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const cocktailId = parseInt(searchParams.get('cocktailId'));
  const ingredientId = parseInt(searchParams.get('ingredientId'));

  try {
    await prisma.cocktailIngredient.deleteMany({
      where: {
        cocktailId,
        ingredientId,
      },
    });

    return new Response('Ingredient removed', { status: 200 });
  } catch (error) {
    return new Response('Error removing ingredient', { status: 500 });
  }
}//api/cocktails/ingredient?cocktailId={cocktailId}&ingredientId={ingredientId}


export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const cocktailId = parseInt(searchParams.get('cocktailId'));
  const data = await request.formData();

  try {
    const newIngredient = await prisma.cocktailIngredient.create({
      data: {
        cocktailId: parseInt(cocktailId),
        ingredientId: parseInt(data.get('ingredientId')),
        amountOz: parseInt(data.get('amountOz')),
      },
    });

    return new Response(JSON.stringify(newIngredient), { status: 201 });
  } catch (error) {
    return new Response('error adding ingredient', { status: 500 });
  }
}//api/cocktails/ingredient?cocktailId={cocktailId}