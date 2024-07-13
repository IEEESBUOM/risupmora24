
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();
export async function POST (req: NextRequest, res: NextResponse) {
  const { token } = await req.json();
  console.log(token)

  if (!token || typeof token !== 'string') {
    return NextResponse.json({ message: 'verification failed' }, { status: 400 });
  }

  const user = await prisma.user.findFirst({
    where: { verificationToken: token },
  });

  if (!user) {
    return NextResponse.json({ message: 'verification failed' }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(),
      verificationToken: null,
      emailVerifyStatus:true
    },
  });

    return NextResponse.json({ message: 'Email verified successfully' }, { status: 200 });
}

// export  async function POST(req: NextApiRequest, res: NextApiResponse) => {
//     console.log("ashan")
//   const { token } = req.query;

//   if (!token || typeof token !== 'string') {
//     return res.status(400).json({ message: 'Invalid token' });
//   }

//   const user = await prisma.user.findFirst({
//     where: { verificationToken: token },
//   });

//   if (!user) {
//     return res.status(400).json({ message: 'Invalid token' });
//   }

//   await prisma.user.update({
//     where: { id: user.id },
//     data: {
//       emailVerified: new Date(),
//       verificationToken: null,
//     },
//   });

//   res.status(200).json({ message: 'Email verified successfully' });
// };
