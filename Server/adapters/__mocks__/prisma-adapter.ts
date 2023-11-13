import { PrismaClient } from "@prisma/client";
import { beforeEach } from 'vitest'
import { mockDeep, mockReset } from 'vitest-mock-extended'

beforeEach(() => {
    mockReset(prismaAdapter)
})

const prismaAdapter = mockDeep<PrismaClient>()
export default prismaAdapter