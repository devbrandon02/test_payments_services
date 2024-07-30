import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding... 🌱');

  try {
    await prisma.product.createMany({
      data: [
        {
          name: 'PlayStation 5 PS5 – Edición Digital SPIDERMAN',
          price: 3960000,
          description: 'PlayStation 5 PS5 - Edición Digital',
          image:
            'https://pladani.com/wp-content/uploads/2022/04/Play5-Digital.jpg',
          stock: 10,
        },
        {
          name: 'Consola Nintendo Switch Oled 64GB SP',
          price: 13960000,
          description: 'Consola Nintendo Switch Oled 64GB',
          image:
            'https://pladani.com/wp-content/uploads/2022/04/Nintendo-OLED.jpeg',
          stock: 20,
        },
        {
          name: 'Consola XBOX Serie S 512GB SSD SP',
          price: 2960000,
          description:
            'Pásate a lo digital con la Xbox Series S y crea una biblioteca de juegos digitales.',
          image:
            'https://pladani.com/wp-content/uploads/2022/04/Xbox-Serie-S-512GB-SSD.jpg',
          stock: 30,
        },
        {
          name: 'iPhone 11 128GB SP',
          price: 2660000,
          description:
            'Como parte de los esfuerzos de Apple por reducir el impacto ambiental, el iPhone 11 no incluye adaptador de corriente ni EarPods.',
          image:
            'https://pladani.com/wp-content/uploads/2022/01/iPhone-11-negro-1.jpg',
          stock: 30,
        },
        {
          name: 'Celular Xiaomi 12 256GB 12GB Purple',
          price: 960000,
          description:
            'La cámara de 50Mp de grado profesional hará que puedas compartir fotos de gran calidad, incluso en momentos de poca luz',
          image:
            'https://pladani.com/wp-content/uploads/2022/07/Celular-Xiaomi-12-Purpura.png',
          stock: 2,
        },
        {
          name: 'Consola XBOX Serie S 512GB SSD SP',
          price: 1960000,
          description:
            'Pásate a lo digital con la Xbox Series S y crea una biblioteca de juegos digitales.',
          image:
            'https://pladani.com/wp-content/uploads/2022/04/Xbox-Serie-S-512GB-SSD.jpg',
          stock: 5,
        },
      ],
    });

    console.log('Seeding Complete Success ✅');
  } catch (error) {
    console.error('@Seed', error);
  }
}

main();
