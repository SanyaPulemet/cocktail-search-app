import prisma from '../../../../lib/prisma';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 3;
  const offset = (page - 1) * limit;

  const cocktails = await prisma.cocktail.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { ingredients: { some: { ingredient: { name: { contains: query } } } } }
      ],
    },
    skip: offset,
    take: limit,
    include: { ingredients: true },
  });

  const totalCount = await prisma.cocktail.count({
    where: {
      OR: [
        { name: { contains: query } },
        {
          ingredients: { some: { ingredient: { name: { contains: query } } } },
        },
      ],
    },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return new Response(JSON.stringify({cocktails, totalPages}), { status: 200 });
}
//api/cocktails/search?query={searchTerm}&page={number}&limit={number}