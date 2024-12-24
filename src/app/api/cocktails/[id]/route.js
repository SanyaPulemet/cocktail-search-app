import prisma from '../../../../lib/prisma';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { writeFile } from "fs/promises";

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
    return new Response('invalid request', { status: 400 });
  }

  const imageFile = data.get('image');

  if (!imageFile) {
    return new Response("no files??", { status: 400 });
  }

  if (imageFile.name != '') {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const extension = path.extname(imageFile.name);
    const filename = uuidv4() + extension;

    try {
      await writeFile(
        path.join(process.cwd(), "public/uploads/" + filename),
        buffer
      );
      const updatedCocktail = await prisma.cocktail.update({
        where: { id },
        data: {
          name: data.get('name'),
          description: data.get('description'),
          recipe: data.get('recipe'),
          image: filename,
        },
      });
  
      return new Response(JSON.stringify(updatedCocktail), { status: 200 });
    } catch (error) {
      return new Response('error updating cocktail', { status: 500 });
    }
  }
  else {
    try {
      const updatedCocktail = await prisma.cocktail.update({
        where: { id },
        data: {
          name: data.get('name'),
          description: data.get('description'),
          recipe: data.get('recipe'),
        },
      });
  
      return new Response(JSON.stringify(updatedCocktail), { status: 200 });
    } catch (error) {
      return new Response('error updating cocktail', { status: 500 });
    }
  }
}//api/cocktails/[id]?id={cocktailId}
