import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
  // create two dummy tournaments
  const tournament1 = await prisma.tournament.upsert({
    where: { name: 'Test Tournament 1' },
    update: {
      playerCapacity: 32,
    },
    create: {
      name: 'Test Tournament 1',
      playerCapacity: 32,
      public: true,
    },
  });

  const tournament2 = await prisma.tournament.upsert({
    where: { name: 'Test Tournament 2' },
    update: {
      playerCapacity: 32,
    },
    create: {
      name: 'Test Tournament 2',
      playerCapacity: 32,
      public: false,
    },
  });

  const user1Password = await bcrypt.hash('foobar123', roundsOfHashing);
  const user1 = await prisma.user.upsert({
    where: { email: 'JnLkA@example.com' },
    update: {
      password: user1Password,
    },
    create: {
      username: 'testuser1',
      email: 'JnLkA@example.com',
      password: user1Password,
    },
  });

  const user2Password = await bcrypt.hash('foobar321', roundsOfHashing);
  const user2 = await prisma.user.upsert({
    where: { email: 'I8O2h@example.com' },
    update: {
      password: user2Password,
    },
    create: {
      username: 'testuser2',
      email: 'I8O2h@example.com',
      password: user2Password,
    },
  });

  const adminUserPassword = await bcrypt.hash('adminfoobar123', roundsOfHashing);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@foo.bar' },
    update: {
      password: adminUserPassword,
      roles: ['ADMIN'],
    },
    create: {
      username: 'admin',
      roles: ['ADMIN'],
      email: 'admin@foo.bar',
      password: adminUserPassword,
    }
  });

  const enrollment1 = await prisma.enrollment.upsert({
    where: {
      playerTournament: {
        userId: user1.id,
        tournamentId: tournament1.id,
      }
    },
    update: {},
    create: {
      userId: user1.id,
      tournamentId: tournament1.id,
    },
  });

  const enrollment2 = await prisma.enrollment.upsert({
    where: {
      playerTournament: {
        userId: user2.id,
        tournamentId: tournament1.id,
      }
    },
    update: {},
    create: {
      userId: user2.id,
      tournamentId: tournament1.id,
    },
  });

  const phase1 = await prisma.phase.upsert({
    where: {
      tournamentPhase: {
        tournamentId: tournament1.id,
        phaseIndex: 1,
      }
    },
    update: {},
    create: {
      tournamentId: tournament1.id,
      phaseIndex: 1,
    },
  });

  const cube1 = await prisma.cube.upsert({
    where: {
      name: 'Test Cube 1',
    },
    update: {},
    create: {
      name: 'Test Cube 1',
      cardNumber: 450,
      description: 'Foo bar test cube',
      url: 'https://cubecobra.com/cube/shivan/overview',
    },
  });

  const draft1 = await prisma.draft.upsert({
    where: {
      phaseCube: {
        phaseId: phase1.id,
        cubeId: cube1.id,
      }
    },
    update: {},
    create: {
      phaseId: phase1.id,
      cubeId: cube1.id,
    },
  });

  const draftPlayer1 = await prisma.draftPlayer.upsert({
    where: {
      draftEnrollment: {
        draftId: draft1.id,
        enrollmentId: enrollment1.id,
      }
    },
    update: {},
    create: {
      draftId: draft1.id,
      enrollmentId: enrollment1.id,
    },
  });

  const draftPlayer2 = await prisma.draftPlayer.upsert({
    where: {
      draftEnrollment: {
        draftId: draft1.id,
        enrollmentId: enrollment2.id,
      }
    },
    update: {},
    create: {
      draftId: draft1.id,
      enrollmentId: enrollment2.id,
    },
  });

  const round1 = await prisma.round.upsert({
    where: {
      draftRound: {
        draftId: draft1.id,
        roundIndex: 1,
      }
    },
    update: {},
    create: {
      draftId: draft1.id,
      roundIndex: 1,
    },
  });

  const match1 = await prisma.match.upsert({
    where: { id: 1 },
    update: {
      roundId: round1.id,
    },
    create: {
      player1Id: draftPlayer1.id,
      player2Id: draftPlayer2.id,
      tableNumber: 1,
      roundId: round1.id,
    },
  });

  const enrollment1Score = await prisma.scorecard.upsert({
    where: {
      enrollmentId: enrollment1.id,
    },
    update: {},
    create: {
      enrollmentId: enrollment1.id,
    },
  });

  const enrollment2Score = await prisma.scorecard.upsert({
    where: {
      enrollmentId: enrollment2.id,
    },
    update: {},
    create: {
      enrollmentId: enrollment2.id,
    },
  });

  const player1DraftScore = await prisma.draftScorecard.upsert({
    where: {
      playerId: draftPlayer1.id,
    },
    update: {},
    create: {
      playerId: draftPlayer1.id,
    },
  });

  const player2DraftScore = await prisma.draftScorecard.upsert({
    where: {
      playerId: draftPlayer2.id,
    },
    update: {},
    create: {
      playerId: draftPlayer2.id,
    },
  });

  console.log({ tournament1, tournament2 });
  console.log({ phase1 });
  console.log({ cube1 });
  console.log({ draft1 });
  console.log({ round1 });
  console.log({ user1, user2, adminUser });
  console.log({ enrollment1, enrollment2 });
  console.log({ enrollment1Score, enrollment2Score });
  console.log({ draftPlayer1, draftPlayer2 });
  console.log({ player1DraftScore, player2DraftScore });
  console.log({ match1 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
