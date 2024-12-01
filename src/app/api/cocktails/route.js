import prisma from '../../../lib/prisma';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { writeFile } from "fs/promises";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 3;
  const offset = (page - 1) * limit;

  const cocktails = await prisma.cocktail.findMany({
    skip: offset,
    take: limit,
    include: { ingredients: true },
  });

  return new Response(JSON.stringify(cocktails), { status: 200 });
}///api/cocktails?page={number}&limit={number}

export async function POST(request) {
  try {
    const data = await request.formData();
    const imageFile = data.get('image');

    if (!imageFile) {
      return new Response("No files received.", { status: 400 });
    }
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const extension = path.extname(imageFile.name);
    const filename = uuidv4() + extension;
    const ingredients = JSON.parse(data.get('ingredients'));
    console.log(ingredients)

    try {
      await writeFile(
        path.join(process.cwd(), "public/uploads/" + filename),
        buffer
      );
      
      const newCocktail = await prisma.cocktail.create({
        data: {
          name: data.get('name'),
          description: data.get('description'),
          recipe: data.get('recipe'),
          image: filename,
          ingredients: {
            create: ingredients.map((ingredient) => ({
              ingredientId: ingredient.ingredientId,
              amountOz: ingredient.amountOz,
            })),
          },
        },
      });

      return new Response(JSON.stringify(newCocktail), { status: 201 });
    } catch (error) {
      console.log("error", error);
      return new Response(error.message, { status: 500 });
    }
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
